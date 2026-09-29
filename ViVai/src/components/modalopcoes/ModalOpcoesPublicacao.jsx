import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CORES = {
  fundoCard: '#1C1C1E',
  borda: '#2C2C2E',
  laranja: '#FF7A00',
  vermelho: '#EF4444',
  texto: '#FFFFFF',
  textoSecundario: '#9CA3AF',
  fundoItem: '#252528',
};

const MOTIVOS_REPORTE = [
  { id: 'spam', titulo: 'Spam ou publicidade indesejada', icone: 'mail-unread-outline' },
  { id: 'inapropriado', titulo: 'Conteúdo inadequado ou ofensivo', icone: 'alert-circle-outline' },
  { id: 'falso', titulo: 'Informação falsa ou fraudulenta', icone: 'help-circle-outline' },
  { id: 'direitos', titulo: 'Violação de direitos autorais', icone: 'shield-outline' },
  { id: 'outro', titulo: 'Outro motivo', icone: 'ellipsis-horizontal-circle-outline' },
];

export const ModalOpcoesPublicacao = ({
  visivel,
  publicacao,
  onClose,
  onBloquearConta,
  onReportarPublicacao,
}) => {
  // Estado para controlar se estamos no menu inicial ou na tela de motivos do reporte
  const [etapa, setEtapa] = useState('menu'); // 'menu' | 'reportar' | 'confirmarBloqueio'
  const [motivoSelecionado, setMotivoSelecionado] = useState(null);

  const resetarEFechar = () => {
    setEtapa('menu');
    setMotivoSelecionado(null);
    onClose();
  };

  if (!publicacao) return null;

  const nomeAutor = publicacao.usuario || 'Usuário';

  const confirmarReporte = () => {
    const motivoFinal =
      MOTIVOS_REPORTE.find((m) => m.id === motivoSelecionado)?.titulo || 'Conteúdo inadequado';
    onReportarPublicacao(publicacao, motivoFinal);
    resetarEFechar();
  };

  const confirmarBloqueio = () => {
    onBloquearConta(publicacao);
    resetarEFechar();
  };

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={resetarEFechar}
    >
      <TouchableWithoutFeedback onPress={resetarEFechar}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.cardModal}>
              {/* Barra indicadora superior */}
              <View style={styles.indicador} />

              {/* TELA 1: MENU PRINCIPAL (BLOQUEAR E REPORTAR) */}
              {etapa === 'menu' && (
                <>
                  <View style={styles.headerModal}>
                    <Text style={styles.autorTitulo} numberOfLines={1}>
                      Publicação de {nomeAutor}
                    </Text>
                    <Text style={styles.autorSubtitulo}>
                      Escolha uma ação para esta publicação
                    </Text>
                  </View>

                  <View style={styles.listaOpcoes}>
                    {/* OPÇÃO 1: REPORTAR PUBLICAÇÃO */}
                    <TouchableOpacity
                      style={styles.itemOpcao}
                      activeOpacity={0.7}
                      onPress={() => setEtapa('reportar')}
                    >
                      <View style={[styles.iconeCirculo, { backgroundColor: 'rgba(255, 122, 0, 0.15)' }]}>
                        <Ionicons name="flag" size={20} color={CORES.laranja} />
                      </View>
                      <View style={styles.infoOpcao}>
                        <Text style={styles.tituloOpcao}>Reportar publicação</Text>
                        <Text style={styles.descOpcao}>
                          Denunciar spam, conteúdo impróprio ou ofensivo
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={CORES.textoSecundario} />
                    </TouchableOpacity>

                    <View style={styles.divisor} />

                    {/* OPÇÃO 2: BLOQUEAR CONTA */}
                    <TouchableOpacity
                      style={styles.itemOpcao}
                      activeOpacity={0.7}
                      onPress={() => setEtapa('confirmarBloqueio')}
                    >
                      <View style={[styles.iconeCirculo, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                        <Ionicons name="ban" size={20} color={CORES.vermelho} />
                      </View>
                      <View style={styles.infoOpcao}>
                        <Text style={[styles.tituloOpcao, { color: CORES.vermelho }]}>
                          Bloquear {nomeAutor}
                        </Text>
                        <Text style={styles.descOpcao}>
                          Ocultar publicações e impedir contato deste usuário
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={CORES.textoSecundario} />
                    </TouchableOpacity>
                  </View>

                  {/* BOTÃO CANCELAR */}
                  <TouchableOpacity
                    style={styles.botaoCancelar}
                    activeOpacity={0.8}
                    onPress={resetarEFechar}
                  >
                    <Text style={styles.textoCancelar}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* TELA 2: ESCOLHER MOTIVO DO REPORTE */}
              {etapa === 'reportar' && (
                <>
                  <View style={styles.headerModal}>
                    <TouchableOpacity
                      style={styles.botaoVoltarEtapa}
                      onPress={() => setEtapa('menu')}
                    >
                      <Ionicons name="chevron-back" size={22} color={CORES.texto} />
                    </TouchableOpacity>
                    <Text style={styles.autorTitulo}>Motivo da denúncia</Text>
                    <Text style={styles.autorSubtitulo}>
                      Por que você deseja denunciar esta publicação?
                    </Text>
                  </View>

                  <ScrollView style={styles.scrollMotivos} showsVerticalScrollIndicator={false}>
                    {MOTIVOS_REPORTE.map((motivo) => {
                      const selecionado = motivoSelecionado === motivo.id;

                      return (
                        <TouchableOpacity
                          key={motivo.id}
                          style={[
                            styles.itemMotivo,
                            selecionado && styles.itemMotivoSelecionado,
                          ]}
                          activeOpacity={0.7}
                          onPress={() => setMotivoSelecionado(motivo.id)}
                        >
                          <Ionicons
                            name={motivo.icone}
                            size={18}
                            color={selecionado ? CORES.laranja : CORES.textoSecundario}
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={[
                              styles.textoMotivo,
                              selecionado && styles.textoMotivoSelecionado,
                            ]}
                          >
                            {motivo.titulo}
                          </Text>
                          {selecionado ? (
                            <Ionicons
                              name="checkmark-circle"
                              size={20}
                              color={CORES.laranja}
                              style={{ marginLeft: 'auto' }}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <View style={styles.acoesReporte}>
                    <TouchableOpacity
                      style={[
                        styles.botaoConfirmarReporte,
                        !motivoSelecionado && { opacity: 0.5 },
                      ]}
                      disabled={!motivoSelecionado}
                      activeOpacity={0.85}
                      onPress={confirmarReporte}
                    >
                      <Ionicons name="paper-plane" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                      <Text style={styles.textoConfirmarReporte}>Enviar denúncia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoVoltarSimples}
                      onPress={() => setEtapa('menu')}
                    >
                      <Text style={styles.textoCancelar}>Voltar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* TELA 3: CONFIRMAR BLOQUEIO DE CONTA */}
              {etapa === 'confirmarBloqueio' && (
                <View style={styles.boxConfirmarBloqueio}>
                  <View style={[styles.iconeGrande, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                    <Ionicons name="ban" size={36} color={CORES.vermelho} />
                  </View>

                  <Text style={styles.tituloConfirmarBloqueio}>
                    Bloquear {nomeAutor}?
                  </Text>

                  <Text style={styles.descConfirmarBloqueio}>
                    Essa pessoa não poderá ver seu perfil e você deixará de visualizar todas as publicações dela no seu feed.
                  </Text>

                  <TouchableOpacity
                    style={styles.botaoConfirmarBloqueio}
                    activeOpacity={0.85}
                    onPress={confirmarBloqueio}
                  >
                    <Ionicons name="ban" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.textoConfirmarBloqueio}>Sim, bloquear conta</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoVoltarSimples}
                    activeOpacity={0.8}
                    onPress={() => setEtapa('menu')}
                  >
                    <Text style={styles.textoCancelar}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  cardModal: {
    backgroundColor: CORES.fundoCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: CORES.borda,
    maxHeight: '85%',
  },
  indicador: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#3E3E42',
    alignSelf: 'center',
    marginBottom: 14,
  },
  headerModal: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  botaoVoltarEtapa: {
    position: 'absolute',
    left: 0,
    top: -2,
    padding: 4,
  },
  autorTitulo: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  autorSubtitulo: {
    color: CORES.textoSecundario,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  listaOpcoes: {
    backgroundColor: CORES.fundoItem,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.borda,
    overflow: 'hidden',
    marginBottom: 14,
  },
  itemOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  iconeCirculo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoOpcao: {
    flex: 1,
    paddingRight: 8,
  },
  tituloOpcao: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '600',
  },
  descOpcao: {
    color: CORES.textoSecundario,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
    marginLeft: 66,
  },
  botaoCancelar: {
    backgroundColor: '#2A2A2E',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCancelar: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollMotivos: {
    maxHeight: 250,
    marginBottom: 14,
  },
  itemMotivo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.fundoItem,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  itemMotivoSelecionado: {
    borderColor: CORES.laranja,
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
  },
  textoMotivo: {
    color: CORES.texto,
    fontSize: 13,
    flex: 1,
  },
  textoMotivoSelecionado: {
    color: CORES.laranja,
    fontWeight: '600',
  },
  acoesReporte: {
    marginTop: 6,
  },
  botaoConfirmarReporte: {
    backgroundColor: CORES.laranja,
    flexDirection: 'row',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  textoConfirmarReporte: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  botaoVoltarSimples: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxConfirmarBloqueio: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconeGrande: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tituloConfirmarBloqueio: {
    color: CORES.texto,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  descConfirmarBloqueio: {
    color: CORES.textoSecundario,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  botaoConfirmarBloqueio: {
    backgroundColor: CORES.vermelho,
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 8,
  },
  textoConfirmarBloqueio: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
