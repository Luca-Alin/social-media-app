import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {FormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
  ]
})
export class AuthenticationModule { }
