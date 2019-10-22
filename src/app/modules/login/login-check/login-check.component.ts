import { Observable } from 'rxjs/Observable';
import { LoggerService } from 'app/services/logger/logger.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from 'app/reducers';
import * as userDetailsAction from 'app/actions/user-detail.actions';

import { UserDetails } from 'app/models/user-details';

@Component({
  selector: 'app-login-check',
  templateUrl: './login-check.component.html',
  styleUrls: ['./login-check.component.css']
})
export class LoginCheckComponent implements OnInit {

  private snapedURL$: Observable<string>;
  private redirectUrl: string;

  /**
   * Creates an instance of LoginCheckComponent.
   * This class is to check if a user is authenticated on server side
   *
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @param {Store<fromRoot.State>} store
   * @param {LoggerService} logger
   *
   * @memberOf LoginCheckComponent
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private logger: LoggerService
  ) {
    this.snapedURL$ = this.store.select(fromRoot.getLayoutUrl);
    this.snapedURL$.subscribe((url) => this.redirectUrl = url );
  }

  ngOnInit() {

     this.authenticationService.authenticate()
      .subscribe(
      (res: UserDetails) => {
        this.store.dispatch(new userDetailsAction.PutUserDetail(res));
        this.redirectUrl ? this.router.navigate([this.redirectUrl]) : this.router.navigate(['/']);
        return true;
      },
      (error) => {
        this.router.navigate(['/user/login']);
        return false;
      });
  }

}
