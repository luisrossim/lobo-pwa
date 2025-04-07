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
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estoque',
  imports: [CommonModule, FormsModule, ButtonModule, TableModule, InputText, BadgeModule, IconFieldModule, InputIconModule, TooltipModule, HeaderComponent],
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly toastService = inject(ToastService);
  router = inject(Router);  

  title: string = "Estoque Semanal"
  inventoryHistoryGroup: any[] = []
  _inventoryHistoryGroup: HistoryItemAgrupado[] = []
  dataAgrupadas: string[] = []
  finishedToday: boolean = false

  
  constructor() {}  
  

  ngOnInit() {
    this.fetchInventoryHistory();
  }


  private fetchInventoryHistory(){
    this.inventoryService.getAll().subscribe({
      next: (result) => (
        this.handleInventoryHistoryInterface(result)
      ),
      error: (error) => { 
        this.toastService.error("Erro ao buscar histórico do inventário!")
      }
    });
  }


  handleInventoryHistoryInterface(registros: InventoryHistory[]){
    this._inventoryHistoryGroup = this.agruparEstoquePorItem(registros);
    this.agruparRegistrosPorData();
  }


  agruparEstoquePorItem(registros: any[]): HistoryItemAgrupado[] {
    return registros.reduce((acc: HistoryItemAgrupado[], _atual) => {
      const atual: InventoryHistory = _atual;
  
      let existente = acc.find(item => item.itemId === atual.ITEM_ID);
      if (!existente) {
        existente = {
          itemId: atual.ITEM_ID,
          descricao: atual.DESCRICAO,
          estoqueMinimo: atual.ESTOQUE_MINIMO,
          unidade: atual.UN_MEDIDA,
          contagens: []
        };
        acc.push(existente);
      }
  
      existente.contagens.push({
        id: atual.ID,
        quantidade: atual.QUANTIDADE,
        criadoEm: atual.CRIADO_EM
      });
  
      return acc;
    }, []);
  }


  agruparRegistrosPorData(){
    this.dataAgrupadas = Array.from(
      new Set(
        this._inventoryHistoryGroup.flatMap(item =>
          item.contagens.map(c => c.criadoEm)
        )
      )
    ).sort(); 

    this.inventoryHistoryGroup = this._inventoryHistoryGroup.map(item => {
      const contagensPorData: Record<string, { id?: number; quantidade?: number }> = {};
    
      this.dataAgrupadas.forEach(data => {
        const contagem = item.contagens.find(c => c.criadoEm === data);
        contagensPorData[data] = contagem
          ? { id: contagem.id, quantidade: contagem.quantidade }
          : {};
      });
    
      return {
        itemId: item.itemId,
        descricao: item.descricao,
        estoqueMinimo: item.estoqueMinimo,
        unidade: item.unidade,
        contagensPorData
      };
    });

    this.hasDataHoje();
  }


  protected handleEstoqueMinimoText(estoqueMinimo: number, unidade: string){
    return `${estoqueMinimo} ${unidade}`
  }


  hasDataHoje(): void {
    const hoje = format(new Date(), 'yyyy-MM-dd');
    this.finishedToday = this.dataAgrupadas.some(data => format(new Date(data), 'yyyy-MM-dd') === hoje);
  }

  navigateToNovaContagem(){
    this.router.navigateByUrl('estoque/contagem')
  }
}
