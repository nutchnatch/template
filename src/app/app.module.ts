import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SampleEffects } from 'app/store/effects/sample.effect';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment'; //
import { BaseService } from './services/base.service';

// import { SampleService } from './services/sample.service';
import { HttpClientService } from './services/http-client.service';
import { AuthGuardService } from './services/auth-guard.services';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* STORE */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { reducers, metaReducers} from 'app/store';

/* Global services*/
import { LoggerService } from './services/logger/logger.service';
import { LOG_LOGGER_PROVIDERS } from './services/logger/log-providers';

import {
  TranslateModule,
  TranslateLoader} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from './modules/core/core.module';
import { CommonUiModule } from './modules/common-ui/common-ui.module';
import { LoginModule } from './modules/login/login.module';
import { ContainersModule } from './modules/containers/containers.module';

import { AppComponent } from './app.component';
import { SampleService } from 'app/services/sample.service';
import { SampleNewService } from './services/sample-new.service';
import { RouterLinkStubDirective, RouterOutletStubComponent } from 'testing/router.stub';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { HttpRedirectInterceptor } from './services/http-redirect-interceptor';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    EffectsModule.forRoot([
     SampleEffects
    ]),
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),


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
    StoreDevtoolsModule.instrument({
      name: 'Project Template - Angular 6 ',
      logOnly: environment.production,
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      enableHtml: true,
      easeTime: 150
    }),

    FormsModule,
    HttpClientModule,
    CommonUiModule,
    CoreModule,
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
    SampleService,
    SampleNewService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRedirectInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
