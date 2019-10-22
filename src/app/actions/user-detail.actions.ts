import { HttpError } from './../models/http-error';
import { Action } from '@ngrx/store';
import { type } from '../util';

import { UserDetails } from '../models/user-details';

export const ActionTypes = {
  LOADING_USER_DETAIL: type('[User Detail] loading user detail'),
  PUT_HTTP_ERROR: type('[User Detail] put http error'),
  PUT_USER_DETAIL: type('[User Detail] put user detail'),
  DELETE_USER_DETAIL: type('[User Detail] delete user detail'),
};


export class PutUserDetail implements Action {
  type = ActionTypes.PUT_USER_DETAIL;

  /**
   * payload<UserDetails> .
   * @param {UserDetails} payload .
   */
  constructor(public payload: UserDetails) { }

}

export class PutHttpError implements Action {
  type = ActionTypes.PUT_HTTP_ERROR;

  /**
   * payload<HttpError> .
   * @param {HttpError} payload .
   */
  constructor(public payload: HttpError) { }

}

export class DeleteUserDetails implements Action {
  type = ActionTypes.DELETE_USER_DETAIL;


  /**
   * Creates an instance of DeleteUserDetails.
   *
   * @memberOf DeleteUserDetails
   */
  constructor(public payload?) { }

}


export class LoadingUserDetail implements Action {
  type = ActionTypes.LOADING_USER_DETAIL;

  /**
   * Creates an instance of LoadingUserDetail.
   * @param {any} [payload]
   *
   * @memberOf LoadingUserDetail
   */
  constructor(public payload?) { }
}

export type Actions
  = LoadingUserDetail
  | PutHttpError
  | PutUserDetail
  | DeleteUserDetails;
