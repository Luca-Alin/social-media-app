import {Component} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../../core/http/authentication-service/authentication.service";
import {TokensService} from "../../../../core/services/tokens-service/tokens.service";

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
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    birthDay: new FormControl(""),
    birthMonth: new FormControl(""),
    birthYear: new FormControl(""),
    gender: new FormControl("")
  });

  constructor(private authService: AuthenticationService,
              private router: Router,
              private tokensService: TokensService) {
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
      this.tokensService.accessToken = res.accessToken;
      this.tokensService.refreshToken = res.refreshToken;
      this.router.navigate(["/home"]).then(() => {
        console.log("Routing to home page")
      });
    });
  }
}
