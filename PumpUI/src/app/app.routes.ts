import { Routes } from '@angular/router';
import { PumpListComponent } from './pump-list/pump-list.component';
import { PumpFormComponent } from './pump-form/pump-form.component';
import { MotorDetailsComponent } from './motor-details/motor-details.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { MotorListComponent } from './motor-list/motor-list.component';
import { MotorFormComponent } from './motor-form/motor-form.component';


export const routes: Routes = [
  { path: 'pumps', component: PumpListComponent },
  { path: 'pumps/new', component: PumpFormComponent },
  { path: 'pumps/edit/:id', component: PumpFormComponent },
  { path: 'motors', component: MotorListComponent },
  { path: 'motors/new', component: MotorFormComponent },
  { path: 'motors/edit/:id', component: MotorFormComponent },
  { path: 'motors/:id', component: MotorDetailsComponent },
  { path: 'materials', component: MaterialListComponent },
  { path: 'materials/new', component: MaterialFormComponent },
  { path: 'materials/edit/:id', component: MaterialFormComponent },
  { path: 'materials/:id', component: MaterialDetailsComponent },

  { path: '', redirectTo: '/pumps', pathMatch: 'full' },
];