import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UtilitiesService } from '../../utils/services/utilities.service';
import { ToastService } from '../../utils/services/toast.service';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const utilities = inject(UtilitiesService);
  const toastService = inject(ToastService);
  // const authService = inject(AuthService);

  utilities.setLoading(true);

  // const usuario = authService.getUserFromCookie();
  // if (usuario) {
  //   req = req.clone({
  //     setHeaders: { Authorization: `Bearer ${usuario.token}` },
  //   });
  // }

  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        utilities.setLoading(false);
        if (error.status === 403) {
          toastService.error403();
        }
      },
      complete: () => {
        utilities.setLoading(false);
      },
    })
  );
};
