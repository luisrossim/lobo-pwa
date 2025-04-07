import { BehaviorSubject } from 'rxjs';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { ItemProps } from '../../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends CrudService<ItemProps> {
  constructor() {
    super('/v1/item');
  }

  private itensCountSubject = new BehaviorSubject<number>(0);
  public itensCount$ = this.itensCountSubject.asObservable();

  updateItensCount(count: number): void {
    this.itensCountSubject.next(count);
  }
}
