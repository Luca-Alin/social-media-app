import {Injectable} from "@angular/core";
import {UserDTO} from "../user-service/model/UserDTO";
import {FriendshipDTO} from "./models/FriendshipDTO";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../../services/global.service";

@Injectable({
  providedIn: "root"
})
export class FriendshipService {

  apiUrl: string = `${this.globalService.baseURL}/friendship`;

  constructor(private globalService: GlobalService,
              private http: HttpClient) {
  }

  sendFriendshipRequest(user: UserDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/send-friendship-request`, {
      id: user.id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
  }

  checkFriendshipStatus(user: UserDTO): Observable<string> {
    console.log(user);
    return this.http.post<string>(`${this.apiUrl}/friendship-status`, {
      id: user.id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
  }

  acceptFriendshipRequest(user: UserDTO): void {
    this.http.post<string>(`${this.apiUrl}/accept-friendship`, {
      userId: user.id
    });
  }

  getReceivedFriendshipRequests(): Observable<FriendshipDTO[]> {
    return this.http.get<FriendshipDTO[]>(`${this.apiUrl}/get-received-friendship-requests`);
  }

  getUsersFriendships(): Observable<FriendshipDTO[]> {
    return this.http.get<FriendshipDTO[]>(`${this.apiUrl}/get-users-friends`);
  }

  rejectFriendshipRequest(friend: UserDTO): void {
    throw new Error("Method not implemented." + friend);
  }
}
