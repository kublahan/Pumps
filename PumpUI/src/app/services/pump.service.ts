import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motor } from './motors.service';
import { Material } from './materials.service';

export interface Pump {
  id: number;
  pumpName: string;
  maxPressure: number | null;
  liquidTemperatureCelsius: number | null;
  weightInKilograms: number | null;
  pumpDescription: string | null;
  imageUrlPath: string | null;
  imageMimeType: string | null;
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
  apiUrl = 'http://localhost:5282/api/Pumps';

  constructor(private http: HttpClient) { }

  getPumps(): Observable<Pump[]> {
    return this.http.get<Pump[]>(this.apiUrl);
  }

  getPump(id: number): Observable<Pump> {
    return this.http.get<Pump>(`${this.apiUrl}/${id}`);
  }

  createPump(formData: FormData): Observable<Pump> {
    return this.http.post<Pump>(this.apiUrl, formData);
  }

  updatePump(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deletePump(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}