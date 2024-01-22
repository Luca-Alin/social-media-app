import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-dark-theme-button",
  templateUrl: "./dark-theme-button.component.html",
  standalone: true
})
export class DarkThemeButtonComponent implements OnInit {

  theme: string = localStorage.getItem("theme") || "Light";

  ngOnInit(): void {
    this.setTheme();
  }

  changeTheme(): void {
    this.theme = (this.theme == "Light" ? "Dark" : "Light");
    localStorage.setItem("theme", this.theme);

    this.setTheme();
  }

  setTheme() {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    if (this.theme == "Dark") {
      body.setAttribute("data-bs-theme", "dark");
    } else {
      body.removeAttribute("data-bs-theme");
    }
  }
}
