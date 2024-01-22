import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
