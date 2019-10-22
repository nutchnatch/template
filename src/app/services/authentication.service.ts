import { LoggerService } from './logger/logger.service';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

import 'rxjs/add/observable/throw';

import { Credentials } from '../models/credentials';
import { UserDetails } from '../models/user-details';

@Injectable()
export class AuthenticationService {

  private userUrl = '/yourapplication-frontend-webapp/user';  // URL to web user api
  private logoutUrl = '/yourapplication-frontend-webapp/logout';

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClientService} http
   * @param {LoggerService} logger
   *
   * @memberOf AuthenticationService
   */
  constructor(
    private http: HttpClientService,
    private logger: LoggerService
  ) { }

  /**
   * Performs the Authentication
   *
   * @param {Credentials} [credentials]
   * @returns {Observable<UserDetails>}
   *
   * @memberOf AuthenticationService
   */
  authenticate(credentials?: Credentials): Observable<UserDetails> {
    const headers = new Headers();
    if (credentials) {
      const authorizationValue: string = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
      headers.append('authorization', authorizationValue);
    }
    return this.http.get(this.userUrl, { headers: headers })
      .map((res: Response) => res.json())
      .catch( error => this.handleError(error) );
  }

  /**
   * Performs Logout
   *
   * @returns {Observable<boolean>}
   *
   * @memberOf AuthenticationService
   */
  logout(): Observable<boolean> {
    this.logger.debug('AuthenticationService', 'logout called');
    // TODO: change the GET to POST
    return this.http.get(this.logoutUrl)
      .map((res: Response) => { Observable.of(true); })
      .catch( error => this.handleError(error));

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
  private handleError(error: Response): Observable<Object> | string {
    this.logger.error('AuthenticationService', 'the call failed:', error || 'Server error');
    return Observable.throw(error || 'Server error');
  }
}
