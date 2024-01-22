import {Injectable} from "@angular/core";
import type {UserDTO} from "./model/UserDTO";
import {GlobalService} from "../../services/global.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl: string = `${this.globalService.baseURL}/users`;

  constructor(private globalService: GlobalService, private http: HttpClient) {
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/all`);
  }

  search(query: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/search?query=${query}`);
  }

  findById(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/public/${userId}`);
  }

  findByToken(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/user-by-jwt`);
  }
}
