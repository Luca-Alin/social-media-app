import {Component, OnInit} from "@angular/core";
import {PostDTO} from "../../../../core/http/post-service/model/PostDTO";
import {UserDTO} from "../../../../core/http/user-service/model/UserDTO";
import {FriendshipService} from "../../../../core/http/friendship-service/friendship.service";
import {UserService} from "../../../../core/http/user-service/user.service";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../../core/http/post-service/post.service";
import {LoadingPageComponent} from "../../../../core/layout/components/loading-page/loading-page.component";
import {ImageService} from "../../../../core/services/image-service/ImageService";
import {PostComponent} from "../../../../shared/post/post.component";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [
    LoadingPageComponent,
    PostComponent
  ],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css"
})
export class UserProfileComponent implements OnInit {

  user: UserDTO | null = null;
  posts: PostDTO[] = [];
  friendshipStatus: string = "none";

  constructor(protected friendshipService: FriendshipService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              protected imageService: ImageService) {
  }

  sendFriendRequest(user: UserDTO): void {
    this.friendshipService.sendFriendshipRequest(user).subscribe(res => {
      console.log(res)
    });
  }

  findUserAndFriendshipStatus(userId: number): void {
    console.log("findUserAndFriendshipStatus");
    this.userService.findById(userId)
      .subscribe((response: UserDTO) => {
        this.user = response;
        this.friendshipService.checkFriendshipStatus(this.user)
          .subscribe((response: string) => {
            this.friendshipStatus = response;
          });
      });
  }


  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap.get("id");
    if (params == null)
      return;

    let userId: number = Number.parseInt(params);
    this.postService
      .getPostsByUserId(userId)
      .subscribe((data: PostDTO[]) => {
        this.posts = data;
      });

    this.findUserAndFriendshipStatus(userId);
  }


}
