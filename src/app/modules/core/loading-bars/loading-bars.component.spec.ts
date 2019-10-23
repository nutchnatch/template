import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarsComponent } from './loading-bars.component';

describe('LoadingBarsComponent', () => {
  let component: LoadingBarsComponent;
  let fixture: ComponentFixture<LoadingBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
