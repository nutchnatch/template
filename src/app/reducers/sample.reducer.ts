import { RestError, HttpErrorFormatizer } from './../models/rest-error';
import { Sample } from './../models/sample';
import * as sampleActions from '../actions/sample.actions';
import * as sharedActions from '../actions/shared.actions';


/**
 * User State
 * 
 * @export
 * @class State
 */
export class State {
  loading: boolean;
  loaded: boolean;
  loadingSelected: boolean;
  loadedSeleted: boolean;
  httpError: RestError;
  content: Array<Sample>;
  selected: Array<Sample>;
  httpErrorSelected: RestError;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  loadingSelected: false,
  loadedSeleted: false,
  content: [],
  httpError: new RestError,
  selected: [],
  httpErrorSelected: new RestError
};


const HttpErrorHarmony = (httpError: any) => {
  let httpErrorHarmony : RestError = new RestError;
  
  if( !httpError ) httpError = httpErrorHarmony;
  if( !httpError.hasOwnProperty('errorCode')  ) httpError.errorCode = 'error';
  if( !httpError.hasOwnProperty('errorMessage')  ) httpError.errorMessage = 'No message form server!!';
  
  if( httpError.errorCode === null || httpError.errorCode === undefined || typeof httpError.errorCode === 'object' || typeof httpError.errorCode === 'boolean' )  httpError.errorCode = 'error';
  if( httpError.errorMessage === null || httpError.errorMessage === undefined || typeof httpError.errorMessage === 'object' || typeof httpError.errorMessage === 'boolean' ) httpError.errorMessage = 'No message form server!!';
 
  if( typeof httpError.errorCode === 'number' )  httpError.errorCode  = httpError.errorCode.toString();

  Object.assign(httpErrorHarmony, httpError);
  return httpErrorHarmony
}

/**
 * Sample Reducer
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {sampleActions.Actions} action 
 * @returns {State} 
 */
export function reducer(state = initialState, action: sampleActions.Actions): State {

  switch (action.type) {
    case sampleActions.ActionTypes.LOADING_SAMPLE:
      state = Object.assign({}, state, { httpError: new RestError, loading: true, content: [] });
      return state;
    case sampleActions.ActionTypes.LOADING_SAMPLE_SELECTED:
      state = Object.assign({}, state, { httpErrorSelected: new RestError, loadingSelected: true, selected: [] });
      return state;
    case sampleActions.ActionTypes.PUT_SAMPLE_LIST:
      if(!(action.payload instanceof Array) ) action.payload = [];
      state = Object.assign({}, state, { loaded: true, loading: false, content: action.payload });
      return state;
    case sampleActions.ActionTypes.PUT_HTTP_ERROR:
      state = Object.assign({}, state, { loaded: false, loading: false, httpError:  HttpErrorFormatizer(action.payload) , content: [] });
      return state;
    case sampleActions.ActionTypes.PUT_SAMPLE_SELETED:
      if(!(action.payload instanceof Array) ) action.payload = [];
      state = Object.assign({}, state, { loadedSelected: true, loadingSelected: false, selected: action.payload });
      return state;
    case sampleActions.ActionTypes.PUT_HTTP_ERROR_SELECTED:
      state = Object.assign({}, state, { loadedSelected: false, loadingSelected: false, httpErrorSelected: HttpErrorFormatizer(action.payload), selected: [] });
      return state;
    case sampleActions.ActionTypes.ERASE_SAMPLE:
      state = Object.assign({}, state, initialState);
      return state;
    case sampleActions.ActionTypes.STOP_ALL_LOADING:
      state = Object.assign({}, state, { loadingSelected: false, loading: false });
      return state;
    case sharedActions.ActionTypes.INIT_STORE:
      state = Object.assign({}, state, initialState);
      return state;
    default:
      return state;
  }
}

export const getSampleList = (state: State) => {  return (state.content instanceof Array) ? state.content : [] };
export const getSampleSelected = (state: State) => {  return (state.selected instanceof Array) ? state.selected : [] };
export const getSampleListLoading = (state: State) => state.loading;
export const getSampleListLoaded = (state: State) => state.loaded;
export const getSampleSelectedLoading = (state: State) => state.loadingSelected;
export const getSampleSelectedLoaded = (state: State) => state.loadedSeleted;


export const getSampleHttpError = (state: State) => {
  return state.httpError.errorCode ? `code: ${state.httpError.errorCode} - ${state.httpError.errorMessage}` : null
};

export const getSampleSelectedHttpError = (state: State) => {
  return state.httpErrorSelected.errorCode ? `code: ${state.httpErrorSelected.errorCode} - ${state.httpErrorSelected.errorMessage}` : null
};