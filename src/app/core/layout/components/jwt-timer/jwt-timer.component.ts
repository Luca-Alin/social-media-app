import {Component, OnInit} from "@angular/core";
import {interval} from "rxjs";

@Component({
  selector: "app-jwt-timer",
  standalone: true,
  imports: [],
  templateUrl: "./jwt-timer.component.html",
  styleUrl: "./jwt-timer.component.css"
})
export class JwtTimerComponent implements OnInit {

  accessTokenValue: string = "No access token";
  refreshTokenValue: string = "No refresh token";

  constructor() {
  }

  ngOnInit() {
    interval(1000).subscribe(() => {

      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken != null && refreshToken != null) {
        this.accessTokenValue = this.calculateTimeDifference(this.parseJwt(accessToken).exp).toString();
        this.refreshTokenValue = this.calculateTimeDifference(this.parseJwt(refreshToken).exp).toString();
      } else {
        this.accessTokenValue = "No access token";
        this.refreshTokenValue = "No refresh token";
      }
    });
  }

  private parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64));
    return JSON.parse(jsonPayload);
  }

  private calculateTimeDifference(expirationTime: number): string {
    const currentTime = Math.round(Date.now() / 1000);
    const timeDifference = expirationTime - currentTime;

    const time  = parseFloat(timeDifference.toString());
    return time >= 0 ? time.toString() : `${time} (Expired)`;
  }
}
