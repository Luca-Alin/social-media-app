import {Injectable} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDTO} from "./model/PostDTO";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl: string = `${this.globalService.baseURL}/posts`;

  constructor(private globalService: GlobalService, private http: HttpClient) {
  }

  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.apiUrl}/all`);
  }

  getPostsByUserId(userId: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.apiUrl}/posts-posted-by-user-details/${userId}`);
  }

  getAllPostsByFriends(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.apiUrl}/all-posts-by-friends`);
  }
}
