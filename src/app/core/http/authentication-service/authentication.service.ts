import {Injectable} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {LoginModel} from "./models/LoginModel";
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse} from "./models/AuthenticationResponse";
import {Observable, tap} from "rxjs";
import {RegisterModel} from "./models/RegisterModel";
import {UserService} from "../user-service/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  apiUrl = `${this.globalService.baseURL}/auth`;

  constructor(private globalService: GlobalService,
              private http: HttpClient,
              private userService: UserService,
              private router: Router) {
  }

  login(login: LoginModel): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, login)
      .pipe(tap(() => {
        this.userService.findByToken();
      }));

  }

  register(register: RegisterModel): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, register)
      .pipe(tap(() => {
        this.userService.findByToken();
      }));
  }

  refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
      }
    }).pipe(tap((res: AuthenticationResponse) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      this.userService.findByToken();
    }));
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.userService.findByToken();
    this.router.navigate(["/authentication/login"]).then();
  }
}
