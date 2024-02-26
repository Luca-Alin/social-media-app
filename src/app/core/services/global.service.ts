import { Injectable } from '@angular/core';
import {UserDTO} from "../http/user-service/model/UserDTO";
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // baseURL: string = "http://localhost:8080/api/v1";
  baseUrl: string = environment.baseApiUrl;
  user: UserDTO | null = null;
  constructor() {
    console.log(this.baseUrl);
  }

}
