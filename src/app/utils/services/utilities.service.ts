import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { HistoryItemAgrupado, InventoryHistory } from '../../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
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

  getUniqueDatesFromArray(list: InventoryHistory[]): string[] {
    return Array.from(
        new Set(list.map(item => item.CRIADO_EM))
    );
  }

  hasTodayRecord(datas: string[]): boolean {
    const hoje = format(new Date(), 'yyyy-MM-dd');
    return datas.some(data => format(new Date(data), 'yyyy-MM-dd') === hoje);
  }

  groupByItemAndDate(registros: InventoryHistory[]): HistoryItemAgrupado[] {
    return registros.reduce((acc: HistoryItemAgrupado[], _atual) => {
      const atual: InventoryHistory = _atual;
  
      let existente = acc.find(item => item.itemId === atual.ITEM_ID);

      if (!existente) {
        existente = {
          itemId: atual.ITEM_ID,
          descricao: atual.DESCRICAO,
          estoqueMinimo: atual.ESTOQUE_MINIMO,
          unidade: atual.UN_MEDIDA,
          contagens: {}
        };
        acc.push(existente);
      }
  
      existente.contagens[atual.CRIADO_EM] = {
        id: atual.ID,
        quantidade: atual.QUANTIDADE
      };
  
      return acc;
    }, []);
  }
}
