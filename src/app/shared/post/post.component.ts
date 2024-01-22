import {Component, Input} from "@angular/core";
import {PostDTO} from "../../core/http/post-service/model/PostDTO";
import {CommentComponent} from "../comment/comment.component";
import {RouterLink} from "@angular/router";
import {ImageService} from "../../core/services/image-service/ImageService";
import {
  NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem, NgbCarousel, NgbSlide
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-post",
  standalone: true,
  imports: [
    CommentComponent,
    RouterLink,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    NgbCarousel,
    NgbSlide
  ],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.css"
})
export class PostComponent {

  @Input() post: PostDTO | null = null;

  constructor(protected imageService: ImageService) {
  }

  timeSince(date: Date): string {
    const currentDate: Date = new Date();
    const seconds: number = Math.floor((currentDate.getTime() - new Date(date).getTime()) / 1000);

    let interval: number = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  }
}
