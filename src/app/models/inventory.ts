export interface InventoryHistory {
    ID: number 
    ITEM_ID: number, 
    DESCRICAO: string
    ESTOQUE_MINIMO: number
    UN_MEDIDA: string
    QUANTIDADE: number
    CRIADO_EM: string 
}

export interface HistoryItemAgrupado {
    itemId: number;
    descricao: string;
    estoqueMinimo: number;
    unidade: string;
    contagens: Record<string, { id: number; quantidade: number }>;
  }

export interface CreateHistory {
    itemId: number
    quantidade: number
}