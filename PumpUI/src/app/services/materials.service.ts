import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Material {
  id: number;
  name: string;
  description: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:5282/api/Materials';

  constructor(private http: HttpClient) { }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  getMaterial(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  createMaterial(material: Omit<Material, 'id'>): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateMaterial(id: number, material: Material): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, material, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}