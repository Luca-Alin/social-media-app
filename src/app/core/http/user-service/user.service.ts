import {Injectable} from "@angular/core";
import type {UserDTO} from "./model/UserDTO";
import {GlobalService} from "../../services/global.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
/**
 * @description This class contains methods for
 * http request related to UserDTOs
 */
export class UserService {
  private apiUrl: string = `${this.globalService.baseUrl}/users`;


  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
  }

  public search(query: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/search?query=${query}`);
  }


  public findById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/public/${userId}`);
  }

  /**
   * @description Todo
   */
  public findByToken() {
    return this.http.get<UserDTO>(`${this.apiUrl}/user-by-jwt`);
  }


}
