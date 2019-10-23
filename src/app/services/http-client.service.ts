import { RestResponse } from 'app/models/rest-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpClientService<T> {

    /**
     * Creates an instance of HttpClientService.
     * @param {Http} http
     *
     * @memberOf HttpClientService
     */
    constructor(
        public http: HttpClient

    ) { }


    /**
     * Perfoms AddDefault Http Header method
     *
     * @param {Headers} headers
     *
     * @memberOf HttpClientService
     */
    addDefaultHeaders(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
            'X-CARDIF-CONSUMER': 'SUGAR',
            'X-CARDIF-REQUEST-ID': 'SUGAR-123-456',
            'X-CARDIF-EXT-REQ-ID': 'SUGAR-000-123-456',
            'Content-Type': 'application/json'
        });

        //  headers.set('Content-Type', 'application/json');

        return headers;
    }


    /**
     * Performs Update Options Headers method
     *
     * @param {RequestOptionsArgs} [options]
     * @returns {RequestOptionsArgs}
     *
     * @memberOf HttpClientService
     */
    updateOptions(options?: any): any {

        if (options && !options.headers) {
            options.headers = this.addDefaultHeaders();
        }

        if (!options) {
            options = Object.assign({}, { headers: this.addDefaultHeaders() });
        }
        return options;
    }

    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    // request(url: string , options?: RequestOptionsArgs): Observable<Response> {
    //     const newOptions = this.updateOptions(options);
    //     return this.http.request('GET', url, newOptions);
    // }

    /**
     * Performs a request with `get` http method.
     */
    // get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    //     const newOptions = this.updateOptions(options);
    //     return this.http.get(url, newOptions);
    // }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.get<RestResponse<T>>(url, newOptions);
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: any): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.post<RestResponse<T>>(url, body, newOptions);
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.put<RestResponse<T>>(url, body, newOptions);
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.patch<RestResponse<T>>(url, body, newOptions);
    }

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.head<RestResponse<T>>(url, newOptions);
    }

    /**
     * Performs a request with `options` http method.
     */
    options(url: string, options?: RequestOptionsArgs): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.options<RestResponse<T>>(url, newOptions);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        const newOptions = this.updateOptions(options);
        return this.http.delete<RestResponse<T>>(url, newOptions);
    }

}
