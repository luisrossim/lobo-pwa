import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { ToastService } from '../../utils/services/toast.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { FormsModule } from '@angular/forms';
import { HistoryItemAgrupado, InventoryHistory } from '../../models/inventory';
import { InventoryService } from '../../core/services/inventory.service';
import { InputText } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../utils/services/utilities.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-estoque',
  imports: [CommonModule, FormsModule, ButtonModule, TableModule, InputText, BadgeModule, IconFieldModule, InputIconModule, TooltipModule, HeaderComponent],
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly toastService = inject(ToastService);
  private readonly utilitiesService = inject(UtilitiesService)
  router = inject(Router);  

  title: string = "Estoque Semanal"
  inventoryHistoryGroup: HistoryItemAgrupado[] = []
  dataAgrupadas: string[] = []
  finishedToday: boolean = false

  
  constructor() {}  
  

  ngOnInit() {
    this.loadInventoryHistory();
    this.listenToTodayCountIsCompleted();
  }


  private loadInventoryHistory(){
    this.inventoryService.fetchHistoryAndCheckToday().subscribe({
      next: (result) => (
        this.handleInventoryHistoryInterface(result)
      ),
      error: (error) => { 
        this.toastService.error("Erro ao buscar histórico do inventário!")
      }
    });
  }


  private listenToTodayCountIsCompleted(){
    this.inventoryService.countIsCompleted$
      .subscribe(result => {
        this.finishedToday = result;
      });
  }


  handleInventoryHistoryInterface(registros: InventoryHistory[]){
    this.dataAgrupadas = this.utilitiesService.getUniqueDatesFromArray(registros);
    this.inventoryHistoryGroup = this.utilitiesService.groupByItemAndDate(registros);   
  }


  protected handleEstoqueMinimoText(estoqueMinimo: number, unidade: string){
    return `${estoqueMinimo} ${unidade}`
  }


  navigateToNovaContagem(){
    this.router.navigateByUrl('estoque/contagem')
  }
}
