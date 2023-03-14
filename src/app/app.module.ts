import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';

import {appReducer} from "./store/app.state";

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {HeadingComponent} from './shared/heading/heading.component';
import {BannerComponent} from './shared/banner/banner.component';
import {ContactComponent} from './shared/contact/contact.component';
import {PasswordResetComponent} from './shared/password-reset/password-reset.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {SigninComponent} from './shared/signin/signin.component';

import {ScrollTopModule} from "primeng/scrolltop";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeadingComponent,
    BannerComponent,
    HomeComponent,
    ContactComponent,
    PasswordResetComponent,
    PageNotFoundComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollTopModule,
    ButtonModule,
    RippleModule,
    StoreModule.forRoot(appReducer),
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
