import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { ItemService } from '../../core/services/item.service';
import { ToastService } from '../../utils/services/toast.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-estoque',
  imports: [CommonModule, ButtonModule, HeaderComponent, TableModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, TooltipModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {
  title: string = "Estoque"

  private readonly itemService = inject(ItemService);
  private readonly toastService = inject(ToastService);

  itens: Item[] = []


  constructor() {}
  
  
  ngOnInit(): void {
    this.fetchItens();
  }


  private fetchItens(){
    this.itemService.getAll().subscribe({
      next: (itens) => (
        this.itens = itens || []
      ),
      error: (error) => { 
        this.toastService.error("Erro ao buscar estoque!");
      }
    });
  }
}
