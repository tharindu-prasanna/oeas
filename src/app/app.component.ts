import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {PrimeNGConfig} from "primeng/api";
import {AppState} from "./store/app.state";
import {Store} from "@ngrx/store";
import {setLoadingSpinner} from "./store/shared/shared.actions";
import {getLoading} from "./store/shared/shared.selectors";
import {AuthService} from "./services/auth.service";
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoading: Observable<boolean> = new Observable<boolean>()

  constructor(private primengConfig: PrimeNGConfig,
              private store: Store<AppState>,
              private authService: AuthService,
              private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.primengConfig.ripple = true;
    this.showLoading = this.store.select(getLoading)
    this.store.dispatch(setLoadingSpinner({status: false}))
    this.authService.setSignInStatus()
    this.authService.setSignInStatus()
    this.appStateService.getAppState()
  }
}
