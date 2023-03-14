import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo: any;
  subscription: Subscription = new Subscription()
  signedInStatus = false

  constructor(private store: Store<AppState>,
              private breakpointObserver: BreakpointObserver,
              private authService: AuthService) {
  }

  ngOnInit() {
    // detect screen size changes
    this.subscription = this.breakpointObserver.observe(["(max-width: 768px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.logo = 'assets/doe-logo-mobile.jpg'
      } else {
        this.logo = 'assets/doe-logo.jpg'
      }
    });

    this.getSignInStatus()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getSignInStatus() {
    this.subscription = this.authService.getSignInStatus().subscribe((status: boolean) => {
      this.signedInStatus = status
    })
  }

  onSignOut() {
    this.authService.signOut()
  }
}
