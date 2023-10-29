export interface Congressmen {
    id: number;
    uri: string;
    nome: string;
    siglaPartido: string;
    uriPartido: string;
    siglaUf: string;
    idLegislatura: number;
    urlFoto: string;
    email: string;
}

export interface CongressmenResponse {
    dados: Congressmen[];
}

export interface Congressman {
    id: number;
    uri: string;
    nomeCivil: string;
    ultimoStatus: {
        id: number;
        uri: string;
        nome: string;
        siglaPartido: string;
        uriPartido: string;
        siglaUf: string;
        idLegislatura: number;
        urlFoto: string;
        email: string;
        data: string;
        nomeEleitoral: string;
        gabinete: {
            nome: string;
            predio: string;
            sala: string;
            andar: string;
            telefone: string;
            email: string;
        };
        situacao: string;
        condicaoEleitoral: string;
        descricaoStatus: string | null;
    };
    cpf: string;
    sexo: string;
    urlWebsite: string | null;
    redeSocial: string[];
    dataNascimento: string;
    dataFalecimento: string | null;
    ufNascimento: string;
    municipioNascimento: string;
    escolaridade: string;
}

export interface CongressmanResponse {
    dados: Congressman;
}
