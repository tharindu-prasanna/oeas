import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./localStorage.service";
import {Router} from "@angular/router";
import {setSignedInStatus} from "../store/shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {getSignedInStatus} from "../store/shared/shared.selectors";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>,
              private http: HttpClient,
              private token: LocalStorageService,
              private appStateService: AppStateService,
              private router: Router) {
  }

  signIn() {
    this.token.setToken('true');
    this.store.dispatch(setSignedInStatus({status: true}))
  }

  setSignInStatus() {
    if (this.token.getToken() === 'true') {
      this.store.dispatch(setSignedInStatus({status: true}))
    }
  }

  getSignInStatus() {
    return this.store.select(getSignedInStatus)
  }

  signOut() {
    this.token.removeToken();
    this.store.dispatch(setSignedInStatus({status: false}))
    this.appStateService.clearAppState()
    this.router.navigate(['/']);
  }
}
