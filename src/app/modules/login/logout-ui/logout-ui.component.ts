import { InitStore } from 'app/actions/shared.actions';
import { LoggerService } from 'app/services/logger/logger.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import * as sharedAction from 'app/actions/shared.actions';
import * as userDetailsAction from 'app/actions/user-detail.actions';
import * as httpErrorAction from 'app/actions/http-error.actions';

@Component({
  selector: 'app-logout-ui',
  templateUrl: './logout-ui.component.html',
  styleUrls: ['./logout-ui.component.scss']
})
export class LogoutUiComponent implements OnInit {

  /**
   * Creates an instance of LogoutComponent.
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @param {Store<fromRoot.State>} store
   *
   * @memberOf LogoutComponent
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private logger: LoggerService
  ) { }

  ngOnInit() {

    this.authenticationService.logout()
      .subscribe(
      (res) => {
        this.logger.debug('LogoutUiComponent', 'Logout Success');
        this.store.dispatch(new sharedAction.InitStore());
        this.router.navigate(['/user/login']);
      },
      (error) => {
        this.logger.error('LogoutUiComponent', 'Logout Failds');
        this.store.dispatch(new userDetailsAction.PutHttpError(error));
        alert(error.status + ' ' + error.statusError);
      });
  }

}
