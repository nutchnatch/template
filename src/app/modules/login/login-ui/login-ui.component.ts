import { LoggerService } from 'app/services/logger/logger.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';

import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import * as userDetailsAction from 'app/actions/user-detail.actions';

import { Credentials } from 'app/models/credentials';
import { UserDetails } from 'app/models/user-details';


@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.scss']
})
export class LoginUiComponent implements OnInit {

  loginForm: FormGroup;
  credentials: Credentials = { username: '', password: '' };

  formIsLoading$: Observable<boolean>;
  userDetailsLoaded$: Observable<boolean>;
  httpErrorStatusText$: Observable<Object>;
  fullUserName$: Observable<string>;

  /**
   * Creates an instance of LoginUiComponent.
   * @param {AuthenticationService} authenticationService
   * @param {Store<fromRoot.State>} store
   * @param {Router} router
   * @param {LoggerService} logger
   *
   * @memberOf LoginUiComponent
   */
  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromRoot.State>,
    private router: Router,
    private logger: LoggerService
  ) {

    this.formIsLoading$ = store.select(fromRoot.getUserDetailsIsLoading);
    this.httpErrorStatusText$ = store.select(fromRoot.getError);
    this.userDetailsLoaded$ = store.select(fromRoot.getUserDetailsLoaded);
    this.fullUserName$ = store.select(fromRoot.getFullUserName);
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {

    this.loginForm = new FormGroup({
      username: new FormControl(this.credentials.username, Validators.required),
      password: new FormControl(this.credentials.password, Validators.required)
    });

  }

  /**
   *
   *
   * @param {FormGroup} loginForm
   *
   * @memberOf LoginUiComponent
   */
  onSubmit(loginForm: FormGroup) {

    this.store.dispatch(new userDetailsAction.LoadingUserDetail());

    Object.assign(this.credentials, {
      username: loginForm.value.username,
      password: loginForm.value.password
    });

    if (loginForm.valid) {
      this.logger.debug('LoginUIComponent', 'Login with crendetials :', this.credentials);

      this.authenticationService.authenticate(this.credentials)
        .subscribe(
        (res: UserDetails) => {
          this.logger.debug('LoginUIComponent', 'Login Success :', res);
          this.store.dispatch(new userDetailsAction.PutUserDetail(res));
          this.router.navigate(['/']);
        },
        (error) => {
          this.logger.error('LoginUIComponent', 'Login faild ');
          this.store.dispatch(new userDetailsAction.PutHttpError(error));
        });

    }
  }

}
