import { LoginCheckComponent } from './login-check/login-check.component';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LogoutUiComponent } from './logout-ui/logout-ui.component';


const routes: Routes = [
{ path: 'user', component: LoginComponent,
    children: [
      { path: 'user', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginUiComponent },
      { path: 'logout', component: LogoutUiComponent },
      { path: 'check', component: LoginCheckComponent }
    ]
  }
];


/**
 * Login Modulos Routes
 * 
 * Login Module Routes:
 *  - Login route - 'user/login'
 *  - Logout route - 'user/logout'
 * 
 * @export
 * @class LoginRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
