import { LoggerService } from './logger/logger.service';
import { HttpClientService } from './http-client.service';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import * as fromRoot from '../reducers';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        HttpModule
      ],
      providers: [
        AuthenticationService,
        HttpClientService,
        LoggerService,
      ]
    });
  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
