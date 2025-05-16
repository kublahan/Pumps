import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PumpService, Pump } from '../services/pump.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MotorService, Motor } from '../services/motors.service';
import { MaterialService, Material } from '../services/materials.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { UpdatePumpDto } from '../models/update-pump.dto';

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

  constructor(
    private fb: FormBuilder,
    private pumpService: PumpService,
    private motorService: MotorService,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pumpForm = this.fb.group({
      PumpName: ['', Validators.required],
      MaxPressure: [null],
      LiquidTemperatureCelsius: [null],
      WeightInKilograms: [null],
      PumpDescription: [''],
      ImageUrlPath: [''],
      PriceInRubles: [null, Validators.required],
      MotorForeignKey: [null, Validators.required],
      HousingMaterialForeignKey: [null, Validators.required],
      WheelMaterialForeignKey: [null, Validators.required],
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
        return [];
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

   onSubmit(): void {
  if (this.pumpForm.valid) {
    const pumpData = this.pumpForm.value;
    const updatePumpDto: UpdatePumpDto = {
      Id: this.pumpId!,
      PumpName: pumpData.PumpName,
      MaxPressure: pumpData.MaxPressure,
      LiquidTemperatureCelsius: pumpData.LiquidTemperatureCelsius,
      WeightInKilograms: pumpData.WeightInKilograms,
      PumpDescription: pumpData.PumpDescription,
      ImageUrlPath: pumpData.ImageUrlPath,
      PriceInRubles: Number(pumpData.PriceInRubles),
      MotorForeignKey: Number(pumpData.MotorForeignKey),
      HousingMaterialForeignKey: Number(pumpData.HousingMaterialForeignKey),
      WheelMaterialForeignKey: Number(pumpData.WheelMaterialForeignKey),
    };

    if (this.isEditMode && this.pumpId !== null) {
      this.pumpService.updatePump(this.pumpId, updatePumpDto).subscribe({
        next: (response) => {
          console.log('Насос успешно обновлен', response);
          this.router.navigate(['/pumps']);
        },
        error: (error) => {
          console.error('Ошибка при обновлении насоса', error);
        }
      });
    } else {

    const pumpData = this.pumpForm.value;
    const newPumpPayload = {
        pumpName: pumpData.PumpName,
        maxPressure: pumpData.MaxPressure === null || pumpData.MaxPressure === '' ? null : Number(pumpData.MaxPressure),
        liquidTemperatureCelsius: pumpData.LiquidTemperatureCelsius === null || pumpData.LiquidTemperatureCelsius === '' ? null : Number(pumpData.LiquidTemperatureCelsius),
        weightInKilograms: pumpData.WeightInKilograms === null || pumpData.WeightInKilograms === '' ? null : Number(pumpData.WeightInKilograms),
        pumpDescription: pumpData.PumpDescription || null,
        imageUrlPath: pumpData.ImageUrlPath || null,
        priceInRubles: Number(pumpData.PriceInRubles),
        motorForeignKey: String(pumpData.MotorForeignKey),
        housingMaterialForeignKey: String(pumpData.HousingMaterialForeignKey),
        wheelMaterialForeignKey: String(pumpData.WheelMaterialForeignKey),
    };
      this.pumpService.createPump(newPumpPayload as any).subscribe({
        next: (response) => {
            console.log('Насос успешно добавлен', response);
            this.router.navigate(['/pumps']);
        },
        error: (error) => {
            console.error('Ошибка при добавлении насоса', error);
            console.log('Data sent for creation:', newPumpPayload);
        }
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