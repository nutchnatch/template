import { RestResponse } from './../../models/rest-response';
import { HttpError } from 'app/models/http-error';

import { UserDetails } from 'app/models/user-details';

/**
 * User State
 *
 * @export
 * @class State
 */
export class State extends RestResponse<UserDetails>  {
  loaded: boolean;
  loading: boolean;
  httpError: HttpError;
  userDetail: UserDetails;
}


export const initialState: State = {
  error: null,
  result: null,
  status: null,
  paging: null,
  loaded: false,
  loading: false,
  httpError: new HttpError,
  userDetail: new UserDetails
};
