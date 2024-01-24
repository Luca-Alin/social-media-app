import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseURL: string = "http://localhost:8080/api/v1";
  // baseURL: string = "https://social-media-app-java.azurewebsites.net/api/v1";
  constructor() { }
}
