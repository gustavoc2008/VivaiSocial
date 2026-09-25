let localizacaoParaCriar = null;
let listeners = [];

export const setLocalizacaoParaPublicacao = (loc) => {
    localizacaoParaCriar = loc;
    listeners.forEach((listener) => {
        try {
            listener(loc);
        } catch (e) {
            console.log("Erro no listener de localização:", e);
        }
    });
};

export const getLocalizacaoParaPublicacao = () => localizacaoParaCriar;

export const limparLocalizacaoParaPublicacao = () => {
    localizacaoParaCriar = null;
    listeners.forEach((listener) => {
        try {
            listener(null);
        } catch (e) {
            console.log("Erro no listener de localização:", e);
        }
    });
};

export const subscribeLocalizacao = (listener) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
};
