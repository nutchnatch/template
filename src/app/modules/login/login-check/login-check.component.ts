import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { LoggerService } from 'app/services/logger/logger.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';


import * as fromStore from 'app/store';
import * as userDetailsAction from 'app/store/actions/user-detail.actions';

import { UserDetails } from 'app/models/user-details';

@Component({
  selector: 'app-login-check',
  templateUrl: './login-check.component.html',
  styleUrls: ['./login-check.component.css']
})
export class LoginCheckComponent implements OnInit {

  public snapedURL$: Observable<string>;
  public redirectUrl: string;

  /**
   * Creates an instance of LoginCheckComponent.
   * This class is to check if a user is authenticated on server side
   *
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @param {Store<fromStore.State>} store
   * @param {LoggerService} logger
   *
   * @memberOf LoginCheckComponent
   */
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    public titleService: Title,
    public store: Store<fromStore.State>,
    public logger: LoggerService
  ) {
    this.snapedURL$ = store.pipe(select(fromStore.getLayoutUrl));
    this.snapedURL$.subscribe((url) => this.redirectUrl = url);
  }

  ngOnInit() {
    this.titleService.setTitle('Sugar // Checking Login');

    this.authenticationService.authenticate()
      .subscribe(
        (res: UserDetails) => {

          this.store.dispatch(new userDetailsAction.PutUserDetail(res));
          this.redirectUrl ? this.router.navigateByUrl(this.redirectUrl) : this.router.navigate(['/app']);
          return true;
        },
        (error) => {
          this.router.navigate(['app/user/login']);
          return false;
        });
  }

}
