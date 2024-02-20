import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {GlobalService} from "../../../services/global.service";
import {LoadingPageComponent} from "../../components/loading-page/loading-page.component";
import {AuthenticationService} from "../../../http/authentication-service/authentication.service";

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    LoadingPageComponent,
  ],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(protected globalService: GlobalService,
              protected authenticationService: AuthenticationService) {
  }
}
