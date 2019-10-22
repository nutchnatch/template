import { Observable } from 'rxjs/Observable';
import { LoggerService } from './logger/logger.service';
import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { RestResponse } from './../models/rest-response';
import { RestError } from './../models/rest-error';

@Injectable()
export class BaseService<T> {

  constructor(
    protected http: HttpClientService,
    protected logger: LoggerService) { }


  /**
   * Handle the server call's
   *
   * @private
   * @param {Response} resp
   * @returns {*}
   *
   * @memberOf BaseService
   */
  protected handleResponse(resp: Response, mandatoryContent: boolean): Array<T> {
    if (resp.status === 404 || resp.status === 401 || resp.status === 403) {
      const error = new RestError();
      error.errorCode = resp.status;
      error.errorMessage = resp.statusText;
      throw Observable.throw(error);
    }

    const restResp: RestResponse<T> = resp.json();

    if (restResp.errorCode) {
      const error = new RestError();
      error.errorCode = restResp.errorCode;
      error.errorMessage = restResp.errorMessage;
      throw Observable.throw(error);
    }
    // test content is not empty only if the mandatoryContent variable is set
    if (mandatoryContent === true) {
      if (restResp.content.length === 0) {
        const error = new RestError();
        error.errorCode = 'TE002';
        error.errorMessage = 'get called but returned no result';
        throw Observable.throw(error);
      }
    }
    return restResp.content;
  }

  /**
  * Handle the server call's errors
  *
  * @private
  * @param {Response} error
  * @returns {(Observable<Object>|string)}
  *
  * @memberOf AuthenticationService
  */

  protected handleError(error: Response | RestError): Observable<Object> | string {
    if (error instanceof Response) {
      this.logger.error('BaseService', 'the call failed: ', error.json() || 'Server error');
      return Observable.throw(error.json() || 'Server error');
    } else {
      this.logger.error('BaseService', 'get called but returned no result ');
      return Observable.throw(error);
    }
  }
}
