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
import { HeaderComponent } from '../../layout/header/header.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-estoque',
  imports: [CommonModule, FormsModule, ButtonModule, TableModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, TooltipModule, HeaderComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly toastService = inject(ToastService);

  title: string = "Estoque Semanal"
  itens: Item[] = []
  products: any[] = []
  dataAtual: Date = new Date();

  constructor(private confirmService: ConfirmationService) {}  
  
  ngOnInit() {
    this.products = [
        {
          "code": "1",
          "nome": "Produto Exemplo fghf fghgfh fghghhfghfghf fawdawdawd awdawdawdaw wdghfhfghf 1",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "2",
          "nome": "Produto Exemplo 2",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "3",
          "nome": "Produto Exemplo 3",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "4",
          "nome": "Produto Exemplo 4",
          "quantity": [
            50, 1500, 52
          ],
          "novaContagem": null
        },
        {
          "code": "5",
          "nome": "Produto Exemplo 5",
          "category": "Esportes",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "6",
          "nome": "Produto Exemplo 6",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "7",
          "nome": "Produto Exemplo 7",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "8",
          "nome": "Produto Exemplo 8",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "9",
          "nome": "Produto Exemplo 9",
          "quantity": [
            50, 1500, 52
          ],
          "novaContagem": null
        },
        {
          "code": "10",
          "nome": "Produto Exemplo 10",
          "category": "Esportes",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "11",
          "nome": "Produto Exemplo 11",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "12",
          "nome": "Produto Exemplo 12",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "13",
          "nome": "Produto Exemplo 13",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "14",
          "nome": "Produto Exemplo 14",
          "quantity": [
            50, 1500, 52
          ],
          "novaContagem": null
        },
        {
          "code": "15",
          "nome": "Produto Exemplo 15",
          "category": "Esportes",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "16",
          "nome": "Produto Exemplo 16",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
        },
        {
          "code": "17",
          "nome": "Produto Exemplo 17",
          "quantity": [
            50, 15, 52
          ],
          "novaContagem": null
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

  confirm1(event: Event) {
    this.confirmService.confirm({
        target: event.target as EventTarget,
        message: 'Tem certeza que deseja salvar os itens?',
        header: 'Confirmação',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-circle',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Salvar',
            severity: 'primary',
        },
        accept: () => {
          this.enviarContagem();
        },
        reject: () => {},
    });
}

  enviarContagem() {
    const hoje = new Date();
    const dataHoje = hoje.toISOString().split('T')[0];
  
    const contagens = this.products
      .filter(p => p.novaContagem != null && p.novaContagem !== '')
      .map(p => ({
        code: p.code,
        quantidade: p.novaContagem,
        data: dataHoje
      }));
  
    console.log('Contagens preparadas para envio:', contagens);
  }
}
