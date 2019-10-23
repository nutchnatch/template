import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RestError } from 'app/models/rest-error';
import { Component, ChangeDetectionStrategy } from '@angular/core';


import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as httpError from 'app/store/actions/http-error.actions';

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
    protected store: Store<fromStore.State>,
  ) {

    this.httpError$ = store.pipe(select(fromStore.getHttpError));
    this.httpError$.subscribe(error => this.errorHandler(error));
  }

  protected errorHandler(error: RestError) {

    if (error.errorCode === '401') {
      this.onError401();
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
