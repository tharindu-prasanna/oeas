import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {ExamsService} from "../../services/exams.service";
import {Router} from "@angular/router";
import {Exam} from "../../models/exam.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {setErrorMessage} from "../../store/shared/shared.actions";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-institute-info',
  templateUrl: './institute-info.component.html',
  styleUrls: ['./institute-info.component.css']
})
export class InstituteInfoComponent implements OnInit, OnDestroy {
  contactFixedReadonly = true
  contactMobileReadonly = true
  addressLine1Readonly = true
  addressLine2Readonly = true
  postalTownReadonly = true
  districtReadonly = true

  districts: any
  errorMessage: Observable<string> = new Observable<string>()
  instituteInfoForm: FormGroup = new FormGroup<any>({})
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private route: Router) {
  }

  ngOnInit() {
    this.districts = [
      {'district_number': '01', 'district_name': '01 - Colombo'},
      {'district_number': '02', 'district_name': '02 - Gampaha'},
      {'district_number': '03', 'district_name': '03 - Kaluthara'},
      {'district_number': '04', 'district_name': '04 - Kandy'},
      {'district_number': '05', 'district_name': '05 - Kurunegala'},
      {'district_number': '06', 'district_name': '06 - Galle'},
      {'district_number': '07', 'district_name': '07 - Matara'},
    ]

    this.instituteInfoForm = new FormGroup<any>({
      institute_number: new FormControl('1012'),
      institute_name: new FormControl('KP/ SRI SUMANGALA DAHAM PASALA'),
      contact_fixed: new FormControl('0112123456', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      contact_mobile: new FormControl('0771234567', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address_line1: new FormControl('No. 51', [Validators.required, Validators.maxLength(60), this.trimmedEmptyValidator]),
      address_line2: new FormControl('Kuliyapitiya Road', [Validators.maxLength(60)]),
      postal_town: new FormControl('Hettipola', [Validators.required, Validators.maxLength(20), this.trimmedEmptyValidator]),
      district: new FormControl('05', [Validators.required]),
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  trimmedEmptyValidator(control: FormControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0
    const isValid = !isWhiteSpace
    return isValid ? null : {'whitespace': true}
  }

  onContactFixedEdit() {
    this.contactFixedReadonly = !this.contactFixedReadonly
  }

  onContactFixedUpdate() {
    this.contactFixedReadonly = !this.contactFixedReadonly
  }

  onContactFixedCancel() {
    this.contactFixedReadonly = !this.contactFixedReadonly
  }

  onContactMobileEdit() {
    this.contactMobileReadonly = !this.contactMobileReadonly
  }

  onContactMobileUpdate() {
    this.contactMobileReadonly = !this.contactMobileReadonly
  }

  onContactMobileCancel() {
    this.contactMobileReadonly = !this.contactMobileReadonly
  }

  onAddressLine1Edit() {
    this.addressLine1Readonly = !this.addressLine1Readonly
  }

  onAddressLine1Update() {
    this.addressLine1Readonly = !this.addressLine1Readonly
  }

  onAddressLine1Cancel() {
    this.addressLine1Readonly = !this.addressLine1Readonly
  }

  onAddressLine2Edit() {
    this.addressLine2Readonly = !this.addressLine2Readonly
  }

  onAddressLine2Update() {
    this.addressLine2Readonly = !this.addressLine2Readonly
  }

  onAddressLine2Cancel() {
    this.addressLine2Readonly = !this.addressLine2Readonly
  }

  onPostalTownEdit() {
    this.postalTownReadonly = !this.postalTownReadonly
  }

  onPostalTownUpdate() {
    this.postalTownReadonly = !this.postalTownReadonly
  }

  onPostalTownCancel() {
    this.postalTownReadonly = !this.postalTownReadonly
  }

  onDistrictEdit() {
    this.districtReadonly = !this.districtReadonly
  }

  onDistrictUpdate() {
    this.districtReadonly = !this.districtReadonly
  }

  onDistrictCancel() {
    this.districtReadonly = !this.districtReadonly
  }

  onReset() {
    this.contactFixedReadonly = true
    this.contactMobileReadonly = true
    this.addressLine1Readonly = true
    this.addressLine2Readonly = true
    this.postalTownReadonly = true
    this.districtReadonly = true
  }

  onReadonlyFieldsValidation() {
    return this.contactFixedReadonly && this.contactMobileReadonly && this.addressLine1Readonly && this.addressLine2Readonly && this.postalTownReadonly && this.districtReadonly;
  }

  onSubmit() {
  }
}
