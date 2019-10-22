import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import * as layout from 'app/actions/layout.actions';

@Component({
  selector: 'app-guarded-content',
  templateUrl: './guarded-content.component.html',
  styleUrls: ['./guarded-content.component.scss']
})
export class GuardedContentComponent {
  showSidenav$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.showSidenav$ = store.select(fromRoot.getShowSidenav);
    // this.showSidenav$.subscribe((open) => console.log(open))

   }
}
