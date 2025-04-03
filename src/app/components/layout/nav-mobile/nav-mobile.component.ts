import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SidenavData } from '../sidenav/sidenav-data';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-nav-mobile',
  imports: [CommonModule, ButtonModule, DrawerModule, RouterModule, OverlayBadgeModule],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.css'
})
export class NavMobileComponent {
  isDrawerVisible: boolean = false;
  sidenavData = SidenavData;

  toggleDrawer() {
    this.isDrawerVisible = !this.isDrawerVisible;
  }

}
