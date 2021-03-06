import { HttpError } from 'app/models/http-error';
import { Sample } from 'app/models/sample';
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOADING_SAMPLE: type('[Sample] loading  sample'),
  LOADING_SAMPLE_SELECTED: type('[Sample] loading  sample selected'),
  PUT_HTTP_ERROR: type('[Sample] Update http error'),
  PUT_HTTP_ERROR_SELECTED: type('[Sample] Update http error selected'),
  PUT_SAMPLE_SELETED: type('[Sample] Update Selected'),
  PUT_SAMPLE_LIST: type('[Sample] Update List'),
  DELETE_SELETED: type('[Sample] Delete Selected'),
  DELETE_LIST: type('[Sample] Delete List'),
  ERASE_SAMPLE: type('[Sample] Erase Sample'),
  STOP_ALL_LOADING: type('[Sample] Stop All Loadings'),

  GET_SAMPLES: type('[Sample] get Samples'),
  GET_SAMPLE_BY_ID: type('[Sample] get Samples by ID'),
  GET_CONFIG: type('[Sample]get config'),
};


export class LoadingSampleAction implements Action {
  type = ActionTypes.LOADING_SAMPLE;

  /**
   * Creates an instance of LoadingSampleAction.
   * @param {any} [payload]
   *
   * @memberOf LoadingSampleAction
   */
  constructor(public payload?) { }
}


export class LoadingSampleSelectedAction implements Action {
  type = ActionTypes.LOADING_SAMPLE_SELECTED;


  /**
   * Creates an instance of LoadingSampleSelectedAction.
   * @param {any} [payload]
   *
   * @memberOf LoadingSampleSelectedAction
   */
  constructor(public payload?) { }
}


export class PutHttpError implements Action {
  type = ActionTypes.PUT_HTTP_ERROR;

  /**
   * Creates an instance of PutHttpError.
   * @param {HttpError} payload
   *
   * @memberOf PutHttpError
   */
  constructor(public payload: HttpError) { }
}

export class PutHttpErrorSelected implements Action {
  type = ActionTypes.PUT_HTTP_ERROR_SELECTED;


  /**
   * Creates an instance of PutHttpErrorSelected.
   * @param {HttpError} payload
   *
   * @memberOf PutHttpErrorSelected
   */
  constructor(public payload: HttpError) { }
}

export class PutSampleSelectedAction implements Action {
  type = ActionTypes.PUT_SAMPLE_SELETED;

  /**
   * Creates an instance of PutSampleSelectedAction.
   * @param {Array<Sample>} payload
   *
   * @memberOf PutSampleSelectedAction
   */
  constructor(public payload: Array<Sample>) { }
}

export class PutSampleListAction implements Action {
  type = ActionTypes.PUT_SAMPLE_LIST;

  /**
   * Creates an instance of PutSampleListAction.
   * @param {Array<Sample>} payload
   *
   * @memberOf PutListAction
   */
  constructor(public payload: Array<Sample>) { }
}


export class EraseSampleAction implements Action {
  type = ActionTypes.ERASE_SAMPLE;

  /**
   * Creates an instance of EraseSampleAction.
   * @param {any} [payload]
   *
   * @memberOf EraseSampleAction
   */
  constructor(public payload?) { }
}

export class StopAllLoadingsAction implements Action {
  type = ActionTypes.STOP_ALL_LOADING;

  /**
   * Creates an instance of EraseSampleAction.
   * @param {any} [payload]
   *
   * @memberOf EraseSampleAction
   */
  constructor(public payload?) { }
}


export class GetSamplesAction implements Action {
  type = ActionTypes.GET_SAMPLES;
  /**
   *Creates an instance of GetSamplesAction.
   * @param {*} [payload]
   * @memberof GetSamplesAction
   */
  constructor(public payload?) { }
}

export class GetSampleByIdAction implements Action {
  type = ActionTypes.GET_SAMPLE_BY_ID;

  constructor(public payload: { id: string }) { }
}


export class GetConfigAction implements Action {
  type = ActionTypes.GET_CONFIG;
  /**
   *Creates an instance of GetConfigAction.
   * @param {*} [payload]
   * @memberof GetConfigAction
   */
  constructor(public payload?) { }
}


export type Actions
  = LoadingSampleAction
  | LoadingSampleSelectedAction
  | PutHttpError
  | PutHttpErrorSelected
  | PutSampleSelectedAction
  | PutSampleListAction
  | EraseSampleAction
  | StopAllLoadingsAction
  | GetSamplesAction
  | GetSampleByIdAction
  | GetConfigAction;
