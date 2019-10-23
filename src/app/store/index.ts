import { createSelector } from 'reselect';
import {
  ActionReducer,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
/*import * as fromRouter from '@ngrx/router-store';*/
import { environment } from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * localStorageSync is another useful library that takes part/all store sync with localstorage
 * Simple syncing between ngrx store and local storage.
 *
 * More: https://github.com/btroncone/ngrx-store-localstorage
 */
import { localStorageSync } from 'ngrx-store-localstorage';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from './reducers/layout.reducer';
import * as fromAppConfig from './reducers/app-config.reducer';
import * as fromClientSettings from './reducers/client-settings.reducer';
import * as fromLanguage from './reducers/language.reducer';
import * as fromBreadcrumb from './reducers/breadcrumb.reducer';
import * as fromUserDetail from './reducers/user-detail.reducer';
import * as fromSample from './reducers/sample.reducer';
import * as fromHttpError from './reducers/http-error.reducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export class State {
  errors: fromHttpError.State;
  config: fromAppConfig.State;
  clientSettings: fromClientSettings.State;
  layout: fromLayout.State;
  breadcrumb: fromBreadcrumb.State;
  language: fromLanguage.State;
  user: fromUserDetail.State;
  sample: fromSample.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers = {
  errors: fromHttpError.reducer,
  config: fromAppConfig.reducer,
  clientSettings: fromClientSettings.reducer,
  layout: fromLayout.reducer,
  breadcrumb: fromBreadcrumb.reducer,
  language: fromLanguage.reducer,
  user: fromUserDetail.reducer,
  sample: fromSample.reducer
};

/**
 * List of part of store to be sync in localstorage. Each key represent a reducer in store.
 * ex: 'language' is the key of language: fromLanguage.State
 */
const syncStoreLocalStorage: Array<string> = [
  'language',
  'layout',
  'clientSettings',
];


// const localStorage = localStorageSync( { keys: syncStoreLocalStorage , rehydrate: true } );
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: syncStoreLocalStorage,  rehydrate: true})(reducer);
}
export const metaReducers: MetaReducer<State>[]  = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];



/**
 * SELECTOR HELP ON THE BOTTOM OF DOCUMENT
 */

/**
 * HTTP ERRORS Reducers
 */
export const getStateErrors = createFeatureSelector<fromHttpError.State>('errors');
export const getHttpError: any = createSelector(getStateErrors, fromHttpError.getHttpError);


/**
 * AppConfig  Reducers and Client Settings
 */
export const getConfig = createFeatureSelector<fromAppConfig.State>('config');
export const getClientSettings = (state: State) => state.clientSettings;

export const getAppConfigLocaleList: any = createSelector(getConfig, fromAppConfig.getAppConfigLocaleList );
export const getAppConfigDashboard: any = createSelector(getConfig, fromAppConfig.getAppConfigDashboard );


/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
// get show side menu state from a store <boolean>
export const getShowSidenav: any = createSelector(getLayoutState, fromLayout.getShowSidenav);
export const getLayoutUrl: any = createSelector(getLayoutState, fromLayout.getLayoutUrl);

/**
 * Breadcrumb Reducers
 */
export const getBreadcrumbState = createFeatureSelector<fromBreadcrumb.State>('breadcrumb');
export const getCurrentBreadcrumb: any = createSelector(getBreadcrumbState, fromBreadcrumb.getCurrentBreadcrumb);

/**
 * Language Reducers
 */
export const getLanguageState = createFeatureSelector<fromLanguage.State>('language');
export const getCurrentLanguage: any = createSelector(getLanguageState, fromLanguage.getCurrentLanguage);


/**
 * User Reducers
 */
export const getUserDetailsState = createFeatureSelector<fromUserDetail.State>('user');
export const getUserDetailsLoaded: any = createSelector(getUserDetailsState, fromUserDetail.getUserDetailLoaded);
export const getUserDetailsIsLoading: any = createSelector(getUserDetailsState, fromUserDetail.getUserDetailisLoading);
export const getUserName: any = createSelector(getUserDetailsState, fromUserDetail.getUserName);
export const getFullUserName: any = createSelector(getUserDetailsState, fromUserDetail.getFullUserName);
export const getUserAuthorities: any = createSelector(getUserDetailsState, fromUserDetail.getAuthorities);
export const getError: any = createSelector(getUserDetailsState, fromUserDetail.getError);


/**
 * Sample Reducers
 */
export const getSampleState = createFeatureSelector<fromSample.State>('sample');
export const getSampleList: any = createSelector(getSampleState, fromSample.getSampleList);
export const getSampleSelected: any = createSelector(getSampleState, fromSample.getSampleSelected);
export const getSampleIsLoading: any = createSelector(getSampleState, fromSample.getSampleListLoading);
export const getSampleIsLoaded: any = createSelector(getSampleState, fromSample.getSampleListLoaded);
export const getSampleError: any = createSelector(getSampleState, fromSample.getSampleHttpError);
export const getSampleSelectedIsLoading: any = createSelector(getSampleState, fromSample.getSampleSelectedLoading);
export const getSampleSelectedIsLoaded: any = createSelector(getSampleState, fromSample.getSampleSelectedLoaded);
export const getSampleSelectedError: any = createSelector(getSampleState, fromSample.getSampleSelectedHttpError);


/**
 * AUX DOCUMENTACTION / HELPER / EXPLANATION ON SELECTORS
 */
/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.languageState$ = state$.select(getLanguageState);
 * 	}
 * }
 * ```
 * export const getLanguageState = (state: State) => state.language;
 */

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 *
 * export const getCurrentLanguage:any = createSelector(getLanguageState, fromLanguage.getCurrentLanguage);
 *
 */
