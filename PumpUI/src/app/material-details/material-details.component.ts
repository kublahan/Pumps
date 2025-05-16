// src/app/material-details/material-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialService, Material } from '../services/materials.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.scss'],
  standalone: true,
  imports: 
  [
    CommonModule,
    RouterModule
   ]
})
export class MaterialDetailsComponent implements OnInit {
  materialId: number | null = null;
  material: Material | undefined;

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.materialId = Number(params.get('id'));
      if (this.materialId) {
        this.loadMaterialDetails(this.materialId);
      }
    });
  }

  loadMaterialDetails(id: number): void {
    this.materialService.getMaterial(id).subscribe(
      (data: Material) => {
        this.material = data;
      },
      (error) => {
        console.error('Ошибка при загрузке деталей материала:', error);
      }
    );
  }
}