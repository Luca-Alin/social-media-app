import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class JwtService {

  constructor() {
  }

  private parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64));
    return JSON.parse(jsonPayload);
  }

  public extractEmail(token: string): string {
    return this.parseJwt(token).sub;
  }

  public extractExpDate(token: string): number {
    return this.parseJwt(token).exp;
  }

}
