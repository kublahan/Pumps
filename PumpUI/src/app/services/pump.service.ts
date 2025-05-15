// src/app/services/pump.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Pump {
  id: number;
  pumpName: string;
  maxPressure: number;
  liquidTemperatureCelsius: number;
  weightInKilograms: number;
  pumpDescription: string;
  imageUrlPath: string;
  priceInRubles: number;
  motorForeignKey: number;
  motorDetails?: any;
  housingMaterialForeignKey: number;
  housingMaterialDetails?: any;
  wheelMaterialForeignKey: number;
  wheelMaterialDetails?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PumpService {
  private apiUrl = 'http://localhost:5282/api/Pumps';

  constructor(private http: HttpClient) { }

  getPumps(): Observable<Pump[]> {
    return this.http.get<Pump[]>(this.apiUrl);
  }

  getPump(id: number): Observable<Pump> {
    return this.http.get<Pump>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }

  createPump(pump: Pump): Observable<Pump> {
    return this.http.post<Pump>(this.apiUrl, pump);
  }

  updatePump(id: number, pump: Pump): Observable<any> {
    return this.http.put(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, pump);
  }

  deletePump(id: number): Observable<any> {
    return this.http.delete(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }
}