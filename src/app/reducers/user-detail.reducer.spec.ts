//TODO: ERROR FORMATIZER AND UNIT TESTES

import { State } from './user-detail.reducer';
import { initialState } from './user-detail.reducer';
import { StoreModule, Store, ActionReducer } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';
import * as userDetailActions from '../actions/user-detail.actions';
import * as sharedActions from '../actions/shared.actions';


import { UserDetails } from '../models/user-details';
import * as fromRoot from '../reducers';
import * as fromUserDetails from '../reducers/user-detail.reducer';

const FakeState = (arg?: Object) => {
  if (arg) {
    let state = Object.assign({}, initialState, arg);
    return state;
  }
  return initialState;
}

const UserFails = [
  FakeState({
    userDetail: {}
  }),
  FakeState({
    userDetail: { username: true }
  }),
  FakeState({
    userDetail: { username: null }
  }),
  FakeState({
    userDetail: { username: undefined }
  }),
]

const ExpectOnFaild = new UserDetails;
ExpectOnFaild.username = 'SERVER ERROR';
ExpectOnFaild.firstName = 'SERVER ERROR';
ExpectOnFaild.lastName = 'SERVER ERROR';

const ExpectOnIntToString = new UserDetails;
ExpectOnIntToString.username = '12345';
ExpectOnIntToString.firstName = '12345';
ExpectOnIntToString.lastName = '12345 string';

describe('userDetailReducer', () => {

  describe('Sample Reducer and Selecters BOOLEAN states', () => {
    /**
    * IN case of loading, loaded, their values are boolean and doesnt have an effects from 'outside'
    */
    it('should create state | loading = true ', () => {
      let expectCurrentState = FakeState({ loading: true });
      expect(initialState).not.toEqual(expectCurrentState, "After the action LOADING_SAMPLE, the initialState must be not Equal to currentState");
      expect(expectCurrentState.loading).toBeTruthy('loading state must be true');
    });

    it('selector getUserDetailisLoading() | get true|false', () => {
      let expectCurrentStateLoading = FakeState({ loading: true });
      let userIsLoading = fromUserDetails.getUserDetailisLoading(expectCurrentStateLoading);
      expect(userIsLoading).toMatch(/true|false/, 'loading must return true|false');
    });

    it('should create state | loaded = true ', () => {
      let expectCurrentState = FakeState({ loaded: true });
      expect(initialState).not.toEqual(expectCurrentState, "After the action PUT_SAMPLE_LIST, the initialState must be not Equal to currentState");
      expect(expectCurrentState.loaded).toBeTruthy('loaded state must be true');
    });

    it('selector getUserDetailLoaded() | get true|false', () => {
      let expectCurrentStateLoaded = FakeState({ loaded: true });
      let userIsLoaded = fromUserDetails.getUserDetailLoaded(expectCurrentStateLoaded);
      expect(userIsLoaded).toMatch(/true|false/, 'loading must return true|false');
    });


  })

  describe('Sample Reducer and Selecters userDetail states', () => {

    UserFails.forEach(test => {
      /* in test case must return { username: 'SERVER ERROR', firstName: 'SERVER ERROR', lastName: 'SERVER ERROR' } 
      *  if any required field is missing or mal formated : username, firstName, lastname.
      */
      let expectCurrentState = fromUserDetails.reducer(initialState, { type: userDetailActions.ActionTypes.PUT_USER_DETAIL, payload: test.userDetail });
      
      it("should create state | when userDetail = " + JSON.stringify(test.userDetail) + " || must return a { username: 'SERVER ERROR', firstName: 'SERVER ERROR', lastName: 'SERVER ERROR' }", () => {
        expect(initialState).not.toEqual(expectCurrentState, "After the action PUT_USER_DETAIL, the initialState must be not Equal to currentState");
        expect(expectCurrentState.userDetail).toEqual(ExpectOnFaild, 'when missing or mal formated : username, firstName, lastname, must be return a error');
      });

      it('selector getUserName() | get type of ' + test, () => {
        let userName = fromUserDetails.getUserName(expectCurrentState);
        expect(userName).toEqual('SERVER ERROR', 'content must return type of "SERVER ERROR"');
      });
      it('selector getFirstName() | get type of ' + test, () => {
        let firstName = fromUserDetails.getFirstName(expectCurrentState);
        expect(firstName).toEqual('SERVER ERROR', 'content must return type of "SERVER ERROR"');
      });
      it('selector getLastName() | get type of ' + test, () => {
        let lastName = fromUserDetails.getLastName(expectCurrentState);
        expect(lastName).toEqual('SERVER ERROR', 'content must return type of "SERVER ERROR"');
      });
      it('selector getFullUserName() | get type of ' + test, () => {
        let fullName = fromUserDetails.getFullUserName(expectCurrentState);
        expect(fullName).toEqual('SERVER ERROR SERVER ERROR', 'content must return type of "SERVER ERROR SERVER ERROR"');
      });
    });

    let userData = { username: 12345, firstName: 12345, lastName: '12345 string' }
    let expectCurrentState = fromUserDetails.reducer(initialState, { type: userDetailActions.ActionTypes.PUT_USER_DETAIL, payload: userData });
    
    it("should create state | when userDetail =  userDetail: { username: 12345, firstName: 12345, lastName: '12345 string' }  || must return a { username: '12345', firstName: '12345', lastName: '12345 string' }", () => {
      expect(expectCurrentState.userDetail).toEqual(ExpectOnIntToString, 'when missing or mal formated : username, firstName, lastname, must be return a error');
    });

     it('selector getUserName() | get type of username: 12345', () => {
        let userName = fromUserDetails.getUserName(expectCurrentState);
        expect(userName).toEqual('12345', 'content must return type of "SERVER ERROR"');
      });
      it('selector getFirstName() | get type of firstName: 12345', () => {
        let firstName = fromUserDetails.getFirstName(expectCurrentState);
        expect(firstName).toEqual('12345', 'content must return type of "SERVER ERROR"');
      });
      it('selector getLastName() | get type of lastName: "12345 string"', () => {
        let lastName = fromUserDetails.getLastName(expectCurrentState);
        expect(lastName).toEqual('12345 string', 'content must return type of "SERVER ERROR"');
      });
      it('selector getFullUserName() | get type of firstName: 12345, lastName: "12345 string"', () => {
        let fullName = fromUserDetails.getFullUserName(expectCurrentState);
        expect(fullName).toEqual('12345 12345 string', 'content must return type of "SERVER ERROR SERVER ERROR"');
      });

  })
  /*
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
  */
});

