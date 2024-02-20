import {Component, isDevMode, OnInit} from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DarkThemeButtonComponent} from "./core/layout/components/dark-theme-button/dark-theme-button.component";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DarkThemeButtonComponent,
    CoreModule,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
