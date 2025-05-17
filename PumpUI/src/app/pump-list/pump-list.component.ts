import { Component, OnInit } from '@angular/core';
import { Pump, PumpService } from '../services/pump.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pump-list',
  templateUrl: './pump-list.component.html',
  styleUrls: ['./pump-list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
})
export class PumpListComponent implements OnInit {
  pumps: Pump[] = [];

  constructor(private pumpService: PumpService) { }

  ngOnInit(): void {
    this.loadPumps();
  }

  loadPumps(): void {
    this.pumpService.getPumps().subscribe(data => {
      this.pumps = data.map(pump => {

        return pump;
      });
    });
  }

  arrayBufferToBase64(buffer: any): string {
  if (buffer instanceof ArrayBuffer) {
    const bytes = new Uint8Array(buffer);
    return btoa(String.fromCharCode(...bytes));
  }
  return '';
}


  deletePump(id: number): void {
    if (confirm("Вы уверены, что хотите удалить этот насос?")) {
      this.pumpService.deletePump(id).subscribe(() => {
        this.pumps = this.pumps.filter(p => p.id !== id);
      });
    }
  }
}