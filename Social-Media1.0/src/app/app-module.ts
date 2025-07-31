import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserDataComponent } from './user-data/user-data.component';
<<<<<<< HEAD
import { Login } from './login/login.component';
import { Posts } from './posts/posts';
@NgModule({
  declarations: [
    App,
    UserDataComponent,
    Login,
    Posts
=======
import { Posts } from './posts/posts';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NavBar } from './nav-bar/nav-bar';


@NgModule({
  declarations: [
    App,
    Posts,
    UserDataComponent,
    NavBar
>>>>>>> 18059d8f4308d52cb819a7b2e5ad309fc98f8a21
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    ReactiveFormsModule,
    HttpClientModule
=======
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule

>>>>>>> 18059d8f4308d52cb819a7b2e5ad309fc98f8a21
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
