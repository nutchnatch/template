import { Link } from 'app/models/breadcrumb';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';

import * as fromStore from 'app/store';
import * as breadcrumbAction from 'app/store/actions/breadcrumb.actions';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy  {
  private breadcrumbLinks$: Observable<Link[]>;

  /**
   * Creates an instance of BreadcrumbComponent.
   * @param {Store<fromStore.State>} store
   * @param {Router} router
   *
   * @memberOf BreadcrumbComponent
   */
  constructor(
    private store: Store<fromStore.State>,
    private router: Router) {

    this.breadcrumbLinks$ = store.pipe(select(fromStore.getCurrentBreadcrumb));
  }

  ngOnDestroy() {
    this.store.dispatch(new breadcrumbAction.EraseBreadcrumbAction());
  }

}
