import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  @Input() sidebarOpened: Boolean = false;
  @Input() sidebarPined: Boolean = false;
}
