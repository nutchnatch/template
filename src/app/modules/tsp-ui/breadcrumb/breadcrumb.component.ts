import { Link } from 'app/models/breadcrumb';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import * as fromRoot from 'app/reducers';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  private breadcrumbLinks$: Observable<Link[]>;

  /**
   * Creates an instance of BreadcrumbComponent.
   * @param {Store<fromRoot.State>} store
   * @param {Router} router
   *
   * @memberOf BreadcrumbComponent
   */
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router) {

    this.breadcrumbLinks$ = store.select(fromRoot.getCurrentBreadcrumb);
  }
}
