import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MotorService, Motor } from '../services/motors.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-motor-form',
  templateUrl: './motor-form.component.html',
  styleUrls: ['./motor-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class MotorFormComponent implements OnInit {
  motorForm: FormGroup;
  isEditMode: boolean = false;
  motorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.motorForm = this.fb.group({
      name: ['', Validators.required],
      powerKw: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      currentA: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      speedRpm: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: [''],
      priceRub: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      motorType: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.motorId = +id;
          return this.motorService.getMotor(this.motorId);
        }
        return [];
      })
    ).subscribe(motor => {
      if (motor) {
        this.populateForm(motor);
      }
    });
  }

  populateForm(motor: Motor): void {
    this.motorForm.patchValue({
      name: motor.name,
      powerKw: motor.powerKw,
      currentA: motor.currentA,
      speedRpm: motor.speedRpm,
      description: motor.description,
      priceRub: motor.priceRub,
      motorType: motor.motorType
    });
  }

  onSubmit(): void {
    if (this.motorForm.valid) {
      const motorData = this.motorForm.value;

      if (this.isEditMode && this.motorId !== null) {
        const updateData: Motor = {
          id: this.motorId,
          name: motorData.name,
          powerKw: motorData.powerKw,
          currentA: motorData.currentA,
          speedRpm: motorData.speedRpm,
          description: motorData.description || null,
          priceRub: motorData.priceRub,
          motorType: motorData.motorType || null
        };
        this.motorService.updateMotor(this.motorId, updateData).subscribe({
          next: () => {
            console.log('Мотор успешно обновлен');
            this.router.navigate(['/motors']);
          },
          error: (err) => console.error('Ошибка при обновлении мотора', err)
        });
      } else {
        const createData: Omit<Motor, 'id'> = {
          name: motorData.name,
          powerKw: motorData.powerKw,
          currentA: motorData.currentA,
          speedRpm: motorData.speedRpm,
          description: motorData.description || null,
          priceRub: motorData.priceRub,
          motorType: motorData.motorType || null
        };
        this.motorService.createMotor(createData).subscribe({
          next: () => {
            console.log('Мотор успешно добавлен');
            this.router.navigate(['/motors']);
          },
          error: (err) => console.error('Ошибка при добавлении мотора', err)
        });
      }
    } else {
      console.log('Форма невалидна');
    }
  }

  onCancel(): void {
    this.router.navigate(['/motors']);
  }
}