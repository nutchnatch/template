// export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLink]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {'(click)': 'onClick()'}
})
export class RouterLinkStubDirective {
    // tslint:disable-next-line:no-input-rename
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
    url: string;
    navigate(commands: any[], extras?: NavigationExtras) {
        if (commands && commands.length > 0) {
            const newUrl = commands[0];
            if (typeof (newUrl) === 'string') {
                this.url = newUrl;
            } else {
                console.log('not a string');
                console.log(newUrl);
            }
        }
    }
}


// Only implements params and part of snapshot.params
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams };
    }
}
