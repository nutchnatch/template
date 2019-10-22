import { BaseService } from './base.service';
import { LoggerService } from './logger/logger.service';
import { HttpError } from './../models/http-error';
import { RestError } from './../models/rest-error';
import { RestResponse } from './../models/rest-response';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from './http-client.service';
import { Sample } from './../models/sample';
import { Injectable } from '@angular/core';

@Injectable()
export class SampleService extends BaseService<Sample> {

  private baseUrl = '/yourapplication-frontend-webapp/v1/samples/json';  // URL to web user api

  constructor(
    http: HttpClientService,
    logger: LoggerService
  ) {
    super(http, logger);
  }


  /**
   * GET SAMPLE LIST
   *
   * @returns {Observable<Sample[]>}
   *
   * @memberOf SampleService
   */
  getSampleList(): Observable<Sample[]> {
    this.logger.debug('SampleService', 'getSampleList called');
    return this.http.get(this.baseUrl + '/list')
      .map((resp: Response) => this.handleResponse(resp, false))
      .catch(error => this.handleError(error));
  }


  /**
   * GET SAMPLE BY ID
   *
   * @param {number} id
   * @returns {Observable<Sample[]>}
   *
   * @memberOf SampleService
   */
  getSampleByID(id: number): Observable<Sample[]> {
    this.logger.debug('SampleService', 'getSampleByID called - id: ' + id);
    return this.http.get(this.baseUrl + '/get/' + id)
      .map((resp: Response) => this.handleResponse(resp, true))
      .catch(error => this.handleError(error));
  }

}
