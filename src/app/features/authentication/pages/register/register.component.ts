import {Component} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../../../../core/http/authentication-service/authentication.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    NgForOf
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css"
})
export class RegisterComponent {
  profileForm : FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    birthDay: new FormControl(""),
    birthMonth: new FormControl(""),
    birthYear: new FormControl(""),
  });

  constructor(private authenticationService: AuthenticationService) {
  }

  handleSubmit() {
    alert(this.profileForm.value.password + " | " + this.profileForm.value.email);
  }

  getLast100Years(): number[] {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
    return years.reverse();
  }

  getAllMonths(): string[] {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }


  convertToDate(input: string): Date {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date;
  }
}
