import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerService } from '../../utils/services/drawer.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private drawerService = inject(DrawerService);
  @Input() title: string = ""

  openDrawer() {
    this.drawerService.openDrawer();
  }

}
