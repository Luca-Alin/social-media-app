import {Routes} from "@angular/router";
import {LayoutPageComponent} from "./core/layout/pages/layout-page/layout-page.component";
import {NotFoundPageComponent} from "./core/layout/pages/not-found-page/not-found-page.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        loadChildren: () =>
          import("./features/home/home.module").then(m => m.HomeModule)
      },
      {
        path: "authentication",
        loadChildren: () =>
          import("./features/authentication/authentication.module").then(m => m.AuthenticationModule)
      },
      {
        path: "user",
        loadChildren: () =>
          import("./features/users/users.module").then(m => m.UsersModule)
      },
      {
        path: "**",
        component: NotFoundPageComponent
      }
    ]
  }
];
