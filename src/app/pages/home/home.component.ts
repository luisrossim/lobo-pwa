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


@Component({
  selector: 'app-home',
  imports: [ChartModule, MeterGroupModule, ButtonModule, TableModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, DatePickerModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title: string = "Dashboard"
  platformId = inject(PLATFORM_ID);
  data1: any;
  data2: any;
  data3: any;
  options1: any;
  options2: any;
  options3: any;
  value: any[] = []
  products: any[] = []

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
    this.value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];

    this.products = [
        {
            "code": "P12345",
            "name": "Produto Exemplo 1",
            "category": "Eletrônicos",
            "quantity": 50
          },
          {
            "code": "P12346",
            "name": "Produto Exemplo 2",
            "category": "Livros",
            "quantity": 10
          },
          {
            "code": "P12347",
            "name": "Produto Exemplo 3",
            "category": "Móveis",
            "quantity": 5
          },
          {
            "code": "P12348",
            "name": "Produto Exemplo 4",
            "category": "Vestuário",
            "quantity": 100
          },
          {
            "code": "P12349",
            "name": "Produto Exemplo 5",
            "category": "Esportes",
            "quantity": 25
          },
          {
            "code": "P12350",
            "name": "Produto Exemplo 6",
            "category": "Brinquedos",
            "quantity": 40
          },
          {
            "code": "P12351",
            "name": "Produto Exemplo 7",
            "category": "Ferramentas",
            "quantity": 15
          }
      ]
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.data1 = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Teste',
                    data: [540, 325, 702, 620],
                    backgroundColor: ['#47556999'],
                    borderColor: ['#475569'],
                    borderWidth: 1,
                },
            ],
        };

        this.options2 = {
            aspectRatio: 1.2,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.data3 = {
            labels: ['01/Jan', '08/Jan', '15/Jan', '22/Jan', '29/Jan'],
            datasets: [
                {
                    label: 'Linha',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    backgroundColor: 'rgb(59,130,246,0.3)',
                    borderColor: 'rgb(59,130,246,1)',
                    tension: 0
                }
            ]
        };

        this.options3 = {
            maintainAspectRatio: false,
            aspectRatio: 1.1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.cd.markForCheck()
    }
  }
}
