export const fotosLugares = {
    "ibira.jpg": require("../../assets/ibira.jpg"),
    "paulista.jpg": require("../../assets/paulista.jpg"),
    "masp.jpg": require("../../assets/masp.jpg"),
    "iguatemi.jpg": require("../../assets/iguatemi.jpg"),
    "povo.jpg": require("../../assets/povo.jpg"),
    "helipa.jpg": require("../../assets/helipa.jpg"),
    "santos.jpg": require("../../assets/santos.jpg"),
    "beco.jpg": require("../../assets/beco.jpg"),
    "cafe.jpg": require("../../assets/cafe.jpg"),
    "sol.jpg": require("../../assets/santos.jpg"),
    "cidade.jpg": require("../../assets/cidade.jpg"),
    "airbnb.jpg": require("../../assets/beco.jpg"),
};

export const getFotoLugar = (imagem) => {
    if (!imagem) return fotosLugares["ibira.jpg"];
    if (
        typeof imagem === "string" &&
        (imagem.startsWith("http://") ||
            imagem.startsWith("https://") ||
            imagem.startsWith("file://") ||
            imagem.startsWith("data:") ||
            imagem.startsWith("blob:"))
    ) {
        return { uri: imagem };
    }
    return fotosLugares[imagem] || fotosLugares["ibira.jpg"];
};

export const lugaresIniciais = [
    {
        id: 1,
        nome: "Parque Ibirapuera",
        categoria: "Natureza",
        localizacao: "São Paulo, SP  •  2,3 km",
        distancia: "2,3 km",
        cidade: "São Paulo, SP",
        endereco: "Av. Pedro Álvares Cabral, s/n - Vila Mariana",
        bairro: "Vila Mariana / Moema",
        cep: "04094-050",
        pontoReferencia: "Portão 3 / Obelisco do Ibirapuera",
        latitude: -23.587416,
        longitude: -46.657634,
        horario: "Aberto diariamente • 05:00 - 23:00",
        entrada: "Entrada gratuita",
        descricao: "Um dos lugares mais incríveis de São Paulo, perfeito para fotos, passeios e momentos de lazer.",
        imagem: "ibira.jpg"
    },
    {
        id: 2,
        nome: "Avenida Paulista",
        categoria: "Cidade",
        localizacao: "São Paulo, SP  •  4,1 km",
        distancia: "4,1 km",
        cidade: "São Paulo, SP",
        endereco: "Av. Paulista - Bela Vista / Cerqueira César",
        bairro: "Bela Vista / Cerqueira César",
        cep: "01311-200",
        pontoReferencia: "Próximo à estação Trianon-Masp",
        latitude: -23.561414,
        longitude: -46.655882,
        horario: "Aberta 24h • Domingos aberta para pedestres",
        entrada: "Acesso livre",
        descricao: "O coração cultural e financeiro de São Paulo, repleto de museus, cafeterias e arquitetura urbana.",
        imagem: "paulista.jpg"
    },
    {
        id: 3,
        nome: "MASP - Museu de Arte",
        categoria: "Viagens",
        localizacao: "São Paulo, SP  •  3,8 km",
        distancia: "3,8 km",
        cidade: "São Paulo, SP",
        endereco: "Av. Paulista, 1578 - Bela Vista",
        bairro: "Bela Vista",
        cep: "01310-200",
        pontoReferencia: "Vão Livre do MASP",
        latitude: -23.561448,
        longitude: -46.655872,
        horario: "Terça a Domingo • 10:00 - 18:00",
        entrada: "Ingressos na bilheteria / Terças grátis",
        descricao: "Museu de Arte de São Paulo com seu icônico vão livre e um dos acervos mais importantes da América Latina.",
        imagem: "masp.jpg"
    },
    {
        id: 4,
        nome: "Shopping Iguatemi",
        categoria: "Cidade",
        localizacao: "São Paulo, SP  •  5,6 km",
        distancia: "5,6 km",
        cidade: "São Paulo, SP",
        endereco: "Av. Brg. Faria Lima, 2232 - Jardim Paulistano",
        bairro: "Jardim Paulistano",
        cep: "01452-000",
        pontoReferencia: "Av. Brigadeiro Faria Lima",
        latitude: -23.576856,
        longitude: -46.687483,
        horario: "Segunda a Sábado • 10:00 - 22:00",
        entrada: "Acesso livre",
        descricao: "Referência em moda, gastronomia e experiências exclusivas na zona oeste da capital.",
        imagem: "iguatemi.jpg"
    },
    {
        id: 5,
        nome: "Parque do Povo",
        categoria: "Natureza",
        localizacao: "São Paulo, SP  •  6,2 km",
        distancia: "6,2 km",
        cidade: "São Paulo, SP",
        endereco: "Av. Henrique Chamma, 420 - Pinheiros",
        bairro: "Itaim Bibi / Pinheiros",
        cep: "04533-130",
        pontoReferencia: "Próximo à estação Cidade Jardim / JK Iguatemi",
        latitude: -23.588820,
        longitude: -46.690830,
        horario: "Aberto diariamente • 06:00 - 22:00",
        entrada: "Entrada gratuita",
        descricao: "Área verde moderna com pistas de caminhada, ciclovias e belos gramados para relaxar.",
        imagem: "povo.jpg"
    },
    {
        id: 6,
        nome: "Heliópolis Cultural",
        categoria: "Cidade",
        localizacao: "São Paulo, SP  •  7,5 km",
        distancia: "7,5 km",
        cidade: "São Paulo, SP",
        endereco: "Estrada das Lágrimas, 2385 - São João Clímaco",
        bairro: "Ipiranga / São João Clímaco",
        cep: "04232-000",
        pontoReferencia: "Complexo Cultural e Esportivo de Heliópolis",
        latitude: -23.618680,
        longitude: -46.591240,
        horario: "Segunda a Sábado • 09:00 - 20:00",
        entrada: "Acesso livre",
        descricao: "Centro vibrante de arte urbana, música e cultura com energia e histórias inspiradoras.",
        imagem: "helipa.jpg"
    },
    {
        id: 7,
        nome: "Praia de Santos (Orla)",
        categoria: "Praia",
        localizacao: "Santos, SP  •  72 km",
        distancia: "72 km",
        cidade: "Santos, SP",
        endereco: "Av. Vicente de Carvalho - Gonzaga",
        bairro: "Gonzaga",
        cep: "11055-300",
        pontoReferencia: "Praça das Bandeiras / Jardins da Orla",
        latitude: -23.970220,
        longitude: -46.333190,
        horario: "Acesso livre 24 horas",
        entrada: "Entrada gratuita",
        descricao: "Maior jardim de praia do mundo, com calçadão extenso, ciclovia e clima relaxante à beira-mar.",
        imagem: "santos.jpg"
    },
    {
        id: 8,
        nome: "Beco do Batman",
        categoria: "Viagens",
        localizacao: "São Paulo, SP  •  5,1 km",
        distancia: "5,1 km",
        cidade: "São Paulo, SP",
        endereco: "R. Medeiros de Albuquerque, 82-154 - Vila Madalena",
        bairro: "Vila Madalena",
        cep: "05436-060",
        pontoReferencia: "Entre as ruas Gonçalo Afonso e Medeiros de Albuquerque",
        latitude: -23.557430,
        longitude: -46.686940,
        horario: "Aberto diariamente • Recomendado de dia",
        entrada: "Entrada gratuita",
        descricao: "Famosa galeria de arte urbana a céu aberto na Vila Madalena, perfeita para fotos e passeios culturais.",
        imagem: "beco.jpg"
    }
];
