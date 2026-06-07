import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../../components/NavbarAdvogado";
import NavbarLateralChat from "./components/NavbarLateralChat";
import BotoSugesto from "./components/BotoSugesto";
import RespostaIA from "./components/RespostaIA";
import styles from "./ChatAdvogado.module.css";

const FORMATOS = [
  {
    id: "detalhado",
    label: "Detalhado",
    instrucao: "Responda de forma detalhada, com listas, tópicos em negrito e seção de dicas.",
  },
  {
    id: "resumido",
    label: "Resumido",
    instrucao: "Responda de forma resumida em 2-3 parágrafos curtos, sem listas extensas.",
  },
  {
    id: "simples",
    label: "Simples",
    instrucao: "Responda de forma muito simples, como se estivesse explicando para alguém sem conhecimento jurídico.",
  },
];

const horarioAtual = () =>
  new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

const ChatAdvogado = () => {
  const [sugestoes] = useState([
    { id: 1, icone: "/Group-78@2x.png",  texto: "Qual o prazo para contestação?" },
    { id: 2, icone: "/Group-782@2x.png", texto: "Modelo de petição inicial" },
    { id: 3, icone: "/Group-781@2x.png", texto: "Calcular custas processuais" },
  ]);

  const [mensagem, setMensagem]         = useState("");
  const [historico, setHistorico]       = useState([]);
  const [carregando, setCarregando]     = useState(false);
  const [formatoAtivo, setFormatoAtivo] = useState("detalhado");
  const [instrucaoLivre, setInstrucaoLivre] = useState("");

  const fimChatRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    fimChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historico, carregando]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [mensagem]);

  const handleEnviar = async (textoOverride) => {
    const texto = (textoOverride ?? mensagem).trim();
    if (!texto || carregando) return;

    setHistorico((prev) => [
      ...prev,
      { tipo: "usuario", conteudo: texto, horario: horarioAtual() },
    ]);
    setMensagem("");
    setCarregando(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setHistorico((prev) => [
        ...prev,
        {
          tipo: "ia",
          conteudo: "Recebi sua solicitação. Estou processando as informações para trazer a melhor resposta jurídica para você. Em instantes terá uma análise completa.",
          horario: horarioAtual(),
        },
      ]);
    } catch {
      setHistorico((prev) => [
        ...prev,
        {
          tipo: "ia",
          conteudo: "⚠️ Não consegui processar sua solicitação no momento. Por favor, tente novamente em instantes.",
          horario: horarioAtual(),
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  // Mensagem pendente
  const mensagemPendenteRef = useRef(false);
  useEffect(() => {
    if (mensagemPendenteRef.current) return;
    const pendente = sessionStorage.getItem("juriki_mensagem_pendente");
    if (pendente) {
      sessionStorage.removeItem("juriki_mensagem_pendente");
      mensagemPendenteRef.current = true;
      handleEnviar(pendente);
    }
  }, []);

  const emConversa = historico.length > 0;

  return (
    <div className={styles.paginaLayout}>
      <Navbar />

      <main className={styles.corpoPrincipal}>
        <aside className={styles.sidebarEsquerda}>
          <NavbarLateralChat
            onSelectConversa={(chat) => {
              setHistorico(chat ? chat.mensagens : []);
              setMensagem("");
            }}
          />
        </aside>

        <section className={styles.telaIa}>
          <div className={styles.containerCentro}>

            <header className={styles.cumprimentosIa}>
              <h1 className={styles.olAlice}>Olá, Dra. Alice!</h1>
              <h2 className={styles.comoPossoAjudar}>Como posso te ajudar hoje?</h2>
            </header>

            {emConversa && (
              <div className={styles.seletorFormato}>
                <span className={styles.rotuloFormato}>Formato da resposta:</span>
                {FORMATOS.map((f) => (
                  <button
                    key={f.id}
                    className={`${styles.botaoFormato} ${
                      formatoAtivo === f.id ? styles.botaoFormatoAtivo : ""
                    }`}
                    onClick={() => setFormatoAtivo(f.id)}
                    title={f.instrucao}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {!emConversa ? (
              <div className={styles.botesDeSugesto}>
                {sugestoes.map((s) => (
                  <BotoSugesto
                    key={s.id}
                    icone={s.icone}
                    texto={s.texto}
                    onClick={() => handleEnviar(s.texto)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.areaChat}>
                {historico.map((msg, idx) =>
                  msg.tipo === "usuario" ? (
                    <div key={idx} className={styles.mensagemUsuario}>
                      <div className={styles.bolhaUsuario}>
                        <p>{msg.conteudo}</p>
                        <span className={styles.horarioUsuario}>{msg.horario}</span>
                      </div>
                      <img
                        src="/Avatar-Foto-Teste.png"
                        alt="Avatar"
                        className={styles.avatarUsuario}
                      />
                    </div>
                  ) : (
                    <RespostaIA
                      key={idx}
                      conteudo={msg.conteudo}
                      horario={msg.horario}
                    />
                  )
                )}

                {carregando && (
                  <div className={styles.mensagemIA}>
                    <div className={styles.avatarIA}>
                      <img src="/Logo-juriki-girassol-completo-2@2x.png" alt="Juriki" />
                    </div>
                    <div className={styles.bolha}>
                      <p className={styles.paragrafo}>Analisando...</p>
                    </div>
                  </div>
                )}

                <div ref={fimChatRef} />
              </div>
            )}

            <div className={styles.formularioChat}>
              <div className={styles.inputIa}>
                <textarea
                  ref={textareaRef}
                  className={styles.campoTexto}
                  placeholder="Digite sua dúvida aqui..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={carregando}
                  rows={1}
                />

                <button
                  type="button"
                  className={styles.botaoEnviar}
                  title="Enviar mensagem"
                  onClick={() => handleEnviar()}
                  disabled={carregando || !mensagem.trim()}
                >
                  <img src="/Group-79@2x.png" alt="Enviar" />
                </button>
              </div>

              <div className={styles.descrioDeSegurana}>
                <img className={styles.vectorIcon} alt="" src="/Vector6.svg" />
                <span>Suas conversas são confidenciais e seguras.</span>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default ChatAdvogado;
