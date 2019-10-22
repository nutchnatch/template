import { SampleExtendComponent } from './sample-extend/sample-extend.component';
import { AuthGuardService } from 'app/services/auth-guard.services';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'welcome',
    component: SampleExtendComponent,
    canActivate: [AuthGuardService] }
];

/**
 * Containers (Pages) Modulos Routes
 *
 * Login Module Routes:
 *  - Homepage/welcome - 'welcome'
 *
 * @export
 * @class LoginRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainersRoutingModule { }
