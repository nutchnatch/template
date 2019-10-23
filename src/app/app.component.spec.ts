import { State } from 'app/store';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { LOG_LOGGER_PROVIDERS } from './services/logger/log-providers';
import { LoggerService } from './services/logger/logger.service';
import { HttpClientService } from './services/http-client.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import * as fromStore from 'app/store';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StoreModule.provideStore(fromStore.reducers, fromStore.State),
        HttpModule,
        TranslateModule.forRoot()
      ],
      providers: [
        HttpClientService,
        LoggerService,
        LOG_LOGGER_PROVIDERS
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const mainDiv = compiled.querySelector('div');
    const attribute0 = mainDiv.attributes[0];
    const attribute1 = mainDiv.attributes[1];
    const attribute2 = mainDiv.attributes[2];
    expect(attribute1.name).toEqual('class', 'first div attribute should be class');
    expect(attribute1.value).toEqual('', 'first div class should be empty');
    expect(attribute2.name).toEqual('id', 'first div attribute should be id');
    expect(attribute2.value).toEqual('main', 'first div id should be main');
  }));
});
