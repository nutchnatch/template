
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BaseService } from './services/base.service';
import { SampleService } from './services/sample.service';
import { HttpClientService } from './services/http-client.service';
import { AuthGuardService } from './services/auth-guard.services';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* STORE */
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { compose } from '@ngrx/core/compose';

import { combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { reducer } from './reducers';

/* Global services*/
import { LoggerService } from './services/logger/logger.service';
import { LOG_LOGGER_PROVIDERS } from './services/logger/log-providers';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TspUIModule } from './modules/tsp-ui/tsp-ui.module';
import { LoginModule } from './modules/login/login.module';
import { ContainersModule } from './modules/containers/containers.module';

import { AppComponent } from './app.component';



export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    // BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
    * Store devtools instrument the store retaining past versions of state
    * and recalculating new states. This enables powerful time-travel
    * debugging.
    *
    * To use the debugger, install the Redux Devtools extension for either
    * Chrome or Firefox
    *
    * See: https://github.com/zalmoxisus/redux-devtools-extension
    */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    FormsModule,
    HttpModule,
    TspUIModule,
    LoginModule,
    ContainersModule,
    AppRoutingModule
  ],
  providers: [
    HttpClientService,
    LOG_LOGGER_PROVIDERS,
    LoggerService,
    AuthGuardService,
    BaseService,
    SampleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
