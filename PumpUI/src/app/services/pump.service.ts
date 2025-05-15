// src/app/services/pump.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Определите интерфейс для ваших данных (согласуйте с API)
export interface Pump { // Этот интерфейс должен соответствовать модели Pump из API
  id: number; // Соответствует PumpId в C# модели
  pumpName: string; // Соответствует PumpName в C# модели
  maxPressure: number; // Соответствует MaxPressure в C# модели
  liquidTemperatureCelsius: number; // Соответствует LiquidTemperatureCelsius в C# модели
  weightInKilograms: number; // Соответствует WeightInKilograms в C# модели
  pumpDescription: string; // Соответствует PumpDescription в C# модели
  imageUrlPath: string; // Соответствует ImageUrlPath в C# модели
  priceInRubles: number; // Соответствует PriceInRubles в C# модели
  motorForeignKey: number; // Соответствует MotorForeignKey в C# модели
  motorDetails?: any; // или тип Motor, если будете загружать MotorDetails
  housingMaterialForeignKey: number; // Соответствует HousingMaterialForeignKey в C# модели
  housingMaterialDetails?: any; // или тип Material, если будете загружать HousingMaterialDetails
  wheelMaterialForeignKey: number; // Соответствует WheelMaterialForeignKey в C# модели
  wheelMaterialDetails?: any; // или тип Material, если будете загружать WheelMaterialDetails
}

@Injectable({
  providedIn: 'root'
})
export class PumpService {
  private apiUrl = 'http://localhost:5282/api/Pumps'; // Замените на URL вашего API

  constructor(private http: HttpClient) { }

  getPumps(): Observable<Pump[]> {
    return this.http.get<Pump[]>(this.apiUrl);
  }

  getPump(id: number): Observable<Pump> {
    return this.http.get<Pump>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }

  createPump(pump: Pump): Observable<Pump> { // Используйте DTO, если API его ожидает
    return this.http.post<Pump>(this.apiUrl, pump);
  }

  updatePump(id: number, pump: Pump): Observable<any> { // Используйте DTO
    return this.http.put(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, pump);
  }

  deletePump(id: number): Observable<any> {
    return this.http.delete(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }
}