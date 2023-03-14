import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndividualsComponent} from './individuals.component';
import {SigninComponent} from "../shared/signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {PasswordResetComponent} from "../shared/password-reset/password-reset.component";
import {AuthGuardIndividualService} from "../services/guards/auth-guard-individual.service";

const routes: Routes = [
  {path: '', component: IndividualsComponent, canActivate: [AuthGuardIndividualService]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'reset-password', component: PasswordResetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualsRoutingModule {
}
