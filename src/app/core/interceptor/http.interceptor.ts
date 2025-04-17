import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../utils/services/toast.service';
import { tap } from 'rxjs';
import { LoadingService } from '../../utils/services/loading.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toastService = inject(ToastService);
  // const authService = inject(AuthService);

  setTimeout(() => loadingService.setLoading(true), 0)

  // const usuario = authService.getUserFromCookie();
  // if (usuario) {
  //   req = req.clone({
  //     setHeaders: { Authorization: `Bearer ${usuario.token}` },
  //   });
  // }

  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        loadingService.setLoading(false);
        if (error.status === 403) {
          toastService.error403();
        }
      },
      complete: () => {
        loadingService.setLoading(false);
      },
    })
  );
};
