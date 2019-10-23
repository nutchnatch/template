import { HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger/logger.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClientService } from './http-client.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Credentials } from '../models/credentials';
import { UserDetails } from '../models/user-details';

@Injectable()
export class AuthenticationService {

  public userUrl = '/sugar-frontend-webapp/v1/resources/user'; // URL to web user api
  public logoutUrl = '/sugar-frontend-webapp/v1/resources/logout';

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClientService} http
   * @param {LoggerService} logger
   *
   * @memberOf AuthenticationService
   */
  constructor(
    public http: HttpClientService<any>,
    public logger: LoggerService
  ) { }

  /**
   * Performs the Authentication
   *
   * @param {Credentials} [credentials]
   * @returns {Observable<UserDetails>}
   *
   * @memberOf AuthenticationService
   */
  authenticate(credentials?: Credentials, scope?: string): Observable<UserDetails> {
    let httpOptions;
    if (credentials) {
      const authorizationValue: string = 'Basic ' + btoa(credentials.username + '|' + scope + ':' + credentials.password);
      httpOptions = {
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': authorizationValue
        })
      };
    }
    return this.http.get(this.userUrl,  httpOptions )
      .pipe(
        map((res: any) => res),
        catchError((error: Response) => this.handleError(error))
      );
  }

  /**
   * Performs Logout
   *
   * @returns {Observable<boolean>}
   *
   * @memberOf AuthenticationService
   */
  logout(): Observable<boolean | any> {
    this.logger.debug('AuthenticationService', 'logout called');
    return this.http.post(this.logoutUrl, {})
      .pipe(
        map(() => { of(true); }),
        catchError(error => this.handleError(error))
      );
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
  public handleError(error: Response): Observable<Object> | string {
    this.logger.error('AuthenticationService', 'the call failed:', error || 'Server error');
    return throwError(error || 'Server error');
  }
}
