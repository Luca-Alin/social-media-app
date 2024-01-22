import {Component, OnInit} from "@angular/core";
import {UserDTO} from "../../../../core/http/user-service/model/UserDTO";
import {UserService} from "../../../../core/http/user-service/user.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ImageService} from "../../../../core/services/image-service/ImageService";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css"
})
export class SearchComponent implements OnInit {

  users: UserDTO[] = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              protected imageService: ImageService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newParam = params["id"];

      if (typeof newParam === "string") {
        this.performSearch(newParam);
      }
    });

  }

  performSearch(params: string) {
    this.userService
      .search(params)
      .subscribe(
        (data: UserDTO[]) => {
          this.users = data;
          console.log(data);
        }
      );
  }
}
