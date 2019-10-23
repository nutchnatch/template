import { SampleExtendComponent } from './sample-extend/sample-extend.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'app/dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'app/dashboard/:id',
    component: SampleExtendComponent,
    data: {
      title: 'Dashboard - Sample', type: 'DASHBOARD',
      roles: ['SUGAR_CONFIDENTIAL', 'SUGAR_USER_ROLE', 'SUGAR_READ_USER_ROLE']
    }
  },
  {
    path: '**',
    redirectTo: 'app/dashboard', pathMatch: 'full',
  }
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
