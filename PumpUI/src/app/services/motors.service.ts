// src/app/services/motors.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Интерфейс для данных Мотора
export interface Motor {
  id: number;
  name: string;
  powerKw: number;       // Соответствует power_kw или PowerKw в C#
  currentA: number;      // Соответствует current_a или CurrentA в C#
  speedRpm: number;      // Соответствует speed_rpm или SpeedRpm в C#
  description: string;
  priceRub: number;      // Соответствует price_rub или PriceRub в C#
}

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  // Замените на URL вашего API
  private apiUrl = 'http://localhost:5000/api/Motors'; // Пример URL

  constructor(private http: HttpClient) { }

  // Получить все моторы
  getMotors(): Observable<Motor[]> {
    return this.http.get<Motor[]>(this.apiUrl);
  }

  // Получить мотор по ID
  getMotor(id: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.apiUrl}/${id}`);
  }

  // Создать новый мотор
  // Для 'motor' аргумента здесь и в updateMotor, вы можете создать отдельный
  // интерфейс MotorCreationDto или MotorUpdateDto, если API ожидает другую структуру
  // на создание/обновление (например, без id для создания).
  createMotor(motor: Omit<Motor, 'id'>): Observable<Motor> {
    return this.http.post<Motor>(this.apiUrl, motor);
  }

  // Обновить существующий мотор
  updateMotor(id: number, motor: Motor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, motor);
  }

  // Удалить мотор
  deleteMotor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}