// src/app/material-form/material-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialService, Material } from '../services/materials.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class MaterialFormComponent implements OnInit {
  materialForm: FormGroup;
  isEditMode: boolean = false;
  materialId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.materialId = +id;
          return this.materialService.getMaterial(this.materialId);
        }
        return [];
      })
    ).subscribe(material => {
      if (material) {
        this.populateForm(material);
      }
    });
  }

  populateForm(material: Material): void {
    this.materialForm.patchValue({
      name: material.name,
      description: material.description
    });
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      const materialData = this.materialForm.value;

      if (this.isEditMode && this.materialId !== null) {
        const updateData: Material = {
          id: this.materialId,
          name: materialData.name,
          description: materialData.description || null
        };
        this.materialService.updateMaterial(this.materialId, updateData).subscribe({
          next: () => {
            console.log('Материал успешно обновлен');
            this.router.navigate(['/materials']);
          },
          error: (err) => console.error('Ошибка при обновлении материала', err)
        });
      } else {
        const createData: Omit<Material, 'id'> = {
          name: materialData.name,
          description: materialData.description || null
        };
        this.materialService.createMaterial(createData).subscribe({
          next: () => {
            console.log('Материал успешно добавлен');
            this.router.navigate(['/materials']);
          },
          error: (err) => console.error('Ошибка при добавлении материала', err)
        });
      }
    } else {
      console.log('Форма невалидна');
    }
  }

  onCancel(): void {
    this.router.navigate(['/materials']);
  }
}