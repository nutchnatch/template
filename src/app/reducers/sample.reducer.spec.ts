import { State } from './sample.reducer';
import { initialState } from './sample.reducer';
import { StoreModule, Store, ActionReducer } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';
import * as sampleActions from '../actions/sample.actions';
import * as sharedActions from '../actions/shared.actions';

import { Sample } from './../models/sample';
import * as fromRoot from '../reducers';
import * as fromSample from '../reducers/sample.reducer';

const FakeState = (arg?: Object) => {
  if (arg) {
    let state = Object.assign({}, initialState, arg);
    return state;
  }
  return initialState;
}

const contentTypeHttpError = [
  FakeState({}),
  FakeState({ httpError: null }),
  FakeState({ httpError: {} }),
  FakeState({ httpError: undefined }),
  FakeState({ httpError: '' }),
  FakeState({
    httpError: {
      errorMessage: 0
    }
  }),
  FakeState({
    httpError: {
      errorMessage: null
    }
  }),
  FakeState({
    httpError: {
      errorMessage: undefined
    }
  }),
  FakeState({
    httpError: {
      errorMessage: []
    }
  }),
  FakeState({
    httpError: {
      errorCode: null
    }
  }),
  FakeState({
    httpError: {
      errorCode: undefined
    }
  }),
  FakeState({
    httpError: {
      errorCode: []
    }
  }),
  FakeState({
    httpError: {
      errorCode: true
    }
  }),
  FakeState({
    httpError: {
      errorCode: {}
    }
  }),
  FakeState({
    httpError: {
      errorCode: 400
    }
  }),
  FakeState({
    httpError: {
      errorCode: '400'
    }
  })
];

const contentTypeHttpErrorSelected = [
  FakeState({}),
  FakeState({ httpErrorSelected: null }),
  FakeState({ httpErrorSelected: {} }),
  FakeState({ httpErrorSelected: undefined }),
  FakeState({ httpErrorSelected: '' }),
  FakeState({
    httpErrorSelected: {
      errorMessage: 0
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorMessage: null
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorMessage: undefined
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorMessage: []
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: null
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: undefined
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: []
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: true
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: {}
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: 400
    }
  }),
  FakeState({
    httpErrorSelected: {
      errorCode: '400'
    }
  })
]



