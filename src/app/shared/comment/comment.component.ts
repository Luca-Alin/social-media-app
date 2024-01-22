import {Component, Input} from "@angular/core";
import {CommentDTO} from "../../core/http/comment-service/models/CommentDTO";
import {ImageService} from "../../core/services/image-service/ImageService";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment : CommentDTO | null = null;
  protected readonly JSON = JSON;

  constructor(protected imageService: ImageService) {
  }
}
