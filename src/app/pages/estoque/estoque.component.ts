import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ItemService } from '../../core/services/item.service';
import { ToastService } from '../../utils/services/toast.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-estoque',
  imports: [CommonModule, ButtonModule, TableModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, TooltipModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly toastService = inject(ToastService);

  itens: Item[] = []
  products: any[] = []

  constructor() {}  
  
  ngOnInit() {
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
