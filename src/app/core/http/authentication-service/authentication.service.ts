import {Injectable} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {LoginModel} from "./models/LoginModel";
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse} from "./models/AuthenticationResponse";
import {Observable, tap} from "rxjs";
import {RegisterModel} from "./models/RegisterModel";
import {UserService} from "../user-service/user.service";
import {Router} from "@angular/router";
import {UserDTO} from "../user-service/model/UserDTO";
import {JwtService} from "../../services/jwt-service/jwt.service";

@Injectable({
  providedIn: "root"
})
/**
 * @description This class contains methods
 * for Http request related to authentication,
 * and for storing and retrieving data
 * about the currently logged-in user
 */
export class AuthenticationService {
  apiUrl : string = `${this.globalService.baseUrl}/auth`;
  private loggedInUser: UserDTO | null = null;

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private userService: UserService,
    private router: Router,
    private jwtService: JwtService
  ) {
  }


  login(login: LoginModel): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, login);

  }

  register(register: RegisterModel): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, register);
  }

  randomLogin() : Observable<AuthenticationResponse> {
    return this.http.get<AuthenticationResponse>(`${this.apiUrl}/random`);
  }

  refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
      }
    }).pipe(tap((res: AuthenticationResponse) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
    }));
  }

  /**
   * @description Deletes the accessToken from localstorage,
   * and deletes the data of the connected user
   */
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["/authentication/login"]).then();
  }

  /**
   * @description Returns the user if there is a valid access token in the localstorage,
   * otherwise it returns null
   */
  fetchingDataAboutCurrentUser : boolean = false;
  public findLoggedInUser(): UserDTO | null {


    const token: string | null = localStorage.getItem("accessToken");

    if (token == null || this.fetchingDataAboutCurrentUser)
      return null;

    const emailFromToken: string = this.jwtService.extractEmail(token);

    const shouldRefreshUserData: boolean = this.loggedInUser == null ||
      (this.loggedInUser.email != emailFromToken);

    if (shouldRefreshUserData) {
      this.fetchingDataAboutCurrentUser = true;
      this.userService.findByToken()
        .subscribe((res: UserDTO) => {
          this.loggedInUser = res;
          this.fetchingDataAboutCurrentUser = false;
        });
    }

    return this.loggedInUser;
  }


}
