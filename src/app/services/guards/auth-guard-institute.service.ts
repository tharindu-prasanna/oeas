import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardInstituteService implements OnDestroy, CanActivate {
  signedInStatus = false
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.authService.getSignInStatus().subscribe((status: boolean) => {
      this.signedInStatus = status
    })

    if (this.signedInStatus) {
      return true
    } else {
      this.router.navigate(['institutes', 'signin'])
      return false
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
