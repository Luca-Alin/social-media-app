import {Component} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../../core/http/authentication-service/authentication.service";
import {LoginModel} from "../../../../core/http/authentication-service/models/LoginModel";
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
  accounts: LoginModel[] = [
    {
      email: "teddysmith@gmail.com",
      password: "abc"
    },
    {
      email: "johndoe@gmail.com",
      password: "abc"
    },
    {
      email: "janedoe@gmail.com",
      password: "abc"
    },
    {
      email: "bobsmith@gmail.com",
      password: "abc"
    }
  ];

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

  useAccountFromList(loginModel: LoginModel) {

    this.profileForm.value["email"] = loginModel.email;
    this.profileForm.value["password"] = loginModel.password;

    this.login();
  }
}
