import { BehaviorSubject, map, Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { Item, ItemNovaContagem } from '../../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends CrudService<Item> {
  constructor() {
    super('/item');
  }

  private itensCountSubject = new BehaviorSubject<number>(0);
  public itensCount$ = this.itensCountSubject.asObservable();

  updateItensCount(count: number): void {
    this.itensCountSubject.next(count);
  }

  getAllWithNovaContagem(): Observable<ItemNovaContagem[]> {
    return this.getAll().pipe(
      map(itens => itens.map(item => ({
        ...item,
        NOVA_CONTAGEM: null
      })))
    )
  }
}
