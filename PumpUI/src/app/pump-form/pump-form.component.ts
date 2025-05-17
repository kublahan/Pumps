import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PumpService, Pump } from '../services/pump.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MotorService, Motor } from '../services/motors.service';
import { MaterialService, Material } from '../services/materials.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pump-form',
  templateUrl: './pump-form.component.html',
  styleUrls: ['./pump-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class PumpFormComponent implements OnInit {
  pumpForm: FormGroup;
  motors: Motor[] = [];
  housingMaterials: Material[] = [];
  wheelMaterials: Material[] = [];
  isEditMode: boolean = false;
  pumpId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private pumpService: PumpService,
    private motorService: MotorService,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.pumpForm = this.fb.group({
      PumpName: ['', Validators.required],
      MaxPressure: [null],
      LiquidTemperatureCelsius: [null],
      WeightInKilograms: [null],
      PumpDescription: [''],
      ImageUrlPath: [''], // Сюда будет URL изображения (если есть при редактировании)
      PriceInRubles: [null, Validators.required],
      MotorForeignKey: [null, Validators.required],
      HousingMaterialForeignKey: [null, Validators.required],
      WheelMaterialForeignKey: [null, Validators.required],
      imageFile: [null] // Form control для выбора файла
    });
  }

  ngOnInit(): void {
    this.loadDependencies();
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.pumpId = +id;
          return this.pumpService.getPump(this.pumpId);
        }
        return of(null);
      })
    ).subscribe(pump => {
      if (pump) {
        this.populateForm(pump);
      }
    });
  }

  loadDependencies(): void {
    this.motorService.getMotors().subscribe(data => this.motors = data);
    this.materialService.getMaterials().subscribe(data => {
      this.housingMaterials = data;
      this.wheelMaterials = data;
    });
  }

  populateForm(pump: Pump): void {
    this.pumpForm.patchValue({
      PumpName: pump.pumpName,
      MaxPressure: pump.maxPressure,
      LiquidTemperatureCelsius: pump.liquidTemperatureCelsius,
      WeightInKilograms: pump.weightInKilograms,
      PumpDescription: pump.pumpDescription,
      ImageUrlPath: pump.imageUrlPath,
      PriceInRubles: pump.priceInRubles,
      MotorForeignKey: pump.motorForeignKey,
      HousingMaterialForeignKey: pump.housingMaterialForeignKey,
      WheelMaterialForeignKey: pump.wheelMaterialForeignKey,
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.pumpForm.valid) {
      const formData = new FormData();
      for (const key in this.pumpForm.value) {
        if (key === 'imageFile' && this.selectedFile) {
          formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
        } else if (key !== 'imageFile') {
          formData.append(key, this.pumpForm.get(key)?.value);
        }
      }

      if (this.isEditMode && this.pumpId !== null) {
        formData.append('Id', this.pumpId.toString());
        this.pumpService.updatePump(this.pumpId, formData).subscribe({
          next: () => this.router.navigate(['/pumps']),
          error: (err: HttpErrorResponse) => console.error('Ошибка при обновлении насоса', err),
        });
      } else {
        this.pumpService.createPump(formData).subscribe({
          next: () => this.router.navigate(['/pumps']),
          error: (err: HttpErrorResponse) => console.error('Ошибка при создании насоса', err),
        });
      }
    } else {
      console.log('Форма невалидна');
    }
  }

  onCancel(): void {
    this.router.navigate(['/pumps']);
  }
}