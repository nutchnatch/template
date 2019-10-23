import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRedirectInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const method = request.method;
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (method !== 'GET' && event['status'] === 200 && !request.url.includes('resources')) {
          this.toastr.success('<strong>Action succesfull.</strong>');
        }
        return event;
      }),
      catchError((event: any) => {
        const errorObj = {
          disableTimeOut: true,
          closeButton: true,
          preventDuplicates: true
        };

        this.toastr.error('<strong>Oh snap! </strong>Code: ' + event.status + ' - ' + event.statusText, '', errorObj);
        return throwError(event);

      })
    );
  }
}
