import { SampleService } from './../app/services/sample.service';
import { RestError } from './../app/models/rest-error';
import { Sample } from './../app/models/sample';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Injectable } from '@angular/core';

const createFakeSampleData = (id: number) => {
  let data = new Sample();
  data.id = id;
  data.description = 'fakeDesc';
  data.identifier = 'fakeIndentifier'
  return data;
}

export const createFakeSampleDataList1 = () => {
  let data = new Array();
  data[0] = createFakeSampleData(0);
  return data;
}


export const createFakeSampleDataList2 = () => {
  let data = new Array();
  data[0] = createFakeSampleData(0);
  data[1] = createFakeSampleData(1);
  return data;
}

export const createFakeSampleDataError = () => {
  const error = new RestError();
  error.errorCode = "error";
  error.errorMessage = "Unknown Error";
  return error;
}

export const createFakeSampleDataError400 = () => {
  const error = new RestError();
  error.errorCode = "400";
  error.errorMessage = "Bad Request";
  return error;
}
export const createFakeSampleDataError401 = () => {
  const error = new RestError();
  error.errorCode = "401";
  error.errorMessage = "Unauthorized";
  return error;
}
export const createFakeSampleDataError403 = () => {
  const error = new RestError();
  error.errorCode = "403";
  error.errorMessage = "Forbidden errors";
  return error;
}
export const createFakeSampleDataError404 = () => {
  const error = new RestError();
  error.errorCode = "404";
  error.errorMessage = "Page not found";
  return error;
}

export const SuccessMode = "success";
export const ErrorMode = "error";
export const Mode400 = "400";
export const Mode401 = "401";
export const Mode403 = "403";
export const Mode404 = "404";

export let sampleServiceStubMode: string;

export const getSampleServiceStubErrorMode = () => {
  return sampleServiceStubMode;
}

export const setSampleServiceStubErrorMode = (mode) => {
  sampleServiceStubMode = mode;
}

@Injectable()
export class SampleServiceStub {

  constructor() {
    sampleServiceStubMode = SuccessMode;
  }

  getSampleList(): Observable<Sample[]> {

    if (sampleServiceStubMode === SuccessMode) {
      const observable = new Observable<Sample[]>(
        (subscriber: Subscriber<Sample[]>) => {
          try {
            subscriber.next(createFakeSampleDataList2());
            subscriber.complete();
          } catch (error) {
            subscriber.error(error);
          }
        }
      );
      return observable;

    } else if (sampleServiceStubMode === ErrorMode) {
      const error = createFakeSampleDataError();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode400) {
      const error = createFakeSampleDataError400();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode401) {
      const error = createFakeSampleDataError401();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode403) {
      const error = createFakeSampleDataError403();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode404) {
      const error = createFakeSampleDataError404();
      return Observable.throw(error);
    }
  }

  getSampleByID(id: number): Observable<Sample[]> {
    if (sampleServiceStubMode === SuccessMode) {
      const observable = new Observable<Sample[]>(
        (subscriber: Subscriber<Sample[]>) => {
          try {
            subscriber.next(createFakeSampleDataList1());
            subscriber.complete();
          } catch (error) {
            subscriber.error(error);
          }
        }
      );
      return observable;

    } else if (sampleServiceStubMode === ErrorMode) {
      const error = createFakeSampleDataError();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode400) {
      const error = createFakeSampleDataError400();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode401) {
      const error = createFakeSampleDataError401();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode403) {
      const error = createFakeSampleDataError403();
      return Observable.throw(error);
    } else if (sampleServiceStubMode === Mode404) {
      const error = createFakeSampleDataError404();
      return Observable.throw(error);
    }
  }
}

