import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/localStorage.service";
import {AuthService} from "../../services/auth.service";
import {UrlService} from "../../services/url.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  routePath = ''
  nextRoutePath = ''
  heading = ''
  usernameFieldHeading = ''
  errorMessage: Observable<string> = new Observable<string>()
  subscription: Subscription = new Subscription();
  signinForm: FormGroup = new FormGroup<any>({
    type: new FormControl(''),
    username: new FormControl('', [Validators.required, this.trimmedEmptyValidator]),
    password: new FormControl('', [Validators.required, this.trimmedEmptyValidator]),
  })

  constructor(private store: Store<AppState>,
              private localStorageService: LocalStorageService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.url === '/institutes/signin') {
      this.routePath = '/institutes/signin'
      this.nextRoutePath = 'institutes'
      this.heading = 'Sign in to Institute Account'
      this.usernameFieldHeading = 'Institute number'
    } else if (this.router.url === '/individuals/signin') {
      this.routePath = '/individuals/signin'
      this.nextRoutePath = 'individuals'
      this.heading = 'Sign in to Your Account'
      this.usernameFieldHeading = 'N.I.C. Number'
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  trimmedEmptyValidator(control: FormControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0
    const isValid = !isWhiteSpace
    return isValid ? null : {'whitespace': true}
  }

  onSignin() {
    this.authService.signIn()
    this.router.navigate([this.nextRoutePath])
  }
}
