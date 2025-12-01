import { CanDeactivateFn } from '@angular/router';

// Definimos una interfaz para asegurar que los componentes tengan esta función
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  // Si el componente tiene la función canDeactivate y devuelve false (tiene cambios), preguntamos
  if (component.canDeactivate ? !component.canDeactivate() : false) {
    return confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?');
  }
  return true;
};