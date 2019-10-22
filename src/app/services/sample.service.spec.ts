import { MockBackend, MockConnection } from '@angular/http/testing';
import { LOG_LOGGER_PROVIDERS } from './logger/log-providers';
import { LoggerService } from './logger/logger.service';
import { HttpClientService } from './http-client.service';
import { RestResponse } from './../models/rest-response';
import { Sample } from './../models/sample';
import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions, ResponseType } from '@angular/http';

import { SampleService } from './sample.service';

const createFakeData = () => {
  let data = new Sample();
  data.id = 1;
  data.identifier = 'fakeId';
  data.description = 'fakeDesc';
  return data;
}

const makeOKResponseData = () => new RestResponse<Sample>(
  null, null, 1, [createFakeData()]
) as RestResponse<Sample>;

const makeEmptyResponseData = () => new RestResponse<Sample>(
  null, null, 0, []
) as RestResponse<Sample>;


describe('SampleService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SampleService,
        HttpClientService,
        LoggerService,
        LOG_LOGGER_PROVIDERS,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  });

  it('can instantiate service when inject service', inject([SampleService], (service: SampleService) => {
    expect(service).toBeTruthy();
  }));

  it('can instantiate service with "new"', inject([HttpClientService, LoggerService],
    (http: HttpClientService, _logger: LoggerService) => {
      expect(http).not.toBeNull('http should be provided');
      expect(_logger).not.toBeNull('logger should be provided');
      let service = new SampleService(http, _logger);
      expect(service instanceof SampleService).toBe(true, 'new service should be ok');
    })
  );

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    })
  );

  describe('getSampleList method', () => {
    let backend: MockBackend;
    let service: SampleService;

    beforeEach(inject([HttpClientService, XHRBackend, LoggerService],
      (http: HttpClientService, be: MockBackend, _logger: LoggerService) => {
        backend = be;
        service = new SampleService(http, _logger);
      }));

     it('should be OK with the fake response', async(inject([], () => {
       let fakeResponse = makeOKResponseData();
       let options = new ResponseOptions({ status: 200, body: fakeResponse });
       let response = new Response(options);
       backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
 
       service.getSampleList().subscribe(
         returnedObject => {
           expect(returnedObject).not.toBeNull('returned object should not be null');
           expect(returnedObject.length).toEqual(fakeResponse.content.length, 'returned data length should match the mock data length');
           expect(returnedObject[0].id).toEqual(fakeResponse.content[0].id, 'returned ID should match the mock object ID');
           expect(returnedObject[0].description).toEqual(fakeResponse.content[0].description, 'returned data should match the mock object data');
         }, error => {
           fail('should not respond an error : ' + error);
         }
       );
     })));

    it('should treat empty response as an empty list', async(inject([], () => {
      let emptyResponse = makeEmptyResponseData();
      let options = new ResponseOptions({ status: 200, body: emptyResponse });
      let response = new Response(options);
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getSampleList().subscribe(returnedObject => {
        expect(returnedObject).not.toBeNull('returned object should not be null');
        expect(returnedObject.length).toEqual(0, 'returned data length should be 0');
      }, error => {
        fail('should not respond an error ');
      });
    })));

    it('should treat 404 as an Observable error ', async(inject([], () => {

      let options = new ResponseOptions({ status: 404, statusText: "Page not found", type: ResponseType.Error });
      let response = new Response(options);
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getSampleList().subscribe(returnedObject => {
        fail('should not respond with result');
      }, error => {
        expect(error.error.errorCode).toMatch(/404/, 'should catch 404 status code');
      })
    })));

    it('should treat 403 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 403, statusText: "Forbidden", type: ResponseType.Error }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSampleByID(1).subscribe(returnedObject => {
        fail('should not respond with result');
      }, error => {
        expect(error.error.errorCode).toMatch(/403/, 'should catch 401 status code');
      })
    })));

    it('should treat 401 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 401, statusText: "Not authorized", type: ResponseType.Error }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSampleList().subscribe(returnedObject => {
        fail('should not respond with result');
      }, error => {
        expect(error.error.errorCode).toMatch(/401/, 'should catch 401 status code');
      })
    })));

  });

  describe('getSampleByID method', () => {
    let backend: MockBackend;
    let service: SampleService;

    beforeEach(inject([HttpClientService, XHRBackend, LoggerService],
      (http: HttpClientService, be: MockBackend, _logger: LoggerService) => {
        backend = be;
        service = new SampleService(http, _logger);
      }));

    it('should be OK with the fake response', async(inject([], () => {
      let fakeResponse = makeOKResponseData();
      let options = new ResponseOptions({ status: 200, body: fakeResponse });
      let response = new Response(options);
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getSampleByID(1).subscribe(
        returnedObject => {
          expect(returnedObject).not.toBeNull('returned object should not be null');
          expect(returnedObject.length).toEqual(fakeResponse.content.length, 'returned data length should match the mock data length');
          expect(returnedObject[0].id).toEqual(fakeResponse.content[0].id, 'returned ID should match the mock object ID');
          expect(returnedObject[0].description).toEqual(fakeResponse.content[0].description, 'returned data should match the mock object data');
        }, error => {
          fail('should not respond an error : ' + error);
        }
      );
    })));

    it('should treat empty response as an Observable error', async(inject([], () => {
      let emptyResponse = makeEmptyResponseData();
      let options = new ResponseOptions({ status: 200, body: emptyResponse });
      let response = new Response(options);
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getSampleByID(1).subscribe(returnedObject => {
        fail('should respond an error');
      }, error => {
        expect(error).not.toBeNull('An error should be returned');
        /*
        expect(error.name).toEqual('TE002', 'should return error code TE002');
        expect(error.message).toEqual('get called but returned no result', 'should return error message');
        */
        expect(error.error.errorCode).toEqual('TE002', 'should return error code TE002');
        expect(error.error.errorMessage).toEqual('get called but returned no result', 'should return error message');
      });
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 404, statusText: "Page not found", type: ResponseType.Error }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSampleByID(1).subscribe(returnedObject => {
        fail('should not respond with result');
      }, error => {
        expect(error.error.errorCode).toMatch(/404/, 'should catch 404 status code');
      })
    })));

    it('should treat 403 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 403, statusText: "Forbidden", type: ResponseType.Error }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSampleByID(1).subscribe(returnedObject => {
        fail('should not respond with result');
      }, error => {
        expect(error.error.errorCode).toMatch(/403/, 'should catch 401 status code');
      })
    })));

    it('should treat 401 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 401, statusText: "Not authorized", type: ResponseType.Error }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSampleByID(1).subscribe(returnedObject => {
        fail('should not respond with result');
      }, error => {
        expect(error.error.errorCode).toMatch(/401/, 'should catch 401 status code');
      })
    })));
    
  });


});
