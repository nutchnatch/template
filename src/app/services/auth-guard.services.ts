import { CurrentUrlAction } from 'app/store/actions/layout.actions';
import { getUserDetailLoaded } from 'app/store/reducers/user-detail.reducer';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as layoutActions from 'app/store/actions/layout.actions';

import { UserDetails } from '../models/user-details';

@Injectable()
export class AuthGuardService implements CanActivate {

  private userDetailsLoaded: boolean;
  private userDetailsLoaded$: Observable<boolean>;

  /**
   * Creates an instance of AuthGuardService.
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @param {Store<fromStore.State>} store
   *
   * @memberOf AuthGuardService
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromStore.State>) {

    this.userDetailsLoaded$ = store.pipe(select(fromStore.getUserDetailsLoaded));
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
    this.router.navigate(['app/user/check']);
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

