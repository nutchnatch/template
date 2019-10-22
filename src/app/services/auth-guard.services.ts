import { CurrentUrlAction } from './../actions/layout.actions';
import { getUserDetailLoaded } from './../reducers/user-detail.reducer';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as layoutActions from '../actions/layout.actions';

import { UserDetails } from '../models/user-details';

@Injectable()
export class AuthGuardService implements CanActivate {

  private userDetailsLoaded: boolean;
  private userDetailsLoaded$: Observable<boolean>;

  /**
   * Creates an instance of AuthGuardService.
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @param {Store<fromRoot.State>} store
   *
   * @memberOf AuthGuardService
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromRoot.State>) {

    this.userDetailsLoaded$ = store.select(fromRoot.getUserDetailsLoaded);
    this.userDetailsLoaded$.subscribe((boolResult) => this.userDetailsLoaded = boolResult);

  }

  /**
   * Perform canActivate method - evaluate if a especific use have right permissions to a determinate route
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   *
   * @memberOf AuthGuardService
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state ? state.url : '/';

    if (this.userDetailsLoaded) { return true; }

    this.store.dispatch(new layoutActions.CurrentUrlAction(url));
    this.router.navigate(['/user/check']);
    return false;
  }


  /**
   * Setter used for testing only
   *
   * @param {boolean} value
   *
   * @memberOf AuthGuardService
   */
  setUserLoadedResult(value: boolean): void {
    this.userDetailsLoaded = value;
  }


  /**
   * Getter used for testing only
   *
   * @returns {boolean}
   *
   * @memberOf AuthGuardService
   */
  getUserLoadedResult(): boolean {
    return this.userDetailsLoaded;
  }
}

