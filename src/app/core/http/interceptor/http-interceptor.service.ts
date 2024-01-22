import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GlobalService} from "../../services/global.service";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {TokensService} from "../../services/tokens-service/tokens.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private tokensService: TokensService) {
    console.log("http interceptor")
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting")
    if (this.tokensService.accessToken != null) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.tokensService.accessToken}`,
        },
      });
    }
    return next.handle(req);
  }
}
