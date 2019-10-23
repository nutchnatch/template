import { InitStore } from 'app/store/actions/shared.actions';
import { LoggerService } from 'app/services/logger/logger.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as sharedAction from 'app/store/actions/shared.actions';
import * as userDetailsAction from 'app/store/actions/user-detail.actions';
import * as httpErrorAction from 'app/store/actions/http-error.actions';

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
   * @param {Store<fromStore.State>} store
   *
   * @memberOf LogoutComponent
   */
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    public store: Store<fromStore.State>,
    public logger: LoggerService,
  ) { }

  ngOnInit() {
    this.authenticationService.logout()
      .subscribe(
      (res) => {
        this.logger.debug('LogoutUiComponent', 'Logout Success');
        this.store.dispatch(new sharedAction.InitStore());
        this.router.navigate(['app/user/login']);
      },
      (error) => {
        this.logger.error('LogoutUiComponent', 'Logout Failds');
        this.store.dispatch(new sharedAction.InitStore());
        // this.store.dispatch(new userDetailsAction.PutHttpError(error));
        // alert(error.status + ' ' + error.statusError);
        if ( error && error.status === 500 || error && error.status === '500' ) { this.router.navigate(['app/user/login']); }
      });
  }

}
