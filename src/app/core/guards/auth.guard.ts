import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const authApiUrl = environment.baseUrl + "/auth"
  
  return http.get<void>(`${authApiUrl}/check-access`).pipe(
    map(() => true),
    catchError(() => {
      return http.post<void>(`${authApiUrl}/refresh-access`, {}).pipe(
        map(() => true),
        catchError(() => {
          router.navigate(['/login']);
          return of(false);
        })
      )
    })
  )
};
