import { Observable } from 'rxjs/Observable';
import { ModalExpiredSessionComponent } from 'app/modules/tsp-ui/modals/modal-expired-session/modal-expired-session.component';
import { Router } from '@angular/router';
import { RestError } from 'app/models/rest-error';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Store } from '@ngrx/store';

import * as fromRoot from 'app/reducers';
import * as userAction from 'app/actions/user-detail.actions';
import * as httpError from 'app/actions/http-error.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  private httpError$: Observable<RestError>;
  private fullUserName$: Observable<string>;
  private userName$: Observable<string>;

  private fullUserName: string;
  private userName: string;

  constructor(
    protected store: Store<fromRoot.State>,
    protected router: Router,
    protected modalService: NgbModal
  ) {

    this.httpError$ = store.select(fromRoot.getHttpError);
    this.httpError$.subscribe(error => this.errorHandler(error));

    this.fullUserName$ = store.select(fromRoot.getFullUserName);
    this.fullUserName$.subscribe((fullname) => this.fullUserName = fullname);

    this.userName$ = store.select(fromRoot.getUserName);
    this.userName$.subscribe((username) => this.userName = username);

  }

  protected errorHandler(error: RestError) {

    if (error.errorCode === '401') {
      this.onError401();
      const modalRef = this.modalService.open(ModalExpiredSessionComponent);
      modalRef.componentInstance.fullName = this.fullUserName;
      modalRef.componentInstance.username = this.userName;

    } else if (error.errorCode === '403') {
      // TODO: SHOW A MODAL BOX WITH MISSING CORRECTS ROLES / AUTORIZATION
      alert('Missing Role!');
      this.onError403();
    } else if (error.errorCode === '404') {
      // TODO: SHOW A MODAL WITH PAGE NOT FOUND
      alert('PAGE NOT FOUND');
      this.onError404();
    }
  }

  onError401() { }
  onError403() { }
  onError404() { }

}
