import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setErrorMessage} from "../../store/shared/shared.actions";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm: FormGroup = new FormGroup<any>({})

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.passwordResetForm = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onReset() {
    this.store.dispatch(setErrorMessage({message: ''}))
    this.passwordResetForm.reset()
  }

  onPasswordReset() {
  }
}
