import { BehaviorSubject } from 'rxjs';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends CrudService<Item> {
  constructor() {
    super('/produtos');
  }

  private itensCountSubject = new BehaviorSubject<number>(0);
  public itensCount$ = this.itensCountSubject.asObservable();

  updateItensCount(count: number): void {
    this.itensCountSubject.next(count);
  }
}
