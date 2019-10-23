import { Observable, Subscriber, Subscription } from 'rxjs';
import { Breadcrumb } from 'app/models/breadcrumb';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'app/modules/containers/base/base.component';
import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as breadcrumbAction from 'app/store/actions/breadcrumb.actions';
import * as layoutAction from 'app/store/actions/layout.actions';
import { PageConfig } from 'app/store/states/app-config.state';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit, OnDestroy {

  private pageConfig$: Observable<PageConfig>;
  private breadcrumb: Breadcrumb = new Breadcrumb;
  private pageConfigSelect: any;
  private pageConfigSubscription: Subscription;

  constructor(
    store: Store<fromStore.State>,
  ) {
    super(store);

    this.pageConfigSelect = fromStore.getAppConfigDashboard;

    this.pageConfig$ = store.pipe(select(this.pageConfigSelect));
    this.pageConfigSubscription = this.pageConfig$.subscribe(config => {
      this.breadcrumb.links = config.breadcrumb;
      this.store.dispatch(new breadcrumbAction.PutBreadcrumbAction(this.breadcrumb));
      this.store.dispatch(new layoutAction.ToggleSidenavAction(config.sidebarOpened));
    });

  }

  ngOnInit() {
    this.store.dispatch(new breadcrumbAction.PutBreadcrumbAction(this.breadcrumb));
  }

  ngOnDestroy() {
    this.pageConfigSubscription.unsubscribe();
  }
}
