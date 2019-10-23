import { LoggerService } from 'app/services/logger/logger.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from 'app/services/authentication.service';

import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as userDetailsAction from 'app/store/actions/user-detail.actions';

import { Credentials } from 'app/models/credentials';
import { UserDetails } from 'app/models/user-details';

@Component({
  templateUrl: './modal-expired-session.component.html',
  styleUrls: ['./modal-expired-session.component.scss']
})
export class ModalExpiredSessionComponent implements OnInit {
  @Input() fullName;
  @Input() username;

  loginForm: FormGroup;
  credentials: Credentials = { username: '', password: '' };
  formIsLoading$: Observable<boolean>;
  httpErrorStatusText$: Observable<Object>;


  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService: AuthenticationService,
    private store: Store<fromStore.State>,
    private router: Router,
    private logger: LoggerService) {

    this.formIsLoading$ = store.pipe(select(fromStore.getUserDetailsIsLoading));
    this.httpErrorStatusText$ = store.pipe(select(fromStore.getError));


  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.credentials.password, Validators.required)
    });

  }

  onSubmit(loginForm: FormGroup) {

    this.store.dispatch(new userDetailsAction.LoadingUserDetail());

    Object.assign(this.credentials, {
      username: loginForm.value.username,
      password: loginForm.value.password
    });

    if (loginForm.valid) {
      this.logger.debug('ModalExpiredSessionComponent', 'Login with crendetials :', this.credentials);

      this.authenticationService.authenticate(this.credentials)
        .subscribe(
        (res: UserDetails) => {

          this.activeModal.close();
          this.logger.debug('ModalExpiredSessionComponent', 'Login Success :', res);
          this.store.dispatch(new userDetailsAction.PutUserDetail(res));
          // this.router.navigate(['/']);

        },
        (error) => {
          this.logger.error('ModalExpiredSessionComponent', 'Login faild ');
          this.store.dispatch(new userDetailsAction.PutHttpError(error));
        });
    }
  }
}
