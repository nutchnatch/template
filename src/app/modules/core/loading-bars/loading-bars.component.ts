import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bars',
  templateUrl: './loading-bars.component.html',
  styleUrls: ['./loading-bars.component.scss']
})
export class LoadingBarsComponent {
  @Input() relative = false;
}

