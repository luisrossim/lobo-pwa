export interface ContagemEstoque {
    ID: number,
    COD_PRO: number,
    QUANTIDADE: number,
    DATA_CONTAGEM: string,
    NOME_PRO: string,
    ESTOQUE_MINIMO_PRO: number,
    UNIDADE_MEDIDA: string
}

export interface ContagemEstoqueAgrupado {
    itemId: number;
    descricao: string;
    estoqueMinimo: number;
    unidade: string;
    contagens: Record<string, { id: number; quantidade: number }>;
}

export interface NovaContagemEstoque {
    itemId: number
    quantidade: number
}
