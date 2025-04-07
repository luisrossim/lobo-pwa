export interface ItemProps {
    ID: number;
    DESCRICAO: string;
    ESTOQUE_MINIMO: number;
    UN_MEDIDA: string;
    FLAG_CONTROLE: string;
}
  
export interface ItemPropsContagem extends ItemProps {
    NOVA_CONTAGEM: number | null;
}
