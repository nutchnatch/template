
/**
 * Layout State
 *
 * @export
 * @class State
 */
export class State {
  showSidenav: boolean;
  url: string;
}

export const initialState: State = {
  showSidenav: true,
  url: '/'
};
