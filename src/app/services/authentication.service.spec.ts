import { LoggerService } from './logger/logger.service';
import { HttpClientService } from './http-client.service';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import * as fromStore from 'app/store';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(fromStore.reducers, fromStore.State),
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
