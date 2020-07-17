
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401)
        {
           return throwError(e.StatusText);
        }
        if (e instanceof HttpErrorResponse)
        {
           const applicationError = e.headers.get('Application-Error');
           if (applicationError)
           {
             return throwError(applicationError);
           }
           const serverError = e.error;
           let modeStateErrors = '';
           if (serverError.errors && typeof serverError.errors === 'object'){
            for (const key in serverError.errors){
            if (serverError.errors[key])
            {
              modeStateErrors += serverError.errors[key] + '\n';
            }
            }
           }
           return throwError (modeStateErrors || serverError || 'Server Error');
        }
      })
    );
  }

}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
