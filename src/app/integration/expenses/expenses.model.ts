
export interface Expense {
    ano: number;
    mes: number;
    tipoDespesa: string;
    codDocumento: number;
    tipoDocumento: string;
    codTipoDocumento: number;
    dataDocumento: string;
    numDocumento: string;
    valorDocumento: number;
    urlDocumento: string;
    nomeFornecedor: string;
    cnpjCpfFornecedor: string;
    valorLiquido: number;
    valorGlosa: number;
    numRessarcimento: string;
    codLote: number;
    parcela: number;
}

export interface ExpenseResponse {
    dados: Expense[];
    links: Link[];
}

export interface Link {
    rel: string;
    href: string;
}

export interface Option {
    value: string;
    description: string;
}