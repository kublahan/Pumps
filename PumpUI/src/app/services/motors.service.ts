// src/app/services/motors.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Motor {
  id: number;
  name: string;
  powerKw: number;
  currentA: number; 
  speedRpm: number; 
  description: string;
  priceRub: number;
  motorType: string;
}

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  private apiUrl = 'http://localhost:5282/api/Motors';

  constructor(private http: HttpClient) { }


  getMotors(): Observable<Motor[]> {
    return this.http.get<Motor[]>(this.apiUrl);
  }


  getMotor(id: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.apiUrl}/${id}`);
  }


  createMotor(motor: Omit<Motor, 'id'>): Observable<Motor> {
    return this.http.post<Motor>(this.apiUrl, motor);
  }


  updateMotor(id: number, motor: Motor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, motor);
  }


  deleteMotor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}