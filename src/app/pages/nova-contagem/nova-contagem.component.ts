import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { ItemService } from '../../core/services/item.service';
import { ToastService } from '../../utils/services/toast.service';
import { ItemPropsContagem } from '../../models/item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { InventoryService } from '../../core/services/inventory.service';

@Component({
  selector: 'app-nova-contagem',
  imports: [CommonModule, HeaderComponent, FormsModule, InputText, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './nova-contagem.component.html'
})
export class NovaContagemComponent implements OnInit {
  private itensService = inject(ItemService);
  private inventoryService = inject(InventoryService);
  private toastService = inject(ToastService);
  private localStorageService = inject(LocalStorageService);

  router = inject(Router);
  title = "Nova contagem"
  itens: ItemPropsContagem[] = [] 


  constructor(private confirmationService: ConfirmationService){}


  ngOnInit(): void {
    let itensLocalStorage = this.localStorageService.getItem<typeof this.itens>('itens');

    if(itensLocalStorage && itensLocalStorage.length > 0) {
      this.itens = itensLocalStorage
    } else {
      this.fetchItens();
    }
  }


  private fetchItens(){
    this.itensService.getAll().subscribe({
      next: (result) => {
        this.itens = result.map(item => ({
          ...item,
          NOVA_CONTAGEM: null
        }));
      },
      error: (err) => {
        this.toastService.error("Erro ao buscar itens.")
      }
    })
  }


  confirmFinalizar(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente finalizar a contagem? Essa ação é definitiva e impedirá futuras alterações.',
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
          label: 'Finalizar e salvar',
          severity: 'success',
      },
      accept: () => {
        this.finalizar();
      },
      reject: () => {},
    });
  }


  salvarTemporariamente(){
    this.localStorageService.setItem('itens', this.itens);
    this.toastService.success("Itens salvos temporariamente com sucesso.")
  }


  finalizar(){
    const resource = this.handleItensToDTO();

    this.inventoryService.createHistorico(resource).subscribe({
      next: () => {
        this.toastService.success("Contagem salva e finalizada com sucesso!");
        this.localStorageService.removeItem('itens');

        setTimeout(() => {
          this.router.navigateByUrl('/estoque');
        }, 500);
      },
      error: (err) => {
        this.toastService.error("Erro ao finalizar contagem de itens.")
      }
    })
  }


  confirmResetItens(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente recarregar a contagem? Essa ação irá limpar todos os campos.',
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
          label: 'Recarregar',
          severity: 'danger',
      },
      accept: () => {
        this.resetItens();
      },
      reject: () => {},
    });
  }


  resetItens(){
    this.localStorageService.removeItem('itens');
    this.fetchItens();
  }


  handleItensToDTO(){
    return this.itens
      .filter(item => (item.NOVA_CONTAGEM != null))
      .map((item) => ({
        itemId: item.ID,
        quantidade: item.NOVA_CONTAGEM || 0
      }))
  }
}
