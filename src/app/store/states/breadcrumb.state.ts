import { Breadcrumb } from 'app/models/breadcrumb';


/**
 * Breadcrumb State
 *
 * @export
 * @class State
 */
export class State {
  currentBreadcrumb: Breadcrumb;
}

export const initialState: State = {
  currentBreadcrumb: null,
};
