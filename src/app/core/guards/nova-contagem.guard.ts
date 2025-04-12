import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';

export const novaContagemGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const inventoryService = inject(InventoryService);

  const isCompleted = inventoryService.getCountIsCompletedValue();

  if(isCompleted){
    router.navigateByUrl('/estoque');
    return false;
  }

  return true;
};
