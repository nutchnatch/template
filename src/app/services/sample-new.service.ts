import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoggerService } from './logger/logger.service';
import { Info } from 'app/models/info';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from 'app/services/base.service';
import { HttpClientService } from 'app/services/http-client.service';
import { RestResponse } from 'app/models/rest-response';

@Injectable()
export class SampleNewService extends BaseService<Info> {

  baseUrl: string;

  constructor(
    http: HttpClientService<Info>,
    public logger: LoggerService

  ) {
    super(http, logger);
    this.baseUrl = '/sugar-frontend-webapp/application';
  }


  getConfig(): Observable<RestResponse<Info>> {
    this.logger.debug('SampleNewService', 'getConfig() called');

    // const queryParams: URLSearchParams = new URLSearchParams();
    // Object.assign(queryParams, params);
    // console.log(queryParams.toString())
    return this.http.get(this.baseUrl + '/info')
      .pipe(
        map((resp: Response) => this.handleResponse(resp, false)),
        catchError(error => this.handleError(error))
      );

  }

}
