import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PumpService, Pump } from '../services/pump.service';
import { Router, RouterModule } from '@angular/router';
import { MotorService, Motor } from '../services/motors.service';
import { MaterialService, Material } from '../services/materials.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    private router: Router
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
  }

  loadDependencies(): void {
    this.motorService.getMotors().subscribe(data => this.motors = data);
    this.materialService.getMaterials().subscribe(data => {
      this.housingMaterials = data;
      this.wheelMaterials = data;
    });
  }

  onSubmit(): void {
  if (this.pumpForm.valid) {
    const newPump: Pump = {
      id: 0,
      pumpName: this.pumpForm.value.PumpName,
      maxPressure: this.pumpForm.value.MaxPressure,
      liquidTemperatureCelsius: this.pumpForm.value.LiquidTemperatureCelsius,
      weightInKilograms: this.pumpForm.value.WeightInKilograms,
      pumpDescription: this.pumpForm.value.PumpDescription,
      imageUrlPath: this.pumpForm.value.ImageUrlPath,
      priceInRubles: Number(this.pumpForm.value.PriceInRubles),
      motorForeignKey: Number(this.pumpForm.value.MotorForeignKey),
      housingMaterialForeignKey: Number(this.pumpForm.value.HousingMaterialForeignKey),
      wheelMaterialForeignKey: Number(this.pumpForm.value.WheelMaterialForeignKey),
      motorDetails: {
        id: 0,
        name: 'Default Motor Name', // Предоставьте значение по умолчанию
        powerKw: 0,
        currentA: 0,
        speedRpm: 0,
        description: '',
        priceRub: 0,
        motorType: 'Default Type' // Предоставьте значение по умолчанию
      },
      housingMaterialDetails: {
        id: 0,
        name: '',
        description: ''
      },
      wheelMaterialDetails: {
        id: 0,
        name: '',
        description: ''
      }
    };

    this.pumpService.createPump(newPump).subscribe({
      next: (response) => {
        console.log('Насос успешно добавлен', response);
        this.router.navigate(['/pumps']);
      },
      error: (error) => {
        console.error('Ошибка при добавлении насоса', error);
      }
    });
  } else {
    console.log('Форма невалидна');
  }
}
  onCancel(): void {
    this.router.navigate(['/pumps']);
  }
}