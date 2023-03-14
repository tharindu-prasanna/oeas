import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {PasswordResetComponent} from "./shared/password-reset/password-reset.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'reset-password', component: PasswordResetComponent},
  {path: 'individuals', loadChildren: () => import('./individuals/individuals.module').then(m => m.IndividualsModule)},
  {path: 'institutes', loadChildren: () => import('./institutes/institutes.module').then(m => m.InstitutesModule)},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
