import {Injectable} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {LoginModel} from "./models/LoginModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationResponse} from "./models/AuthenticationResponse";
import {Observable, tap} from "rxjs";
import {RegisterModel} from "./models/RegisterModel";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  static accessToken: string | null = localStorage.getItem("accessToken");
  static refreshToken: string | null = localStorage.getItem("refreshToken");
  apiUrl = `${this.globalService.baseURL}/auth`;

  constructor(private globalService: GlobalService,
              private http: HttpClient,) {
  }

  login(login: LoginModel): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, login, {
        headers: this.resetHttpHeaders()
      });

  }

  register(register: RegisterModel): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, register, {
      headers: this.resetHttpHeaders()
    });
  }

  refresh() : Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
      }
    }).pipe(tap((res : AuthenticationResponse) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
    }));
  }

  private resetHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    });
  }


}
