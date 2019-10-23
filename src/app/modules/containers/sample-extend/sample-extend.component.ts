import { ToastrService } from 'ngx-toastr';
import { Sample } from './../../../models/sample';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Breadcrumb, Link } from 'app/models/breadcrumb';
import { Store, select } from '@ngrx/store';
import { BaseComponent } from './../base/base.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromStore from 'app/store';
import * as breadcrumbAction from 'app/store/actions/breadcrumb.actions';
import * as sampleAction from 'app/store/actions/sample.actions';

@Component({
  selector: 'app-sample-extend',
  templateUrl: './sample-extend.component.html',
  styleUrls: ['./sample-extend.component.scss']
})
export class SampleExtendComponent extends BaseComponent implements OnInit , OnDestroy {

  private breadcrumb: Breadcrumb = new Breadcrumb;
  private linksToBreadcrumb: Link[];
  private subscribeActiveRouteData: Subscription;
  private sampleSelected$: Observable<Sample>;

  constructor(
    public store: Store<fromStore.State>,
    public activatedRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super(store);

    this.linksToBreadcrumb = [
      { 'label' : 'Home', path: '/'},
      { 'label': 'Sample' }
    ];
    this.breadcrumb.links = this.linksToBreadcrumb;

    this.sampleSelected$ = this.store.pipe(select(fromStore.getSampleSelected));
  }

  ngOnInit() {
    this.store.dispatch(new breadcrumbAction.PutBreadcrumbAction(this.breadcrumb));
    this.subscribeActiveRouteData = this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(new sampleAction.GetSampleByIdAction({ id: paramMap.get('id') }));
      this.toastr.success('<strong>Action succesfull.</strong>');
    });
  }

  ngOnDestroy() {
    this.subscribeActiveRouteData.unsubscribe();
  }

  onError401() {
    // this.store.dispatch(new samplesAction.StopAllLoadingsAction());
  }
}
