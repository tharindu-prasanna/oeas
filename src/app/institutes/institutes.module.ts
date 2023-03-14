import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InstitutesRoutingModule} from './institutes-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

import {InstitutesComponent} from './institutes.component';
import {InstituteInfoComponent} from './institute-info/institute-info.component';
import {InstituteExamComponent} from './institute-exam/institute-exam.component';
import {InstituteExamDahamPasalComponent} from './institute-exam-daham-pasal/institute-exam-daham-pasal.component';

import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {AutoFocusModule} from "primeng/autofocus";
import {FieldsetModule} from "primeng/fieldset";
import {DividerModule} from "primeng/divider";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {InstituteSummeryComponent} from './institute-summery/institute-summery.component';
import {InstituteConfirmationComponent} from './institute-confirmation/institute-confirmation.component';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    InstitutesComponent,
    InstituteInfoComponent,
    InstituteExamComponent,
    InstituteExamDahamPasalComponent,
    InstituteSummeryComponent,
    InstituteConfirmationComponent,
  ],
  imports: [
    CommonModule,
    InstitutesRoutingModule,
    RippleModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    AutoFocusModule,
    FieldsetModule,
    DividerModule,
    FileUploadModule,
    TableModule
  ],
  providers: [MessageService]
})
export class InstitutesModule {
}
