import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bnp-brand-bar',
  templateUrl: './bnp-brand-bar.component.html',
  styleUrls: ['./bnp-brand-bar.component.scss']
})
export class BnpBrandBarComponent {

  @Input() logoUrl;
}
