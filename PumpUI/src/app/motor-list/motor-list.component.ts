import { Component, OnInit } from '@angular/core';
import { Motor, MotorService } from '../services/motors.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motor-list',
  templateUrl: './motor-list.component.html',
  styleUrls: ['./motor-list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
})
export class MotorListComponent implements OnInit {
  motors: Motor[] = [];

  constructor(private motorService: MotorService) { }

  ngOnInit(): void {
    this.loadMotors();
  }

  loadMotors(): void {
    this.motorService.getMotors().subscribe(data => {
      this.motors = data;
    });
  }

  deleteMotor(id: number): void {
    if (confirm("Вы уверены, что хотите удалить этот мотор?")) {
      this.motorService.deleteMotor(id).subscribe({
        next: () => {
          this.motors = this.motors.filter(m => m.id !== id);
          console.log(`Мотор с ID ${id} удален.`);
        },
        error: (err) => console.error('Ошибка при удалении мотора:', err)
      });
    }
  }
}