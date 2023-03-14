import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getSelectedExam} from "../../store/shared/shared.selectors";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamGuardInstituteService implements OnDestroy, CanActivate {
  isExamSelected = false
    subscription: Subscription = new Subscription();

  constructor(private router: Router, private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.subscription = this.store.select(getSelectedExam).subscribe((data) => {
      if (data) {
        this.isExamSelected = true
      }
    })

    if (this.isExamSelected) {
      return true
    } else {
      this.router.navigate(['institutes', 'select-exam'])
      return false
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
