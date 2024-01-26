import {Component, OnInit} from "@angular/core";
import {DarkThemeButtonComponent} from "../dark-theme-button/dark-theme-button.component";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../http/user-service/user.service";
import {JwtTimerComponent} from "../jwt-timer/jwt-timer.component";
import {AuthenticationService} from "../../../http/authentication-service/authentication.service";
import {UserDTO} from "../../../http/user-service/model/UserDTO";
import {interval} from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    DarkThemeButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    JwtTimerComponent
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({
    searchedUsername: new FormControl("")
  });
  user: UserDTO | null = null;

  constructor(private router: Router,
              private userService: UserService) {

  }

  timerValue: number = 0;
  ngOnInit(): void {
    this.getUser();
    interval(1000).subscribe(() => {
      this.timerValue++;
    });
  }

  search() {
    if (this.profileForm.value.searchedUsername.length > 2) {
      this.router.navigate([`user/search/${this.profileForm.value.searchedUsername}`]);
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  getUser() {
    if (localStorage.getItem("accessToken") != null) {
      this.userService.findByToken().subscribe((res) => {
        this.user = res;
      });
    }
  }

  protected readonly localStorage = localStorage;
}
