import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokensService {
  constructor() {

    this._accessToken = localStorage.getItem("accessToken");
    this._refreshToken = localStorage.getItem("refreshToken");
  }

  private _accessToken: string | null;

  get accessToken(): string | null {
    return this._accessToken;
  }

  set accessToken(value: string | null) {
    if (value != null)
      localStorage.setItem("accessToken", value);
    this._accessToken = value;
  }

  private _refreshToken: string | null;

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set refreshToken(value: string | null) {
    if (value != null)
      localStorage.setItem("refreshToken", value);
    this._refreshToken = value;
  }
}
