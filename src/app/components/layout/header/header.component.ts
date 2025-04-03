import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, OverlayBadgeModule, BadgeModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 @Input() title: string = ""
}
