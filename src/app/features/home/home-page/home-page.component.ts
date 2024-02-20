import {Component, HostListener, OnInit} from "@angular/core";
import {PostService} from "../../../core/http/post-service/post.service";
import {PostDTO} from "../../../core/http/post-service/model/PostDTO";
import {NgOptimizedImage} from "@angular/common";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {PostComponent} from "../../../shared/post/post.component";
import {LoadingPageComponent} from "../../../core/layout/components/loading-page/loading-page.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgbCarousel,
    NgbSlide,
    PostComponent,
    LoadingPageComponent,
  ],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css"
})
export class HomePageComponent implements OnInit {
  pageNumber: number = 0;
  posts: PostDTO[] = [];
  isLoading: boolean = false;
  loadingNextSetOfPosts: boolean = false;
  allPostsLoaded: boolean = false;

  constructor(private postService: PostService) {
  }

  public getAllPosts(): void {
    this.isLoading = true;
    this.postService.getAllPosts(this.pageNumber, 10).subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: Event): void {
    this.checkIfUserReachedEnd();
  }

  checkIfUserReachedEnd() {
    const scrollPosition: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

    const documentHeight = Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0,
      document.documentElement.offsetHeight || 0,
      document.body.clientHeight || 0,
      document.documentElement.clientHeight || 0
    );

    if (!this.allPostsLoaded && !this.loadingNextSetOfPosts
      && scrollPosition + windowHeight >= documentHeight) {
      this.pageNumber++;
      this.loadingNextSetOfPosts = true;
      // @ts-ignore
      this.posts.push({
        loading: true
      });
      this.postService.getAllPosts(this.pageNumber, 10)
        .subscribe((posts) => {
          this.posts = this.posts.filter(p => !p.loading);
          if (posts.length == 0) {
            this.allPostsLoaded = true;
            return;
          }
          this.loadingNextSetOfPosts = false;
          posts.forEach((p) => {
            this.posts.push(p);
          });
        });
    }
  }
}
