import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('jwt.interceptor.0');   //rfv
        
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        let token = sessionStorage.getItem('token');
        if (currentUser && token) {
            //console.log('jwt.interceptor.1'); //rfv
            const headers = new HttpHeaders({
                'Authorization': `${sessionStorage.getItem('token')}`,
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            request = request.clone({headers});

        }
        //console.log('jwt.interceptor.2');  //rfv
        return next.handle(request);
    }
}