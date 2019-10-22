import { Injectable } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClientService {

    /**
     * Creates an instance of HttpClientService.
     * @param {Http} http
     *
     * @memberOf HttpClientService
     */
    constructor(private http: Http) { }


    /**
     * Perfoms AddDefault Http Header method
     *
     * @param {Headers} headers
     *
     * @memberOf HttpClientService
     */
    addDefaultHeaders(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        headers.append('X-Requested-With', 'XMLHttpRequest');
    }


    /**
     * Performs Update Options Headers method
     *
     * @param {RequestOptionsArgs} [options]
     * @returns {RequestOptionsArgs}
     *
     * @memberOf HttpClientService
     */
    updateOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        let newHeaders: Headers;
        if (options) {
            newHeaders = options.headers;
        } else {
            options = {};
            newHeaders = new Headers();
        }
        this.addDefaultHeaders(newHeaders);
        options.headers = newHeaders;
        return options;
    }

    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.request(url, options);
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.get(url, newOptions);
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.post(url, body, newOptions);
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.put(url, body, newOptions);
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.patch(url, body, newOptions);
    }

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.head(url, newOptions);
    }

    /**
     * Performs a request with `options` http method.
     */
    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.options(url, newOptions);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const newOptions = this.updateOptions(options);
        return this.http.delete(url, newOptions);
    }

}
