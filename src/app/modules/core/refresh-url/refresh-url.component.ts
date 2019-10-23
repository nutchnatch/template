import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresh-url',
  templateUrl: './refresh-url.component.html'
})
export class RefreshUrlComponent implements OnInit {

  routerState;
  routerSnapshot;
  subscribeActiveRoute: Subscription;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.routerState = router.routerState;
    this.routerSnapshot = this.routerState.snapshot;
   }

  ngOnInit() {
    this.subscribeActiveRoute = this.activatedRouter.paramMap.subscribe((paramsMap: ParamMap | any) => {
      this.router.navigateByUrl(paramsMap.get('url'));
    });
  }

}
