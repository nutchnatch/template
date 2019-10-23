import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoggerService } from './logger/logger.service';
import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';

import { RestResponse } from './../models/rest-response';
import { Error } from './../models/error';

@Injectable()
export class BaseService<T> {

  baseUrl = '/sugar-frontend-webapp/v1';  // URL to web user api
  headers: HttpHeaders;

  constructor(
    protected http: HttpClientService<T>,
    protected logger: LoggerService) { }

  public getHeaders(): HttpHeaders {
    this.headers = this.http.addDefaultHeaders();
    return this.headers;
  }

  /**
   * Handle the server call's
   *
   * @private
   * @param {Response} resp
   * @returns {*}
   *
   * @memberOf BaseService
   */
  protected handleResponse(resp: any, mandatoryContent?: boolean): RestResponse<T> {
    if (resp.status === 404 || resp.status === 401 || resp.status === 403) {
      throw Observable.throw(resp);
    }

    if (resp.status === 404) {
      throw Observable.throw(resp);
    }
    return resp;
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

  protected handleError(httpErrorResponse: Response | any ): Observable<any> | string {

    if (httpErrorResponse.status === 400) {
      // tslint:disable-next-line:max-line-length
      this.logger.error('BaseService', httpErrorResponse.error.error.message ? httpErrorResponse.error.error.message : httpErrorResponse.statusText ? httpErrorResponse.statusText : 'the call failed: Server error');

      const restError = new Error();
      restError.code = '' + httpErrorResponse.status;
      // tslint:disable-next-line:max-line-length
      restError.message = httpErrorResponse.error.error.message ? httpErrorResponse.error.error.message : httpErrorResponse.statusText ? httpErrorResponse.statusText : 'the call failed: Server error';

      return throwError(restError || 'Server error');

    }

    if (httpErrorResponse.status === 403 || httpErrorResponse.status === 401 || httpErrorResponse.status.toString() === '403') {
      this.logger.error('BaseService', 'the call failed: ', httpErrorResponse || 'Server error');
      const restError = new Error();
      restError.code = '' + httpErrorResponse.status;
      restError.message = httpErrorResponse.statusText;
      // restError.stack = error.json();
      return throwError(restError || 'Server error');

    }

    if (httpErrorResponse.status === 413) {
      this.logger.error('BaseService', 'the call failed: Payload to large');

      const restError = new Error();
      restError.code = '' + httpErrorResponse.status;
      // tslint:disable-next-line:max-line-length
      restError.message = 'the call failed: Payload to large'; // error.json().error.message ? error.json().error.message : error.statusText;

      return throwError(restError || 'Server error');

    } else {
      this.logger.error('BaseService', 'get called but returned no result ');
      return throwError(httpErrorResponse);
    }
  }
}
