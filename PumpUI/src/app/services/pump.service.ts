// src/app/services/pump.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Motor } from './motors.service';
import { Material } from './materials.service';

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
  motorDetails: Motor;
  housingMaterialForeignKey: number;
  housingMaterialDetails: Material;
  wheelMaterialForeignKey: number;
  wheelMaterialDetails: Material;
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
    return this.http.get<Pump>(`${this.apiUrl}/${id}`);
  }

  createPump(pump: Omit<Pump, 'id' | 'motor' | 'housingMaterial' | 'wheelMaterial'>): Observable<Pump> {
    return this.http.post<Pump>(this.apiUrl, pump);
  }

  updatePump(id: number, pump: Omit<Pump, 'id' | 'motor' | 'housingMaterial' | 'wheelMaterial'>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pump);
  }

  deletePump(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}