describe('sampleReducer', () => {

  describe('Sample Reducer and Selecters BOOLEAN states', () => {
    /**
    * IN case of loading, loaded, loadingSelected and loadedSeleted, their values are boolean and doesnt have an effects from 'outside'
    */
    it('should create state | loading = true ', () => {
      let expectCurrentState = FakeState({ loading: true });
      expect(initialState).not.toEqual(expectCurrentState, "After the action LOADING_SAMPLE, the initialState must be not Equal to currentState");
      expect(expectCurrentState.loading).toBeTruthy('loading state must be true');
    });

    it('selector getSampleListLoading() | get true|false', () => {
      let expectCurrentStateLoading = FakeState({ loading: true });
      let selectLoading = fromSample.getSampleListLoading(expectCurrentStateLoading);
      expect(selectLoading).toMatch(/true|false/, 'loading must return true|false');
    });

    it('should create state | loaded = true ', () => {
      let expectCurrentState = FakeState({ loaded: true });
      expect(initialState).not.toEqual(expectCurrentState, "After the action PUT_SAMPLE_LIST, the initialState must be not Equal to currentState");
      expect(expectCurrentState.loaded).toBeTruthy('loaded state must be true');
    });

    it('selector getSampleListLoaded() | get true|false', () => {
      let expectCurrentStateLoaded = FakeState({ loading: true });
      let selectLoading = fromSample.getSampleListLoaded(expectCurrentStateLoaded);
      expect(selectLoading).toMatch(/true|false/, 'loading must return true|false');
    });

    it('should create state | loadingSelected = true ', () => {
      let expectCurrentState = FakeState({ loadingSelected: true });
      expect(initialState).not.toEqual(expectCurrentState, "After the action LOADING_SAMPLE_SELECTED, the initialState must be not Equal to currentState");
      expect(expectCurrentState.loadingSelected).toBeTruthy('loadingSelected state must be true');
    });

    it('selector getSampleSelectedLoading() | get true|false', () => {
      let expectCurrentStateSelectedLoading = FakeState({ loading: true });
      let selectLoading = fromSample.getSampleListLoading(expectCurrentStateSelectedLoading);
      expect(selectLoading).toMatch(/true|false/, 'loadingSelected must return true|false');
    });

    it('should create state | loadedSeleted = true ', () => {
      let expectCurrentState = FakeState({ loadedSeleted: true });
      expect(initialState).not.toEqual(expectCurrentState, "After the action LOADING_SAMPLE_SELECTED, the initialState must be not Equal to currentState");
      expect(expectCurrentState.loadedSeleted).toBeTruthy('loadedSeleted state must be true');
    });

    it('selector getSampleSelectedLoading() | get true|false', () => {
      let expectCurrentStateSelectedLoaded = FakeState({ loading: true });
      let loadedSeleted = fromSample.getSampleListLoading(expectCurrentStateSelectedLoaded);
      expect(loadedSeleted).toMatch(/true|false/, 'loadingSelected must return true|false');
    });
  })

  describe('Sample Reducer and Selecters Content/SelectedContent states', () => {
    let contentType = [null, undefined, {}, ''];

    contentType.forEach(test => {

      it('should create state | when content = ' + test + ' || must return a [] ', () => {
        let testContent = { content: test };
        let expectCurrentState = fromSample.reducer(initialState, { type: sampleActions.ActionTypes.PUT_SAMPLE_LIST, payload: testContent });
        expect(initialState).not.toEqual(expectCurrentState, "After the action PUT_SAMPLE_LIST, the initialState must be not Equal to currentState");
        expect(expectCurrentState.content).toEqual([], 'when a content null is passed to the store, must be `converted` to empty array');
      });

      it('selector getSampleList() | get type of ' + test, () => {
        let expectCurrentStateContent = FakeState({ content: test });
        let content = fromSample.getSampleList(expectCurrentStateContent);
        expect(content).toEqual([], 'content must return type of Array');
      });

      it('should create state | when selected = ' + test + ' must return a [] ', () => {
        let testContent = { selected: test };
        let expectCurrentState = fromSample.reducer(initialState, { type: sampleActions.ActionTypes.PUT_SAMPLE_SELETED, payload: testContent });
        expect(initialState).not.toEqual(expectCurrentState, "After the action PUT_SAMPLE_LIST, the initialState must be not Equal to currentState");
        expect(expectCurrentState.selected).toEqual([], 'when a content null is passed to the store, must be `converted` to empty array');
      });

      it('selector getSampleSelected() | get type of ' + test, () => {
        let expectCurrentStateSelected = FakeState({ selected: test });
        let selected = fromSample.getSampleSelected(expectCurrentStateSelected);
        expect(selected).toEqual([], 'selected must return type of Array');
      });

    });
  })

  describe('Sample Reducer and Selecters httpError/httpErrorSelected states', () => {

    it('should create state | after PUT_HTTP_ERROR action the store must change ', () => {
      let expectCurrentState = fromSample.reducer(initialState, { type: sampleActions.ActionTypes.PUT_HTTP_ERROR, payload: contentTypeHttpError[0] });
      expect(initialState).not.toEqual(expectCurrentState, "After the action PUT_HTTP_ERROR, the initialState must be not Equal to currentState");
    });

    contentTypeHttpError.forEach(test => {
      //PUT_HTTP_ERROR
      let expectCurrentState = fromSample.reducer(initialState, { type: sampleActions.ActionTypes.PUT_HTTP_ERROR, payload: test.httpError });

      it('should create state | when httpError = ' + JSON.stringify(test.httpError) + '  |   must return a RestError ', () => {
        expect(expectCurrentState.httpError.errorCode).toMatch(/\berror|(\d{3})\b/, "After the action PUT_HTTP_ERROR, the error code must match with 'error' or d{3} (ex: 000, 400)");
        expect(expectCurrentState.httpError.errorMessage).not.toEqual(" ", "After the action PUT_HTTP_ERROR, the errorMessage code must be a string != '' ");
      });

      it('selector getSampleHttpError() | must return string ex: "code: *** - message error" ', () => {
        let httpError = fromSample.getSampleHttpError(expectCurrentState);
        expect(httpError).not.toEqual('', 'httpError must some string');
        // expect(httpError).not.toEqual(null, 'selected must return type of Array');
        expect(httpError).toMatch(/\bcode|(\d{3})\b/);
      });

    });

    contentTypeHttpErrorSelected.forEach(test => {
      //PUT_HTTP_ERROR_SELECTED
      let expectCurrentState = fromSample.reducer(initialState, { type: sampleActions.ActionTypes.PUT_HTTP_ERROR_SELECTED, payload: test.httpErrorSelected });
      
      it('should create state | when httpErrorSelected = ' + JSON.stringify(test.httpErrorSelected) + '  |   must return a RestError ', () => {
        expect(expectCurrentState.httpErrorSelected.errorCode).toMatch(/\berror|(\d{3})\b/, "After the action PUT_HTTP_ERROR_SELECTED, the error code must match with 'error' or d{3} (ex: 000, 400)");
        expect(expectCurrentState.httpErrorSelected.errorMessage).not.toEqual(" ", "After the action PUT_HTTP_ERROR_SELECTED, the errorMessage code must be a string != '' ");
      });

      it('selector getSampleHttpError() | must return string ex: "code: *** - message error" ', () => {
        let httpErrorSeleted = fromSample.getSampleHttpError(expectCurrentState);
        expect(httpErrorSeleted).not.toEqual('', 'httpErrorSeleted must some string');
        expect(httpErrorSeleted).toMatch(/\bcode|(\d{3})\b/);
      });

    });
  })
});

