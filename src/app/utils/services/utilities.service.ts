import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { ContagemEstoqueAgrupado, ContagemEstoque } from '../../models/inventory';

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

  getUniqueDatesFromArray(list: ContagemEstoque[]): string[] {
    return Array.from(
        new Set(list.map(item => item.DATA_CONTAGEM))
    );
  }

  hasTodayRecord(datas: string[]): boolean {
    const hoje = format(new Date(), 'yyyy-MM-dd');
    return datas.some(data => format(new Date(data), 'yyyy-MM-dd') === hoje);
  }

  groupByItemAndDate(registros: ContagemEstoque[]): ContagemEstoqueAgrupado[] {
    return registros.reduce((acc: ContagemEstoqueAgrupado[], _atual) => {
      const atual: ContagemEstoque = _atual;
  
      let existente = acc.find(item => item.itemId === atual.COD_PRO);

      if (!existente) {
        existente = {
          itemId: atual.COD_PRO,
          descricao: atual.NOME_PRO,
          estoqueMinimo: atual.ESTOQUE_MINIMO_PRO,
          unidade: atual.UNIDADE_MEDIDA,
          contagens: {}
        };
        acc.push(existente);
      }
  
      existente.contagens[atual.DATA_CONTAGEM] = {
        id: atual.ID,
        quantidade: atual.QUANTIDADE
      };
  
      return acc;
    }, []);
  }
}
