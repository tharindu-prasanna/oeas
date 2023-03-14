import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.css']
})
export class InstitutesComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription()

  constructor(private store: Store<AppState>, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
