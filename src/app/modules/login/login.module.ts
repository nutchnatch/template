import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';

import { AuthenticationService } from 'app/services/authentication.service';

import { LoginComponent } from './login.component';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { LogoutUiComponent } from './logout-ui/logout-ui.component';
import { LoginCheckComponent } from './login-check/login-check.component';

/**
 * Login Module
 *
 * Login Modules contains all logic to user performs Authentication, Logout etc.
 *
 * Login Module Routes:
 * See {@link LoginRoutingModule}.
 *
 * @export
 * @class LoginModule
 */
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [
    AuthenticationService
  ],
  declarations: [
    LoginComponent,
    LoginUiComponent,
    LogoutUiComponent,
    LoginCheckComponent
]
})
export class LoginModule { }
