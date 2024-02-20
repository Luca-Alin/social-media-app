import {Component} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../../core/http/authentication-service/authentication.service";
import {UserService} from "../../../../core/http/user-service/user.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent {
  profileForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(protected authService: AuthenticationService,
              private router: Router,
              private userService: UserService) {
  }

  login() {
    if (typeof this.profileForm.value.email != "string")
      return;
    if (typeof this.profileForm.value.password != "string")
      return;

    this.authService.login(
      {
        email: this.profileForm.value.email,
        password: this.profileForm.value.password
      }
    ).subscribe(res => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      this.userService.findByToken();
      this.router.navigate(["/home"]).then(() => {
        console.log("Routing to home page");
      });
    });
  }

  useRandomAccount(): void {
    this.authService.randomLogin()
      .subscribe(res => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        this.userService.findByToken().subscribe(() => {
          this.router.navigate(["/home"]).then(() => {
            console.log("Routing to home page");
          });
        });
      });

  }
}
