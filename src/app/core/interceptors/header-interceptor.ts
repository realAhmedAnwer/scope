import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('accessToken')) {
    req = req.clone({
      setHeaders: {
        AUTHORIZATION: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }
  return next(req);
};
