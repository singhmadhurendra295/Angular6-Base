import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService, UserService } from './services';
import { AuthGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helper';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { LoginComponent } from './user/login.component';
import { ProductModule } from './products/product.module';
import { ForgotPwdComponent } from './user/forgetPwd.component';
import { HeaderComponent } from './shared/header.component'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ForgotPwdComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPwdComponent },
      { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
      // otherwise redirect to home
      { path: '**', redirectTo: '' }
      //{ path: '', redirectTo: 'login', pathMatch: 'full'},
      //{ path: '**', redirectTo: 'login', pathMatch: 'full'}
      //{ path: 'welcome', component: WelcomeComponent },
      //{ path: '', redirectTo: 'welcome', pathMatch: 'full'},
      //{ path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    ProductModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
