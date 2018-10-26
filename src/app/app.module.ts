import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService, UserService, AlertService } from './services';
import { AuthGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helper';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login.component';
import { AddUserComponent } from './user/add-user.component'
import { ProductModule } from './products/product.module';
import { ForgotPwdComponent } from './user/forgetPwd.component';
import { HeaderComponent } from './shared/header.component';
import { AlertComponent } from './directives/alert.component';
import {EditUserComponent} from './user/edit-user.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPwdComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ForgotPwdComponent,
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ProductModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
