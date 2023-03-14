import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {LocalStorageService} from "./localStorage.service";
import {setSelectedExam} from "../store/shared/shared.actions";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(private store: Store<AppState>, private localstorageService: LocalStorageService) {
  }

  getAppState() {
    if (this.localstorageService.getValue('exam')) {
      this.store.dispatch(setSelectedExam({exam: this.localstorageService.getValue('exam')}))
    }
  }

  clearAppState() {
    this.localstorageService.removeValue('exam')
    this.store.dispatch(setSelectedExam({'exam': ''}))
  }
}
