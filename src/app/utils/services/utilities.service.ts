import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  setLoading(value: boolean): void {
    this.loadingSubject.next(value);
  }

  limparEspacosVariavel(variavel: string): string {
    return variavel.replace(/\s{2,}/g, ' ').trim();
  }

  limparEspacosObjeto(objeto: any) {
    for (const key in objeto) {
      if (typeof objeto[key] == 'string') {
        objeto[key] = this.limparEspacosVariavel(objeto[key] + '');
      }
    }
    return objeto;
  }
}
