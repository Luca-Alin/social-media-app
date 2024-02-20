import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDTO} from "./models/CommentDTO";
import {GlobalService} from "../../services/global.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl: string = `${this.globalService.baseUrl}/comments`;
  constructor(private http: HttpClient, private globalService: GlobalService) { }

  public createComment(comment: CommentDTO) : Observable<CommentDTO> {
    return this.http.post<CommentDTO>(`${this.apiUrl}/add`, {
      content: comment.content,
      post: {
        uuid: comment.post?.uuid
      }
    });
  }
}
