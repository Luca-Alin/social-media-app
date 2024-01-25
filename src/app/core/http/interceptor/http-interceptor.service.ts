import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const setHeaders: boolean = !(req.url.includes("/auth/") || req.url.includes("/public/"));

    if (setHeaders) {
      console.log(`Intercepting ${req.url}`);
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
    }
    return next.handle(req);
  }
}
