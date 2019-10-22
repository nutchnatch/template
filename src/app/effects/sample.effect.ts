import { LoggerService } from './../services/logger/logger.service';

import { RestError } from './../models/rest-error';
import { HttpClientService } from './../services/http-client.service';
import { Sample } from './../models/sample';
import { Observable } from 'rxjs/Observable';
import { SampleService } from './../services/sample.service';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as sampleAction from '../actions/sample.actions';
import * as httpErrorAction from '../actions/http-error.actions';

import { Injectable } from '@angular/core';

/**
 * This Class is the Sample Controler Store/{@link SampleService}
 * @export
 * @class SampleEffect
 */
@Injectable()
export class SampleEffect {

  // tslint:disable-next-line:no-inferrable-types
  private hasList: boolean = false;
  private getSampleListLoaded$: Observable<boolean>;
  private actionMethod: string;

  constructor(
    private sampleService: SampleService,
    private store: Store<fromRoot.State>,
    private logger: LoggerService
  ) {
    this.getSampleListLoaded$ = store.select(fromRoot.getSampleIsLoaded);
    this.getSampleListLoaded$.subscribe((isLoaded: boolean) => this.hasList = isLoaded);
  }

  /**
   * Get Sample List
   *
   * Get List from the Store, if not exist, call the {@link SampleService}
   * also change set loading = true, on sample state
   *
   * @memberOf SampleEffect
   */
  getSampleList(): void {
    this.logger.debug('SampleEffect', 'getSampleList() - is data on store: ' + this.hasList);

    this.actionMethod = 'GET_SAMPLE_LIST';

    if (!this.hasList) {
      this.store.dispatch(new sampleAction.LoadingSampleAction());
      this.sampleService.getSampleList()
        .subscribe(
        (resp: Sample[]) => this.store.dispatch(new sampleAction.PutSampleListAction(resp)),
        (error) => this.errorToGlobalState(error)
        );
    }
  }

  /**
   * Get Sample By Id if not exist, call the {@link SampleService}
   * also change set loadingSelected = true,  on sample state
   *
   * @param {number} id
   *
   * @memberOf SampleEffect
   */
  getSampleByID(id: number): void {
    this.logger.debug('SampleEffect', 'getSampleByID()');
    this.actionMethod = 'GET_SAMPLE_BY_ID';
    this.store.dispatch(new sampleAction.LoadingSampleSelectedAction());

    this.sampleService.getSampleByID(id)
      .subscribe(
      (resp: Sample[]) => {
        this.logger.debug('SampleEffect', 'getSampleByID() Success | Dispatch Data to Store | data: ' + resp);
        this.store.dispatch(new sampleAction.PutSampleSelectedAction(resp));
      },
      (error) => this.errorToGlobalState(error)
      );
  }


  /**
   * Error To Global State
   * This method filters the http error, to swicth to local scope or global scope
   *
   * @private
   * @param {*} error
   * @param {boolean} selected
   *
   * @memberOf SampleEffect
   */
  private errorToGlobalState(error: any) {
    this.logger.debug('SampleEffect', 'errorToGlobalState called | ErrorCode: ' + error.errorCode);

    if (error.errorCode === 400 || error.errorCode === '400' || error.errorCode === 'error') {
      this.logger.debug('SampleEffect', 'Dispatch Scope Error to Store');
      this.actionMethod === 'GET_SAMPLE_BY_ID' ?
        this.store.dispatch(new sampleAction.PutHttpErrorSelected(error)) : this.store.dispatch(new sampleAction.PutHttpError(error));
    } else {
      this.logger.debug('SampleEffect', 'ErrorCode != 400 | Dispatch Global HttpError to Store');
      this.store.dispatch(new httpErrorAction.PutHttpErrorAction(error));
    }

  }
}
