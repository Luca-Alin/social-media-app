import {Injectable} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {LoginModel} from "./models/LoginModel";
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse} from "./models/AuthenticationResponse";
import {Observable} from "rxjs";
import {RegisterModel} from "./models/RegisterModel";
import {TokensService} from "../../services/tokens-service/tokens.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  static accessToken: string | null = localStorage.getItem("accessToken");
  static refreshToken: string | null = localStorage.getItem("refreshToken");
  apiUrl = `${this.globalService.baseURL}/auth`;

  constructor(private globalService: GlobalService,
              private http: HttpClient,
              private tokensService: TokensService) {
  }

  login(login: LoginModel): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, login);

  }

  register(register: RegisterModel): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, register);
  }


}
