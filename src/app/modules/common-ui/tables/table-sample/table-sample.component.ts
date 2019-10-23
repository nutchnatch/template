import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sample } from 'app/models/sample';
import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as sampleAction from 'app/store/actions/sample.actions';

@Component({
  selector: 'app-table-sample',
  templateUrl: './table-sample.component.html',
  styleUrls: ['./table-sample.component.scss']
})
export class TableSampleComponent implements OnInit {
  private samplesList$: Observable<Sample>;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router

  ) {
    this.samplesList$ = store.pipe(select(fromStore.getSampleList));
  }

  preview(id) {
    this.router.navigate(['/app/dashboard', id]);
  }

  ngOnInit() {
    this.store.dispatch(new sampleAction.GetSamplesAction({ fake: true }));
  }
}
