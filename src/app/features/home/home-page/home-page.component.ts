import {Component, OnInit} from "@angular/core";
import {PostService} from "../../../core/http/post-service/post.service";
import {PostDTO} from "../../../core/http/post-service/model/PostDTO";
import {ImageService} from "../../../core/services/image-service/ImageService";
import {NgOptimizedImage} from "@angular/common";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {PostComponent} from "../../../shared/post/post.component";
import {GlobalService} from "../../../core/services/global.service";
import {LoadingPageComponent} from "../../../core/layout/components/loading-page/loading-page.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgbCarousel,
    NgbSlide,
    PostComponent,
    LoadingPageComponent
  ],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css"
})
export class HomePageComponent implements OnInit {
  posts: PostDTO[] = [];
  protected readonly JSON = JSON;
  isLoading : boolean = false;
  constructor(private postService: PostService,
              protected imageService: ImageService,
              private globalService: GlobalService) {
  }

  public getAllPosts() : void {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }
}
