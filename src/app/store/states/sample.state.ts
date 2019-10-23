import { RestResponse } from './../../models/rest-response';
import { RestError } from 'app/models/rest-error';
import { Sample } from 'app/models/sample';

/**
 * User State
 *
 * @export
 * @class State
 */
export class State extends RestResponse<Sample> {
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

  error: null,
  result: null,
  status: null,
  paging: null,

  loading: false,
  loaded: false,
  loadingSelected: false,
  loadedSeleted: false,
  content: [],
  httpError: new RestError,
  selected: [],
  httpErrorSelected: new RestError
};



export const SampleListFake: Array<Sample> = [
  {
    id: 0,
    identifier: 'Sample 0',
    description: 'This is Sample 0 Description',
  },
  {
    id: 1,
    identifier: 'Sample 1',
    description: 'This is Sample 1 Description',
  },
  {
    id: 2,
    identifier: 'Sample 2',
    description: 'This is Sample 2 Description',
  },
  {
    id: 3,
    identifier: 'Sample 3',
    description: 'This is Sample 3 Description',
  },
  {
    id: 4,
    identifier: 'Sample 4',
    description: 'This is Sample 4 Description',
  },
  {
    id: 5,
    identifier: 'Sample 5',
    description: 'This is Sample 5 Description',
  },
  {
    id: 6,
    identifier: 'Sample 6',
    description: 'This is Sample 6 Description',
  },
  {
    id: 7,
    identifier: 'Sample 7',
    description: 'This is Sample 7 Description',
  },
  {
    id: 8,
    identifier: 'Sample 8',
    description: 'This is Sample 8 Description',
  },
  {
    id: 9,
    identifier: 'Sample 9',
    description: 'This is Sample 9 Description',
  },
  {
    id: 10,
    identifier: 'Sample 10',
    description: 'This is Sample 10 Description',
  },
  {
    id: 11,
    identifier: 'Sample 11',
    description: 'This is Sample 11 Description',
  },
  {
    id: 12,
    identifier: 'Sample 12',
    description: 'This is Sample 12 Description',
  },
  {
    id: 13,
    identifier: 'Sample 13',
    description: 'This is Sample 13 Description',
  }
];
