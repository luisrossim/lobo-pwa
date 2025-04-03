import { Component, inject, OnInit } from '@angular/core';
import { BodyComponent } from './components/layout/body/body.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SidenavToggle } from './components/layout/sidenav/sidenav-model';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './utils/services/toast.service';
import { MessageService } from 'primeng/api';
import { NavMobileComponent } from './components/layout/nav-mobile/nav-mobile.component';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { UtilitiesService } from './utils/services/utilities.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BodyComponent, SidenavComponent, NavMobileComponent, LoadingComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  toastService = inject(ToastService);
  messageService = inject(MessageService);
  utilitiesService = inject(UtilitiesService)
  
  showLayout = true;
  screenWidth = window.innerWidth;
  isSideNavCollapsed: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = event.url !== '/login'; 
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
    this.utilitiesService.loading$.subscribe((value) => {
      this.isLoading = value;
    })
  }
}
