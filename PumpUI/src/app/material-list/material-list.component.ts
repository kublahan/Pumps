import { Component, OnInit } from '@angular/core';
import { Material, MaterialService } from '../services/materials.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getMaterials().subscribe(data => {
      this.materials = data;
    });
  }

  deleteMaterial(id: number): void {
    if (confirm("Вы уверены, что хотите удалить этот материал?")) {
      this.materialService.deleteMaterial(id).subscribe({
        next: () => {
          this.materials = this.materials.filter(m => m.id !== id);
          console.log(`Материал с ID ${id} удален.`);
        },
        error: (err) => console.error('Ошибка при удалении материала:', err)
      });
    }
  }
}