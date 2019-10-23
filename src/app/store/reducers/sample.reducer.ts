import { HttpErrorFormatizer } from 'app/models/rest-error';

import * as sampleActions from '../actions/sample.actions';
import * as sharedActions from '../actions/shared.actions';
import * as SampleState from 'app/store/states/sample.state';

export class State extends SampleState.State { }

const initialState: SampleState.State = SampleState.initialState;


/**
 * Sample Reducer
 *
 * @export
 * @param {any} [state=initialState]
 * @param {sampleActions.Actions} action
 * @returns {State}
 */
export function reducer(state = initialState, action: sampleActions.Actions | sharedActions.Actions): SampleState.State {

  switch (action.type) {
    case sampleActions.ActionTypes.LOADING_SAMPLE:
      state = Object.assign({}, state, { httpError: null, loading: true, content: [] });
      return state;
    case sampleActions.ActionTypes.LOADING_SAMPLE_SELECTED:
      state = Object.assign({}, state, { httpErrorSelected: null, loadingSelected: true, selected: [] });
      return state;
    case sampleActions.ActionTypes.PUT_SAMPLE_LIST:
      if (!(action.payload instanceof Array)) { action.payload = []; }
      state = Object.assign({}, state, { loaded: true, loading: false, content: action.payload });
      return state;
    case sampleActions.ActionTypes.PUT_HTTP_ERROR:
      state = Object.assign({}, state, { loaded: false, loading: false, httpError: HttpErrorFormatizer(action.payload), content: [] });
      return state;
    case sampleActions.ActionTypes.PUT_SAMPLE_SELETED:
      state = Object.assign({}, state, { loadedSelected: true, loadingSelected: false, selected: action.payload });
      return state;
    case sampleActions.ActionTypes.PUT_HTTP_ERROR_SELECTED:
      // tslint:disable-next-line:max-line-length
      state = Object.assign({}, state, { loadedSelected: false, loadingSelected: false, httpErrorSelected: HttpErrorFormatizer(action.payload), selected: [] });
      return state;
    case sampleActions.ActionTypes.STOP_ALL_LOADING:
      state = Object.assign({}, state, { loadingSelected: false, loading: false });
      return state;
    case sampleActions.ActionTypes.ERASE_SAMPLE:
    case sharedActions.ActionTypes.INIT_STORE:
      state = Object.assign({}, state, initialState);
      return state;
    default:
      return state;
  }
}

export const getSampleList = (state: SampleState.State) => { return (state.content instanceof Array) ? state.content : []; };
export const getSampleSelected = (state: SampleState.State) => state.selected;
export const getSampleListLoading = (state: SampleState.State) => state.loading;
export const getSampleListLoaded = (state: SampleState.State) => state.loaded;
export const getSampleSelectedLoading = (state: SampleState.State) => state.loadingSelected;
export const getSampleSelectedLoaded = (state: SampleState.State) => state.loadedSeleted;


export const getSampleHttpError = (state: SampleState.State) => {
  return state.httpError.errorCode ? `code: ${state.httpError.errorCode} - ${state.httpError.errorMessage}` : null;
};

export const getSampleSelectedHttpError = (state: SampleState.State) => {
  return state.httpErrorSelected.errorCode ? `code: ${state.httpErrorSelected.errorCode} - ${state.httpErrorSelected.errorMessage}` : null;
};
