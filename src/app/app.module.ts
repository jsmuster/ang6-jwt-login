import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserLoginFormComponent } from './login-user-form/login-user-form.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';

import { Routes, Router, RouterModule, CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';

import { UserAuthGuard } from './guards/user.auth.guard';

/* route configuration */
const routes: Routes = [
  {
    path: '',
    component: UserLoginFormComponent
  },
  {
    path: 'user/:uid',
    component: UserHomePageComponent,
    canActivate: [UserAuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginFormComponent,
    UserHomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, UserAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
