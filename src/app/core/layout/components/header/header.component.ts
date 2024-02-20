import {Component, OnInit} from "@angular/core";
import {DarkThemeButtonComponent} from "../dark-theme-button/dark-theme-button.component";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JwtTimerComponent} from "../jwt-timer/jwt-timer.component";
import {AuthenticationService} from "../../../http/authentication-service/authentication.service";
import {UserDTO} from "../../../http/user-service/model/UserDTO";
import {interval} from "rxjs";
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    DarkThemeButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    JwtTimerComponent,
    NgbCollapse,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent implements OnInit {


  profileForm: FormGroup = new FormGroup({
    searchedUsername: new FormControl("")
  });
  user: UserDTO | null = null;
  timerValue: number = 0;

  constructor(
    private router: Router,
    protected authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.refreshToken();
    interval(1000).subscribe(() => {
      this.timerValue++;
    });
  }

  search() {
    if (this.profileForm.value.searchedUsername.length > 2) {
      this.router.navigate([`user/search/${this.profileForm.value.searchedUsername}`])
        .then(() => console.log("Changing Page"));
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}
