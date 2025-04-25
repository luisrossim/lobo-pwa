import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { map } from 'rxjs';

export const novaContagemGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const inventoryService = inject(InventoryService);

  return inventoryService.fetchHistoryAndCheckToday().pipe(
    map(() => {
      const isCompleted = inventoryService.getCountIsCompletedValue();

      if (isCompleted) {
        router.navigateByUrl('/estoque');
        return false;
      }

      return true;
    })
  );
};
