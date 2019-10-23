import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { LoggerService } from './logger/logger.service';
import { RestResponse } from './../models/rest-response';
import { Response } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { Sample } from './../models/sample';
import { Injectable } from '@angular/core';
import { Info } from 'app/models/info';

import * as sampleState from 'app/store/states/sample.state';


const SampleResponseFake: RestResponse<Sample> = {
  error: null,
  paging: {
    totalItems: 20,
    totalPages: 2,
    pageSize: 10,
    currentPage: 1,
  },
  result: sampleState.SampleListFake,
  status: null
};
const FAKE_SERVICE = true;


@Injectable()
export class SampleService extends BaseService<Sample> {

  constructor(
    http: HttpClientService<Sample>,
    logger: LoggerService
  ) {
    super(http, logger);
    this.baseUrl = '/sugar-frontend-webapp/application';
  }


  /**
   * GET SAMPLE LIST
   *
   * @returns {Observable<RestResponse<Sample>>}
   *
   * @memberOf SampleService
   */
  getSampleList(): Observable<RestResponse<Sample>> {
    this.logger.debug('SampleService', 'getSampleList called');
    return !FAKE_SERVICE ? this.http.get(this.baseUrl + '/list')
      .pipe(
        map((resp: Response) => this.handleResponse(resp, false)),
        catchError(error => this.handleError(error)
        )
      ) : new Observable((subscribe) => subscribe.next(SampleResponseFake));
  }

   /**
   * GET SAMPLE BY ID
   *
   * @param {number} id
   * @returns {Observable<Array<Sample>>}
   *
   * @memberOf SampleService
   */
  getSampleByID(id: string): Observable<RestResponse<Sample>> | any {
    this.logger.debug('SampleService', 'getSampleByID called - id: ' + id);
    return !FAKE_SERVICE ? this.http.get(this.baseUrl + '/get/' + id)
      .pipe(
        map((resp: Response) => this.handleResponse(resp, true)),
        catchError(error => this.handleError(error))
      ) : new Observable((subscribe) => subscribe.next( [ SampleResponseFake.result[id] ] ));
  }

  getConfig(): Observable<Info> {
    this.logger.debug('SampleService', 'getConfig() called');
    return this.http.get(this.baseUrl + '/info')
      .pipe(
        map((resp: Response) => this.handleResponse(resp, false)),
        catchError(error => this.handleError(error))
      );
  }




}
