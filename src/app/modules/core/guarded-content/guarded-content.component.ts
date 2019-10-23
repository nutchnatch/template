import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as layout from 'app/store/actions/layout.actions';

@Component({
  selector: 'app-guarded-content',
  templateUrl: './guarded-content.component.html',
  styleUrls: ['./guarded-content.component.scss']
})
export class GuardedContentComponent {

  @Input() metadataComponent: boolean;

  showSidenav$: Observable<boolean>;
  sideBarPined$: Observable<boolean>;
  showMetadataBar$: Observable<boolean>;
  hasPreviewResult$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
  ) {
    this.showSidenav$ = store.pipe(select(fromStore.getShowSidenav));
   }
}
