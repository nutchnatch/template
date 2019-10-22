import { Subscriber } from 'rxjs/Subscriber';
import { getSampleList } from './../reducers/index';
import { SampleEffect } from './sample.effect';
import { SampleServiceStub } from './../../testing/sample.service.stub';
import { RestError } from './../models/rest-error';
import { SampleService } from './../services/sample.service';
import { LoggerService } from './../services/logger/logger.service';
import { HttpClientService } from './../services/http-client.service';
import { HttpModule } from '@angular/http';
import { StoreModule, Store } from '@ngrx/store';
import { async, TestBed, inject } from '@angular/core/testing';
import { LOG_LOGGER_PROVIDERS } from './../services/logger/log-providers';

import * as fromRoot from '../reducers';
import * as sampleAction from '../actions/sample.actions';
import * as httpErrorAction from '../actions/http-error.actions';
import * as sampleStub from './../../testing/sample.service.stub';

describe('SampleEffects', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State)
      ],
      providers: [
        LoggerService,
        SampleEffect,
        { provide: SampleService, useClass: SampleServiceStub }
      ]
    }).compileComponents();
  });

  it('can instantiate sample effect by inject service', inject([SampleEffect], (serviceEffect: SampleEffect) => {
    expect(serviceEffect).toBeTruthy();
  }));

  it('can instantiate service with "new"', inject([SampleService, Store, LoggerService],
    (sampleService: SampleService, store: Store<fromRoot.State>, logger: LoggerService) => {
      expect(sampleService).not.toBeNull('http should be provided');
      expect(store).not.toBeNull('store should be provided');
      expect(logger).not.toBeNull('logger should be provided');

      const serviceEffect = new SampleEffect(sampleService, store, logger);
      expect(serviceEffect instanceof SampleEffect).toBe(true, 'new service should be ok');
    })
  );

  describe('getSampleList()', () => {

    let serviceEffect: SampleEffect;
    let storeData: Store<fromRoot.State>;
    let sampleServiceMock: SampleService;

    beforeEach(
      inject([SampleService, Store, LoggerService],
        (sampleService: SampleService, store: Store<fromRoot.State>, logger: LoggerService) => {
          serviceEffect = new SampleEffect(sampleService, store, logger);
          storeData = store;
          sampleServiceMock = sampleService;
        }));

    it('method call | success', inject([], () => {
      let sampleData;
      storeData.select('sample').subscribe((data) => { sampleData = data; });
      // test data before
      expect(sampleData.content).toEqual([], 'Initail "content" state must be [] | before call');
      // call service
      serviceEffect.getSampleList();
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(sampleData.content).toEqual(sampleStub.createFakeSampleDataList2(), 'State After Call "content" must be equal to createFakeSampleDataList2()');
    }));

    it('method call | unknown error', inject([], () => {
      // unknown error or error === 400
      let sampleData;
      storeData.select('sample').subscribe((data) => { sampleData = data; });
      // test data before
      expect(sampleData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.ErrorMode);
      serviceEffect.getSampleList();
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(sampleData.httpError).toEqual(sampleStub.createFakeSampleDataError(), 'State After Call "httpError" must be equal to createFakeSampleDataError()');

    }));

    it('method call | 400', inject([], () => {
      // unknown error or error === 400
      let sampleData;
      storeData.select('sample').subscribe((data) => { sampleData = data; });
      // test data before
      expect(sampleData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode400);
      serviceEffect.getSampleList();
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(sampleData.httpError).toEqual(sampleStub.createFakeSampleDataError400(), 'State After Call "httpError" must be equal to createFakeSampleDataError400()');
    }));

    it('method call | 401', inject([], () => {
      // unknown error 401 is httpError (global error on store), need to select('errors')
      let errorGlobalData;
      storeData.select('errors').subscribe((data) => { errorGlobalData = data; });
      // test data before
      expect(errorGlobalData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode401);
      serviceEffect.getSampleList();
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(errorGlobalData.httpError).toEqual(sampleStub.createFakeSampleDataError401(), 'State After Call "httpError" must be equal to createFakeSampleDataError401()');
    }));

    it('method call | 403', inject([], () => {
      // unknown error 403 is httpError (global error on store), need to select('errors')
      let errorGlobalData;
      storeData.select('errors').subscribe((data) => { errorGlobalData = data; });
      // test data before
      expect(errorGlobalData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode403);
      serviceEffect.getSampleList();
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(errorGlobalData.httpError).toEqual(sampleStub.createFakeSampleDataError403(), 'State After Call "httpError" must be equal to createFakeSampleDataError403()');
    }));

    it('method call | 404', inject([], () => {
      // unknown error 403 is httpError (global error on store), need to select('errors')
      let errorGlobalData;
      storeData.select('errors').subscribe((data) => { errorGlobalData = data; });
      // test data before
      expect(errorGlobalData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode404);
      serviceEffect.getSampleList();
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(errorGlobalData.httpError).toEqual(sampleStub.createFakeSampleDataError404(), 'State After Call "httpError" must be equal to createFakeSampleDataError404()');
    }));
  });

   describe('getSampleByID()', () => {
    let serviceEffect: SampleEffect;
    let storeData: Store<fromRoot.State>;
    let sampleServiceMock: SampleService;

    beforeEach(
      inject([SampleService, Store, LoggerService],
        (sampleService: SampleService, store: Store<fromRoot.State>, logger: LoggerService) => {
          serviceEffect = new SampleEffect(sampleService, store, logger);
          storeData = store;
          sampleServiceMock = sampleService;
        }));

    it('method call | success', inject([], () => {
      let sampleData;
      storeData.select('sample').subscribe( (data) => { sampleData = data; } );
      // test data before call
      expect(sampleData.selected).toEqual([], 'Initail state must be [] | before call');
      serviceEffect.getSampleByID(1);
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(sampleData.selected).toEqual( sampleStub.createFakeSampleDataList1(),  'State After Call "selected" must be equal to createFakeSampleDataList1()' );
    }));

    it('method call | unknown error', inject([], () => {
      // unknown error or error === 400 on httpErrorSelected
      let sampleData;
      storeData.select('sample').subscribe((data) => { sampleData = data; });
      // test data before
      expect(sampleData.httpErrorSelected).toBeDefined('Initail "httpErrorSelected" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.ErrorMode);
      serviceEffect.getSampleByID(1);
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(sampleData.httpErrorSelected).toEqual(sampleStub.createFakeSampleDataError(), 'State After Call "httpErrorSelected" must be equal to createFakeSampleDataError400()');
    }));

    it('method call | 400', inject([], () => {
      // unknown error or error === 400 on httpErrorSelected
      let sampleData;
      storeData.select('sample').subscribe((data) => { sampleData = data; });
      // test data before
      expect(sampleData.httpErrorSelected).toBeDefined('Initail "httpErrorSelected" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode400);
      serviceEffect.getSampleByID(1);
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(sampleData.httpErrorSelected).toEqual(sampleStub.createFakeSampleDataError400(), 'State After Call "httpErrorSelected" must be equal to createFakeSampleDataError400()');
    }));

    it('method call | 401', inject([], () => {
      // unknown error 401 is httpError (global error on store), need to select('errors')
      let errorGlobalData;
      storeData.select('errors').subscribe((data) => { errorGlobalData = data; });
      // test data before
      expect(errorGlobalData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode401);
      serviceEffect.getSampleByID(1);
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(errorGlobalData.httpError).toEqual(sampleStub.createFakeSampleDataError401(), 'State After Call "httpError" must be equal to createFakeSampleDataError401()');
    }));

    it('method call | 403', inject([], () => {
      // unknown error 403 is httpError (global error on store), need to select('errors')
      let errorGlobalData;
      storeData.select('errors').subscribe((data) => { errorGlobalData = data; });
      // test data before
      expect(errorGlobalData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode403);
      serviceEffect.getSampleByID(1);
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(errorGlobalData.httpError).toEqual(sampleStub.createFakeSampleDataError403(), 'State After Call "httpError" must be equal to createFakeSampleDataError403()');
    }));

    it('method call | 404', inject([], () => {
      // unknown error 403 is httpError (global error on store), need to select('errors')
      let errorGlobalData;
      storeData.select('errors').subscribe((data) => { errorGlobalData = data; });
      // test data before
      expect(errorGlobalData.httpError).toBeDefined('Initail "httpError" state must be {} | before call');
      // call service
      sampleStub.setSampleServiceStubErrorMode(sampleStub.Mode404);
      serviceEffect.getSampleByID(1);
      // test data after
      // tslint:disable-next-line:max-line-length
      expect(errorGlobalData.httpError).toEqual(sampleStub.createFakeSampleDataError404(), 'State After Call "httpError" must be equal to createFakeSampleDataError404()');
    }));

   });
});
