import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MotorService, Motor } from '../services/motors.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motor-details',
  templateUrl: './motor-details.component.html',
  styleUrls: ['./motor-details.component.scss'],
  standalone: true,
  imports: 
  [
    CommonModule,
    RouterModule
   ]
})
export class MotorDetailsComponent implements OnInit {
  motorId: number | null = null;
  motor: Motor | undefined;

  constructor(
    private route: ActivatedRoute,
    private motorService: MotorService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.motorId = Number(params.get('id'));
      if (this.motorId) {
        this.loadMotorDetails(this.motorId);
      }
    });
  }

  loadMotorDetails(id: number): void {
    this.motorService.getMotor(id).subscribe(
      (data: Motor) => {
        this.motor = data;
      },
      (error) => {
        console.error('Ошибка при загрузке деталей мотора:', error);
      }
    );
  }
}