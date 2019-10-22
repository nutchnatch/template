/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [HttpClientService],
			imports: [ HttpModule ]
		});
	});

	it('should ...', inject([HttpClientService], (service: HttpClientService) => {
		expect(service).toBeTruthy();
	}));
});
