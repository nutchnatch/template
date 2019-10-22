import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import * as layoutAction from 'app/actions/layout.actions';

import * as fromUserDetails from 'app/reducers/user-detail.reducer';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  showSidenav$: Observable<boolean>;
  fullUserName$: Observable<string>;
  userLoaded$: Observable<boolean>;

  isOpened: Boolean = true;


  constructor(
    private store: Store<fromRoot.State>
  ) {

    this.showSidenav$ = store.select(fromRoot.getShowSidenav);
    this.showSidenav$.subscribe((isOpened) => this.isOpened = isOpened );

    this.fullUserName$ = store.select(fromRoot.getFullUserName);
    this.userLoaded$ = store.select(fromRoot.getUserDetailsLoaded);

  }

  openSideBarMenu() {
    // tslint:disable-next-line:max-line-length
    (this.isOpened) ? this.store.dispatch( new layoutAction.CloseSidenavAction() ) : this.store.dispatch( new layoutAction.OpenSidenavAction() );
  }
}
