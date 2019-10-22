import { StoreModule } from '@ngrx/store';
import { RouterStub } from './../../../testing/router.stub';
import { Router } from '@angular/router';
import { LoggerService } from './../../services/logger/logger.service';
import { HttpModule } from '@angular/http';
import { HttpClientService } from './../../services/http-client.service';
import { AuthenticationService } from './../../services/authentication.service';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutUiComponent } from './logout-ui.component';
import * as fromRoot from '../../reducers';

describe('LogoutUiComponent', () => {
  let component: LogoutUiComponent;
  let fixture: ComponentFixture<LogoutUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutUiComponent ],
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        TranslateModule.forRoot(),
        HttpModule
      ],
      providers: [
        AuthenticationService,
        HttpClientService,
        LoggerService,
        { provide: Router, useClass: RouterStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
