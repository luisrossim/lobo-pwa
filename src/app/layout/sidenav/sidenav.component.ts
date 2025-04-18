import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavData } from './sidenav-data';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SidenavToggle } from './sidenav-model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  imports: [CommonModule, RouterModule, TooltipModule, ButtonModule]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  sidenavData = SidenavData;

  constructor() {}

  @HostListener('window:resize')
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1280){
      this.collapsed = false;
      this.onToggleSidenav.emit({ screenWidth: this.screenWidth, collapsed: this.collapsed })
    }
  }
  
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({ screenWidth: this.screenWidth, collapsed: this.collapsed })
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({ screenWidth: this.screenWidth, collapsed: this.collapsed })
  }
}
