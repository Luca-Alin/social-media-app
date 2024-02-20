import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 403)
        ) {
          console.log(`401 or 403 request: ${req.url}`);
          return this.handle40xError(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle40xError(request: HttpRequest<any>, next: HttpHandler) {
    console.log("handle40xError")
    if (localStorage.getItem("accessToken") == null || localStorage.getItem("refreshToken") == null) {
      this.router.navigate(["/authentication/login"]).then(r => {
        console.log("Navigating to Login Page 🚢")
      })
    }


    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (localStorage.getItem("refreshToken")) {
        return this.authService.refreshToken().pipe(
          tap(() => {
            request = request.clone({
              setHeaders: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
              }
            });
          }),
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == "403") {

            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }


}
