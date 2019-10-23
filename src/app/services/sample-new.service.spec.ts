/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SampleNewService } from './sample-new.service';

describe('Service: SampleNew', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleNewService]
    });
  });

  it('should ...', inject([SampleNewService], (service: SampleNewService) => {
    expect(service).toBeTruthy();
  }));
});
