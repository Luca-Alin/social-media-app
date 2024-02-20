import {Injectable} from "@angular/core";
import {UserDTO} from "../user-service/model/UserDTO";
import {FriendshipDTO} from "./models/FriendshipDTO";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../../services/global.service";
import {FriendshipStatus} from "./models/FriendshipStatus";

@Injectable({
  providedIn: "root"
})
export class FriendshipService {

  apiUrl: string = `${this.globalService.baseUrl}/friendship`;

  constructor(private globalService: GlobalService,
              private http: HttpClient) {
  }

  sendFriendshipRequest(user: UserDTO): Observable<FriendshipStatus> {
    return this.http
      .post<FriendshipStatus>(`${this.apiUrl}/send`, user);
  }

  checkFriendshipStatus(user: UserDTO): Observable<FriendshipStatus> {
    return this.http
      .post<FriendshipStatus>(`${this.apiUrl}/friendship-status`, user);
  }

  acceptFriendshipRequest(user: UserDTO): Observable<FriendshipStatus> {
    return this.http
      .post<FriendshipStatus>(`${this.apiUrl}/accept`, user);
  }

  deleteFriendship(user: UserDTO) : Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/accept`);
  }
}
