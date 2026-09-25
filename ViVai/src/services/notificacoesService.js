import { api } from "./json";

/**
 * Cria uma notificação em tempo real quando o usuário curte uma publicação.
 */
export const criarNotificacaoCurtida = async ({ publicacao, usuarioLogado }) => {
    try {
        if (!publicacao) return null;

        const nome = usuarioLogado?.nome || "Maria Eduarda";
        const usuario = usuarioLogado?.usuario || "cordeiro_makk";
        const foto = usuarioLogado?.foto || "maria.jpeg";
        const publicacaoImagem = Array.isArray(publicacao?.imagem)
            ? publicacao.imagem[0]
            : (publicacao?.imagem || null);

        const novaNotificacao = {
            nome,
            usuario,
            foto,
            mensagem: "curtiu sua publicação.",
            tempo: "Agora",
            tipo: "curtida",
            lida: false,
            publicacaoId: Number(publicacao.id),
            publicacaoImagem,
        };

        const res = await api.post("/notificacoes", novaNotificacao);
        return res.data;
    } catch (error) {
        console.log("Erro ao enviar notificação de curtida:", error?.message || error);
        return null;
    }
};

/**
 * Cria uma notificação em tempo real quando alguém comenta em uma publicação.
 * Inclui o texto real digitado no comentário.
 */
export const criarNotificacaoComentario = async ({ publicacao, usuarioLogado, textoComentario }) => {
    try {
        if (!publicacao || !textoComentario?.trim()) return null;

        const nome = usuarioLogado?.nome || "Maria Eduarda";
        const usuario = usuarioLogado?.usuario || "cordeiro_makk";
        const foto = usuarioLogado?.foto || "maria.jpeg";
        const publicacaoImagem = Array.isArray(publicacao?.imagem)
            ? publicacao.imagem[0]
            : (publicacao?.imagem || null);

        const textoLimpo = textoComentario.trim();

        const novaNotificacao = {
            nome,
            usuario,
            foto,
            mensagem: `comentou: “${textoLimpo}”`,
            comentarioTexto: textoLimpo,
            tempo: "Agora",
            tipo: "comentario",
            lida: false,
            publicacaoId: Number(publicacao.id),
            publicacaoImagem,
        };

        const res = await api.post("/notificacoes", novaNotificacao);
        return res.data;
    } catch (error) {
        console.log("Erro ao enviar notificação de comentário:", error?.message || error);
        return null;
    }
};

/**
 * Cria uma notificação em tempo real quando alguém começa a seguir um perfil.
 */
export const criarNotificacaoSeguir = async ({ usuarioAlvo, usuarioLogado }) => {
    try {
        if (!usuarioAlvo) return null;

        const nome = usuarioAlvo.nome || "Novo Usuário";
        const usuario = usuarioAlvo.usuario || usuarioAlvo.user?.replace("@", "") || "usuario";
        const foto = usuarioAlvo.foto || "pessoa.jpeg";
        const cor = usuarioAlvo.cor;
        const inicial = usuarioAlvo.inicial || (nome ? nome.charAt(0).toUpperCase() : "U");

        const novaNotificacao = {
            nome,
            usuario,
            foto,
            cor,
            inicial,
            mensagem: "começou a seguir você.",
            tempo: "Agora",
            tipo: "seguir",
            lida: false,
        };

        const res = await api.post("/notificacoes", novaNotificacao);
        return res.data;
    } catch (error) {
        console.log("Erro ao enviar notificação de seguidor:", error?.message || error);
        return null;
    }
};

/**
 * Cria uma notificação em tempo real quando o usuário salva uma publicação.
 */
export const criarNotificacaoSalvar = async ({ publicacao, usuarioLogado }) => {
    try {
        if (!publicacao) return null;

        const nome = usuarioLogado?.nome || "Maria Eduarda";
        const usuario = usuarioLogado?.usuario || "cordeiro_makk";
        const foto = usuarioLogado?.foto || "maria.jpeg";
        const publicacaoImagem = Array.isArray(publicacao?.imagem)
            ? publicacao.imagem[0]
            : (publicacao?.imagem || null);

        const novaNotificacao = {
            nome,
            usuario,
            foto,
            mensagem: "salvou sua publicação.",
            tempo: "Agora",
            tipo: "salvar",
            lida: false,
            publicacaoId: Number(publicacao.id),
            publicacaoImagem,
        };

        const res = await api.post("/notificacoes", novaNotificacao);
        return res.data;
    } catch (error) {
        console.log("Erro ao enviar notificação de salvar:", error?.message || error);
        return null;
    }
};

