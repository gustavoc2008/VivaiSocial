import { Linking, Platform } from "react-native";

/**
 * Abre a localização no aplicativo nativo de mapas (Google Maps no Android/Web, Apple Maps no iOS)
 * com fallback universal para web.
 * 
 * @param {Object|string} itemOuLocalizacao - Objeto com { localizacao, nome, endereco, latitude, longitude } ou string com nome do lugar
 */
export const abrirNoMaps = async (itemOuLocalizacao) => {
    if (!itemOuLocalizacao) return;

    let localizacaoTexto = "";
    let latitude = null;
    let longitude = null;
    let endereco = "";

    if (typeof itemOuLocalizacao === "string") {
        localizacaoTexto = itemOuLocalizacao;
    } else {
        localizacaoTexto = itemOuLocalizacao.localizacao || itemOuLocalizacao.nome || "";
        latitude = itemOuLocalizacao.latitude;
        longitude = itemOuLocalizacao.longitude;
        endereco = itemOuLocalizacao.endereco || "";
    }

    if (!localizacaoTexto && !latitude) return;

    const temCoords =
        latitude !== undefined &&
        latitude !== null &&
        longitude !== undefined &&
        longitude !== null &&
        !isNaN(Number(latitude)) &&
        !isNaN(Number(longitude));

    const coords = temCoords ? `${latitude},${longitude}` : null;
    const termoBusca = endereco && localizacaoTexto && !localizacaoTexto.includes(endereco)
        ? `${localizacaoTexto}, ${endereco}`
        : localizacaoTexto;

    const queryTermo = encodeURIComponent(termoBusca || coords || "");

    // URL Universal do Google Maps (funciona em Web, Android e iOS com pin e busca precisa)
    const universalUrl = coords
        ? `https://www.google.com/maps/search/?api=1&query=${queryTermo}&center=${coords}`
        : `https://www.google.com/maps/search/?api=1&query=${queryTermo}`;

    let nativeScheme = null;
    if (Platform.OS === "android") {
        nativeScheme = coords
            ? `geo:${coords}?q=${coords}(${encodeURIComponent(localizacaoTexto || "Localização")})`
            : `geo:0,0?q=${queryTermo}`;
    } else if (Platform.OS === "ios") {
        nativeScheme = coords
            ? `maps:0,0?q=${encodeURIComponent(localizacaoTexto || "Localização")}&ll=${coords}`
            : `maps:0,0?q=${queryTermo}`;
    } else {
        nativeScheme = universalUrl;
    }

    try {
        if (nativeScheme && nativeScheme !== universalUrl) {
            const canOpen = await Linking.canOpenURL(nativeScheme);
            if (canOpen) {
                await Linking.openURL(nativeScheme);
                return;
            }
        }
        await Linking.openURL(universalUrl);
    } catch (err) {
        console.log("Erro ao abrir app de mapas:", err);
        try {
            await Linking.openURL(universalUrl);
        } catch (e) {
            console.log("Falha ao abrir universalUrl:", e);
        }
    }
};
