import { Subscription } from 'rxjs';
import { Error } from 'app/models/error';
import { Title } from '@angular/platform-browser';
import { LoggerService } from 'app/services/logger/logger.service';
import { Router, ParamMap, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';

import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as userDetailsAction from 'app/store/actions/user-detail.actions';

import { Credentials } from 'app/models/credentials';
import { UserDetails } from 'app/models/user-details';



@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.scss']
})
export class LoginUiComponent implements OnInit, OnDestroy {
  showWaring: boolean;
  subscribeScope: Subscription;

  loginForm: FormGroup;
  credentials: Credentials = { username: '', password: '' };
  scope: string;
  editScope: boolean;

  formIsLoading$: Observable<boolean>;
  userDetailsLoaded$: Observable<boolean>;
  httpErrorStatusText$: Observable<Object>;
  fullUserName$: Observable<string>;

  UserLoged = false;
  /**
   * Creates an instance of LoginUiComponent.
   * @param {AuthenticationService} authenticationService
   * @param {Store<fromStore.State>} store
   * @param {Router} router
   * @param {LoggerService} logger
   *
   * @memberOf LoginUiComponent
   */
  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromStore.State>,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private titleService: Title
  ) {

    this.editScope = false;

    this.formIsLoading$ = store.pipe(select(fromStore.getUserDetailsIsLoading));
    this.httpErrorStatusText$ = store.pipe(select(fromStore.getError));
    this.userDetailsLoaded$ = store.pipe(select(fromStore.getUserDetailsLoaded));
    this.fullUserName$ = store.pipe(select(fromStore.getFullUserName));

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
          this.router.navigate(['/app/user/check']);

        },
        (error: Error) => {
          this.logger.error('LoginUIComponent', 'Login faild ', error);
          this.store.dispatch(new userDetailsAction.PutHttpError(error));
        });

    }
  }

  ngOnInit() {

    this.initForm();

    this.authenticationService.authenticate()
      .subscribe(
      (res: UserDetails) => {
        this.store.dispatch(new userDetailsAction.PutUserDetail(res));
        this.router.navigate(['/app/user/check']);

      },
      (error) => {
        // this.router.navigate(['app/user/login']);
      });
  }

  ngOnDestroy() {
    this.subscribeScope.unsubscribe();
  }

}
