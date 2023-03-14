import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstitutesComponent} from "./institutes.component";
import {PasswordResetComponent} from "../shared/password-reset/password-reset.component";
import {InstituteInfoComponent} from "./institute-info/institute-info.component";
import {InstituteExamComponent} from "./institute-exam/institute-exam.component";
import {InstituteExamDahamPasalComponent} from "./institute-exam-daham-pasal/institute-exam-daham-pasal.component";
import {SigninComponent} from "../shared/signin/signin.component";
import {AuthGuardInstituteService} from "../services/guards/auth-guard-institute.service";
import {ExamGuardInstituteService} from "../services/guards/exam-guard-institute.service";
import {InstituteSummeryComponent} from "./institute-summery/institute-summery.component";
import {InstituteConfirmationComponent} from "./institute-confirmation/institute-confirmation.component";

const routes: Routes = [
  {path: '', component: InstitutesComponent, canActivate: [AuthGuardInstituteService]},
  {path: 'institute-info', component: InstituteInfoComponent, canActivate: [AuthGuardInstituteService]},
  {path: 'select-exam', component: InstituteExamComponent, canActivate: [AuthGuardInstituteService]},
  {path: 'daham-pasal', component: InstituteExamDahamPasalComponent, canActivate: [AuthGuardInstituteService, ExamGuardInstituteService]},
  {path: 'summery', component: InstituteSummeryComponent, canActivate: [AuthGuardInstituteService, ExamGuardInstituteService]},
  {path: 'confirmation', component: InstituteConfirmationComponent, canActivate: [AuthGuardInstituteService, ExamGuardInstituteService]},
  {path: 'signin', component: SigninComponent},
  {path: 'reset-password', component: PasswordResetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutesRoutingModule {
}
