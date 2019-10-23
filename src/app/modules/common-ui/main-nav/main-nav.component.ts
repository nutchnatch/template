import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as layoutAction from 'app/store/actions/layout.actions';

import * as fromUserDetails from 'app/store/reducers/user-detail.reducer';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  @Input() label;

  showSidenav$: Observable<boolean>;
  fullUserName$: Observable<string>;
  userLoaded$: Observable<boolean>;

  isOpened: Boolean = true;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.showSidenav$ = store.pipe(select(fromStore.getShowSidenav));
    this.showSidenav$.subscribe((isOpened) => this.isOpened = isOpened );

    this.fullUserName$ = store.pipe(select(fromStore.getFullUserName));
    this.userLoaded$ = store.pipe(select(fromStore.getUserDetailsLoaded));

  }

  openSideBarMenu() {
    // tslint:disable-next-line:max-line-length
    (this.isOpened) ? this.store.dispatch( new layoutAction.CloseSidenavAction() ) : this.store.dispatch( new layoutAction.OpenSidenavAction() );
  }
}
