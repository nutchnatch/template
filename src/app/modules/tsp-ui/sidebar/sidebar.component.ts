import { Component, Input } from '@angular/core';
import { TranslateService }	from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {
  @Input() open = false;
}
