import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Perfil } from './pages/perfil/perfil';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard'; // <--- IMPORTANTE

export const routes: Routes = [
  { path: '', component: Inicio },
  // Agregamos canDeactivate a las páginas con formularios
  { 
    path: 'login', 
    component: Login, 
    canDeactivate: [unsavedChangesGuard] 
  },
  { 
    path: 'registro', 
    component: Registro, 
    canDeactivate: [unsavedChangesGuard] 
  },
  { 
    path: 'perfil', 
    component: Perfil, 
    canDeactivate: [unsavedChangesGuard] 
  },
  { path: '**', redirectTo: '' }
];