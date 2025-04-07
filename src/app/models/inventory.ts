export interface InventoryHistory {
    ID: number 
    ITEM_ID: number, 
    DESCRICAO: string
    ESTOQUE_MINIMO: number
    UN_MEDIDA: string
    QUANTIDADE: number
    CRIADO_EM: string 
}

export interface InventoryContagem {
    id: number;
    quantidade: number;
    criadoEm: string;
}

export interface HistoryItemAgrupado {
    itemId: number;
    descricao: string;
    estoqueMinimo: number;
    unidade: string;
    contagens: InventoryContagem[];
}

export interface CreateHistory {
    itemId: number
    quantidade: number
}