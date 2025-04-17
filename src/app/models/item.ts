export interface Item {
    COD_PRO: number
    NOME_PRO: string
    ESTOQUE_MINIMO_PRO: number
    UNIDADE_MEDIDA: string
}
  
export interface ItemNovaContagem extends Item {
    NOVA_CONTAGEM: number | null;
}
