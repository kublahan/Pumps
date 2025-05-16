import { Routes } from '@angular/router';
import { PumpListComponent } from './pump-list/pump-list.component';
import { PumpFormComponent } from './pump-form/pump-form.component';
import { MotorDetailsComponent } from './motor-details/motor-details.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';


export const routes: Routes = [
  { path: 'pumps', component: PumpListComponent },
  { path: 'pumps/new', component: PumpFormComponent },
  { path: 'pumps/edit/:id', component: PumpFormComponent },
  { path: 'motors/:id', component: MotorDetailsComponent }, 
  { path: 'materials/:id', component: MaterialDetailsComponent },
  { path: '', redirectTo: '/pumps', pathMatch: 'full' },
];