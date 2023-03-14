import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {setErrorMessage} from "../../store/shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showIndividualSignupTerms = false
  individualSignupForm: FormGroup = new FormGroup<any>({})

  ngOnInit() {
    this.individualSignupForm = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email]),
      nic: new FormControl('', [Validators.required, this.trimmedEmptyValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.trimmedEmptyValidator]),
      confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator]),
      termsConditions: new FormControl('', [Validators.required]),
    })
  }

  constructor(private store: Store<AppState>) {
  }

  trimmedEmptyValidator(control: FormControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0
    const isValid = !isWhiteSpace
    return isValid ? null : {'whitespace': true}
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword) {
      if (password.value !== confirmPassword) {
        return {passwordNotMatch: true};
      }
    }

    return null;
  }

  onTermsAndConditions() {
    this.showIndividualSignupTerms = true
  }

  onSignup() {
    console.log(this.individualSignupForm.value)
  }
}
