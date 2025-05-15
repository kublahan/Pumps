import { Routes } from '@angular/router';
import { PumpListComponent } from './pump-list/pump-list.component';
import { PumpFormComponent } from './pump-form/pump-form.component';
import { PumpDetailComponent } from './pump-detail/pump-detail.component';

export const routes: Routes = [
    { path: 'pumps', component: PumpListComponent },
    { path: 'pumps/new', component: PumpFormComponent }, // Убедитесь, что PumpFormComponent standalone
    { path: 'pumps/edit/:id', component: PumpFormComponent },
    { path: 'pumps/:id', component: PumpDetailComponent }, // Убедитесь, что PumpDetailComponent standalone
    { path: '', redirectTo: '/pumps', pathMatch: 'full' },
];
