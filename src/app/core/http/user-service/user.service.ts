import {Injectable} from "@angular/core";
import type {UserDTO} from "./model/UserDTO";
import {GlobalService} from "../../services/global.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl: string = `${this.globalService.baseURL}/users`;


  private readonly userSubject: BehaviorSubject<UserDTO | null>;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserDTO | null>(null);
  }
  public get user(): Observable<UserDTO | null> {
    return this.userSubject.asObservable();
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

  findByToken() {
    return this.http.get<UserDTO>(`${this.apiUrl}/user-by-jwt`);

  }
}
