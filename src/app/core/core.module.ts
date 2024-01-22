import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./layout/components/footer/footer.component";
import {LayoutPageComponent} from "./layout/pages/layout-page/layout-page.component";
import {NotFoundPageComponent} from "./layout/pages/not-found-page/not-found-page.component";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PostService} from "./http/post-service/post.service";
import {GlobalService} from "./services/global.service";
import {AuthenticationService} from "./http/authentication-service/authentication.service";
import {CommentService} from "./http/comment-service/comment.service";
import {FriendshipService} from "./http/friendship-service/friendship.service";
import {HttpInterceptorService} from "./http/interceptor/http-interceptor.service";
import {UserService} from "./http/user-service/user.service";
import {ImageService} from "./services/image-service/ImageService";
import {TokensService} from "./services/tokens-service/tokens.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FooterComponent,
    LayoutPageComponent,
    NotFoundPageComponent
  ],
  exports: [],
  providers: [
    AuthenticationService,
    CommentService,
    FriendshipService,
    HttpInterceptorService,
    PostService,
    ImageService,
    UserService,
    GlobalService,
    TokensService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {
}
