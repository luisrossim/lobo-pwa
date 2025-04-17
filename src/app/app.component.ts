import { Component, inject, OnInit } from '@angular/core';
import { BodyComponent } from './layout/body/body.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SidenavToggle } from './layout/sidenav/sidenav-model';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './utils/services/toast.service';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from './layout/loading/loading.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavMobileComponent } from './layout/nav-mobile/nav-mobile.component';
import { LoadingService } from './utils/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, BodyComponent, SidenavComponent, LoadingComponent, ToastModule, NavMobileComponent],
  providers: [MessageService],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private toastService = inject(ToastService);
  private messageService = inject(MessageService);
  private loadingService = inject(LoadingService);
  
  showLayout = true;
  screenWidth = window.innerWidth;
  isSideNavCollapsed: boolean = false;
  isLoading: boolean = false;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.showLayout = !(url.includes('login') || url.includes('404'));
      }
    });
  }
  
  
  ngOnInit(): void {
    this.listenToastService();
    this.listenLoadingService();
  }


  onToggleSidenav(data: SidenavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


  private listenToastService() {
    this.toastService.send$.subscribe({
      next: newMessage => {
        if(newMessage && newMessage.summary !== this.toastService.INIT_STATE) {
          this.messageService.add(newMessage);
        }
      }
    })
  }


  private listenLoadingService() {
    this.loadingService.loading$.subscribe((value) => {
      this.isLoading = value;
    })
  }
}
