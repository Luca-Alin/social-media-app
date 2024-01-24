import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {Router} from "@angular/router";
import {EventData} from "../../services/event-bus-service/models/EventData";
import {EventBusService} from "../../services/event-bus-service/event-bus-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private eventBusService: EventBusService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    req = req.clone({
      withCredentials: true
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes("auth/signin") &&
          (error.status === 401 || error.status === 403)
        ) {
          return this.handle40xError(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle40xError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (localStorage.getItem("accessToken") != null) {
        return this.authService.refresh().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == "403") {
              this.eventBusService.emit(new EventData("logout", null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
