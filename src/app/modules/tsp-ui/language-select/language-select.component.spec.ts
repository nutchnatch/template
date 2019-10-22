import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectComponent } from './language-select.component';
import * as fromRoot from '../../reducers';

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSelectComponent ],
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
