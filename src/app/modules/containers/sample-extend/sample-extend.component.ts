import { ModalExpiredSessionComponent } from 'app/modules/tsp-ui/modals/modal-expired-session/modal-expired-session.component';
import { Breadcrumb, Link } from 'app/models/breadcrumb';
import { RestError } from 'app/models/rest-error';
import { SampleEffect } from 'app/effects/sample.effect';
import { Sample } from 'app/models/sample';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseComponent } from './../base/base.component';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from 'app/reducers';
import * as samplesAction from 'app/actions/sample.actions';
import * as breadcrumbAction from 'app/actions/breadcrumb.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sample-extend',
  templateUrl: './sample-extend.component.html',
  styleUrls: ['./sample-extend.component.scss']
})
export class SampleExtendComponent extends BaseComponent implements OnInit {

  private breadcrumb: Breadcrumb = new Breadcrumb;
  private linksToBreadcrumb: Link[];

  private listSample$: Observable<Sample[]>;
  private listLoading$: Observable<boolean>;
  private listError$: Observable<RestError>;

  private seletedSample$: Observable<Sample[]>;
  private selectedLoading$: Observable<boolean>;
  private selectedError$: Observable<RestError>;

  constructor(
    store: Store<fromRoot.State>,
    router: Router,
    modalService: NgbModal,
    private effect: SampleEffect) {
    super(store, router, modalService);

    this.linksToBreadcrumb = [
      { 'path': './', 'label': 'Welcome' },
      { 'path': '/Samples', 'label': 'Samples' },
      { 'label': 'Sample' }
    ];
    this.breadcrumb.links = this.linksToBreadcrumb;

    this.listSample$ = store.select(fromRoot.getSampleList);
    this.seletedSample$ = store.select(fromRoot.getSampleDetail);

    this.listLoading$ = store.select(fromRoot.getSampleIsLoading);
    this.selectedLoading$ = store.select(fromRoot.getSampleSelectedIsLoading);

    this.listError$ = store.select(fromRoot.getSampleError);
    this.selectedError$ = store.select(fromRoot.getSampleSelectedError);

  }

  ngOnInit() {
    this.store.dispatch(new breadcrumbAction.PutBreadcrumbAction(this.breadcrumb));
    this.effect.getSampleList();
  }

  getSampleById(id: number) {
    this.effect.getSampleByID(id);
  }

  onError401() {
    this.store.dispatch(new samplesAction.StopAllLoadingsAction());
  }
}
