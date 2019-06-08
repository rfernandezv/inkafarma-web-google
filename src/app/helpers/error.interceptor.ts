import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as HttpStatus from 'http-status-codes'

import { AuthenticationService } from '../services';
import { MessageAlertHandleService } from '../services/message-alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private messageAlertHandleService: MessageAlertHandleService)
    {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === HttpStatus.UNAUTHORIZED) {
                this.authenticationService.logout();
                location.reload(true);
                this.messageAlertHandleService.handleError("You're unauthorized.");
            }
            this.messageAlertHandleService.handleError(err);
            //console.log(err);   //rfv
            //const error = err.error.message || err.statusText;
            const error = err.statusText;
            return throwError(error);
        }))

    }
}