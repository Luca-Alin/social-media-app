import {Injectable} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDTO} from "./model/PostDTO";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl: string = `${this.globalService.baseUrl}/posts`;

  constructor(private globalService: GlobalService, private http: HttpClient) {
  }

  getAllPosts(pageNumber : number , pageSize: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.apiUrl}/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getPostsByUserId(userId: string): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.apiUrl}/${userId}`);
  }

  createPost(postDTO: PostDTO) : Observable<PostDTO> {
    return this.http.post<PostDTO>(`${this.apiUrl}/`, postDTO);
  }

  updatePost(postDTO: PostDTO) : Observable<PostDTO> {
    return this.http.put<PostDTO>(`${this.apiUrl}/`, postDTO);
  }

  deletePost(id : string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
