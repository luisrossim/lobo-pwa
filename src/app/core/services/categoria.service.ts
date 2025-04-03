import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends CrudService<Categoria> {
  constructor() {
    super('/categoria');
  }
}
