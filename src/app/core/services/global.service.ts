import { Injectable } from '@angular/core';
import {UserDTO} from "../http/user-service/model/UserDTO";
import {UserService} from "../http/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseURL: string = "http://localhost:8080/api/v1";
  // baseURL: string = "https://social-media-app-java.azurewebsites.net/api/v1";
  user: UserDTO | null = null;
  constructor() { }

}
