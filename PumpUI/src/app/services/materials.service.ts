// src/app/services/materials.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Интерфейс для данных Материала
export interface Material {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  // Замените на URL вашего API
  private apiUrl = 'http://localhost:5282/api/Materials'; // Пример URL

  constructor(private http: HttpClient) { }

  // Получить все материалы
  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  // Получить материал по ID
  getMaterial(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  // Создать новый материал
  createMaterial(material: Omit<Material, 'id'>): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  // Обновить существующий материал
  updateMaterial(id: number, material: Material): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, material);
  }

  // Удалить материал
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}