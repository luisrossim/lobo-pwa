import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MeterGroupModule } from 'primeng/metergroup';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { isPlatformBrowser } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { HeaderComponent } from '../../layout/header/header.component';
import { options } from '../../utils/styles/chartStyles';


@Component({
  selector: 'app-home',
  imports: [ChartModule, MeterGroupModule, ButtonModule, TableModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, DatePickerModule, HeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title: string = "Dashboard"
  platformId = inject(PLATFORM_ID);
  data: any;
  options: any = options;
  value: any[] = []

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
    this.value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
        this.data = {
            labels: ['01/Jan', '08/Jan', '15/Jan', '22/Jan', '29/Jan'],
            datasets: [
                {
                    label: 'Placa de alumínio',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    backgroundColor: 'rgb(59,130,246,0.3)',
                    borderColor: 'rgb(59,130,246,1)',
                    tension: 0
                },
                {
                    label: 'Estoque mínimo',
                    data: [50, 50, 50, 50, 50, 50, 50],
                    borderColor: 'rgb(204, 66, 36)',
                    tension: 0
                }
            ]
        };
        this.cd.markForCheck()
    }
  }
}
