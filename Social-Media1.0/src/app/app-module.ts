import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserDataComponent } from './user-data/user-data.component';
import { Login } from './login/login.component';
import { Posts } from './posts/posts';
import { NavBar } from './nav-bar/nav-bar';

@NgModule({
  declarations: [
    App,
    UserDataComponent,
    Login,
    Posts,
    NavBar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }


