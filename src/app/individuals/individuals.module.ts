import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndividualsRoutingModule} from './individuals-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

import {IndividualsComponent} from './individuals.component';
import {SignupComponent} from "./signup/signup.component";

import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import { IndividualExamComponent } from './individual-exam/individual-exam.component';


@NgModule({
  declarations: [
    IndividualsComponent,
    SignupComponent,
    IndividualExamComponent
  ],
  imports: [
    CommonModule,
    IndividualsRoutingModule,
    RippleModule,
    ReactiveFormsModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DialogModule
  ]
})
export class IndividualsModule {
}
