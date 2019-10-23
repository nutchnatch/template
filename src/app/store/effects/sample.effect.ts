import { RestResponse } from './../../models/rest-response';
import { SampleService } from 'app/services/sample.service';
import { Injectable } from '@angular/core';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoggerService } from 'app/services/logger/logger.service';

import * as fromStore from '..';
import * as sampleActions from 'app/store/actions/sample.actions';
import { Sample } from 'app/models/sample';

/**
 *
 *
 * @export
 * @class DocumentV2Effects
 */
@Injectable()
export class SampleEffects {

  @Effect()
  GetSamples$ = this.actions$
    .pipe(
      ofType(sampleActions.ActionTypes.GET_SAMPLES),
      tap((action: sampleActions.GetSamplesAction) => {
        this.logger.debug('SampleEffect', 'GetSamples called: fake?' + action.payload.fake);
        this.store.dispatch(new sampleActions.LoadingSampleAction());
      }),
      mergeMap((action: sampleActions.GetSamplesAction)  => {
        return this.sampleServices.getSampleList()
          .pipe(
            map( (resp: RestResponse<Sample>) => {
              this.logger.debug('SampleEffect', 'GetSamples success with result: ', resp.result);
              return new sampleActions.PutSampleListAction(resp.result);
            }
            ),
            catchError((error) => {
              // this.errorToGlobalState(error, true);
              return EMPTY;
            })
          );
      })
    );

  @Effect()
  GetSampleById$ = this.actions$
    .pipe(
      ofType(sampleActions.ActionTypes.GET_SAMPLE_BY_ID),
      tap((action: sampleActions.GetSampleByIdAction) => {
        this.logger.debug('SampleEffect', 'GetSampleById() with id: ', action.payload.id);
      }),
      mergeMap((action: sampleActions.GetSampleByIdAction) => {
        return this.sampleServices.getSampleByID(action.payload.id)
          .pipe(
            map(resp => {
              this.logger.debug('SampleEffect', 'getSampleByID() Success | Dispatch Data to Store | data: ' + resp[0]);
              return new sampleActions.PutSampleSelectedAction(resp[0]);
            }
            ),
            catchError((error) => {
              // this.logger.error('DocumentEffect', 'getDocumentsById error!! ', error);
              // this.errorToGlobalState(error, true);
              return EMPTY;
            })
          );
      })
    );

  constructor(
    public store: Store<fromStore.State>,
    private sampleServices: SampleService,
    private actions$: Actions,
    public logger: LoggerService
  ) {
  }

}
