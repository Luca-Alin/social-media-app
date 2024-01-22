import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {SearchComponent} from "./pages/search/search.component";

const routes: Routes = [
  {
    path: "profile/:id",
    component: UserProfileComponent
  },
  {
    path: "search/:id",
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
