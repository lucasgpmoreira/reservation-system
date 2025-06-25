// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import {ReservationListComponent} from './components/reservation-list/reservation-list.component'; // Crie este guard

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'rooms',
    component: RoomListComponent,
    canActivate: [authGuard] // Protege a rota
  },
  {
    path: 'reservations',
    component: ReservationListComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', redirectTo: '/rooms' } // Rota coringa
];
