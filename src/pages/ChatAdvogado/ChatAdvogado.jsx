import { useState, useRef, useEffect, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Navbar from "../../components/NavbarAdvogado";
import NavbarLateralChat from "./components/NavbarLateralChat";
import BotoSugesto from "./components/BotoSugesto";
import RespostaIA from "./components/RespostaIA";
import styles from "./ChatAdvogado.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

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
  const inputArquivoRef = useRef(null);
  const reconhecimentoRef = useRef(null);
  const ultimoIndiceProcessadoRef = useRef(0);

  // Estados para upload de PDF
  const [arquivoPdf, setArquivoPdf]   = useState(null);
  const [dragAtivo, setDragAtivo]     = useState(false);
  const [erroArquivo, setErroArquivo] = useState("");
  const [extraindo, setExtraindo]     = useState(false);
  const [gravando, setGravando]       = useState(false);

  useEffect(() => {
    fimChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historico, carregando]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [mensagem]);

  // ─── Extração de texto do PDF ───────────────────────────────────────────────
  const extrairTextoPDF = async (arquivo) => {
    setErroArquivo("");
    if (arquivo.type !== "application/pdf") {
      setErroArquivo("Apenas arquivos PDF são aceitos.");
      return;
    }
    if (arquivo.size > 10 * 1024 * 1024) {
      setErroArquivo("Arquivo muito grande. Limite: 10 MB.");
      return;
    }
    setExtraindo(true);
    try {
      const arrayBuffer = await arquivo.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let texto = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const pagina = await pdf.getPage(i);
        const conteudo = await pagina.getTextContent();
        texto += conteudo.items.map((item) => item.str).join(" ") + "\n";
      }
      if (!texto.trim()) {
        setErroArquivo("Este PDF parece ser uma imagem escaneada e não possui texto extraível.");
        return;
      }
      setArquivoPdf({ nome: arquivo.name, texto });
    } catch (err) {
      console.error("Erro pdfjs:", err);
      setErroArquivo("Não foi possível ler o PDF. Verifique se o arquivo não está corrompido.");
    } finally {
      setExtraindo(false);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragAtivo(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragAtivo(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragAtivo(false);
    const arquivo = e.dataTransfer.files[0];
    if (arquivo) extrairTextoPDF(arquivo);
  }, []);

  const handleInputArquivo = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) extrairTextoPDF(arquivo);
    e.target.value = "";
  };

  const removerArquivo = () => {
    setArquivoPdf(null);
    setErroArquivo("");
  };

  // ─── Sanitização de instrução livre ─────────────────────────────────────────
  const sanitizarInstrucao = (texto) =>
    texto
      .replace(/ignore (all |todas |as )?(previous |anteriores )?instructions?/gi, "")
      .replace(/system prompt/gi, "")
      .replace(/você (agora |now )?(é|is|deve ser)/gi, "")
      .trim();

  // ─── Envio ao n8n ────────────────────────────────────────────────────────────
  const N8N_WEBHOOK_URL = "https://rezendesantos.app.n8n.cloud/webhook/chat-advogado";

  const enviarParaN8n = async (texto) => {
    const formato       = FORMATOS.find((f) => f.id === formatoAtivo);
    const instrucaoLimpa = sanitizarInstrucao(instrucaoLivre);
    const instrucaoFinal = instrucaoLimpa
      ? `${formato.instrucao} Além disso, siga esta instrução específica do usuário: "${instrucaoLimpa}"`
      : formato.instrucao;

    const mensagemFinal = arquivoPdf
      ? `${texto}\n\n---\n📄 Conteúdo do arquivo "${arquivoPdf.nome}":\n${arquivoPdf.texto}`
      : texto;

    const resposta = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: mensagemFinal,
        instrucaoFormato: instrucaoFinal,
        history: historico.map((m) => ({
          role: m.tipo === "usuario" ? "user" : "assistant",
          content: m.conteudo,
        })),
      }),
    });

    if (!resposta.ok) throw new Error("Erro ao contatar o servidor.");

    const dados = await resposta.json();
    return dados.answer ?? "Sem resposta.";
  };

  // ─── Reconhecimento de voz ────────────────────────────────────────────
  const iniciarGravacao = useCallback(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Reconhecimento de voz não é suportado neste navegador.");
      return;
    }
    ultimoIndiceProcessadoRef.current = 0;
    const recognition = new SpeechRec();
    recognition.lang = "pt-BR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let novoTexto = "";
      for (let i = ultimoIndiceProcessadoRef.current; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          novoTexto += event.results[i][0].transcript;
        }
      }
      if (novoTexto) {
        setMensagem((prev) => (prev ? prev + " " + novoTexto : novoTexto).trim());
        ultimoIndiceProcessadoRef.current = event.results.length;
      }
    };

    recognition.onerror = () => {
      setGravando(false);
    };

    recognition.start();
    reconhecimentoRef.current = recognition;
    setGravando(true);
  }, []);

  const pararGravacao = useCallback(() => {
    if (reconhecimentoRef.current) {
      reconhecimentoRef.current.stop();
      reconhecimentoRef.current = null;
    }
    setGravando(false);
  }, []);

  const handleMicClick = () => {
    if (gravando) {
      pararGravacao();
    } else {
      iniciarGravacao();
    }
  };

  useEffect(() => {
    return () => {
      if (reconhecimentoRef.current) {
        reconhecimentoRef.current.abort();
      }
    };
  }, []);

  const handleEnviar = async (textoOverride) => {
    const texto = (textoOverride ?? mensagem).trim();
    if (!texto || carregando) return;

    const conteudoExibido = arquivoPdf ? `${texto}\n📄 ${arquivoPdf.nome}` : texto;

    setHistorico((prev) => [
      ...prev,
      { tipo: "usuario", conteudo: conteudoExibido, horario: horarioAtual() },
    ]);
    setMensagem("");
    setArquivoPdf(null);
    setCarregando(true);

    try {
      const respostaIA = await enviarParaN8n(texto);
      setHistorico((prev) => [
        ...prev,
        { tipo: "ia", conteudo: respostaIA, horario: horarioAtual() },
      ]);
    } catch (erro) {
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

        <section
          className={`${styles.telaIa} ${dragAtivo ? styles.telaIaDragAtiva : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={inputArquivoRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleInputArquivo}
          />
          {dragAtivo && (
            <div className={styles.overlayDrag}>
              <div className={styles.overlayDragConteudo}>
                <span className={styles.overlayDragIcone}>📄</span>
                <span className={styles.overlayDragTexto}>Solte o PDF aqui</span>
              </div>
            </div>
          )}
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

            {extraindo && (
              <div className={styles.previewPdf}>
                <span>⏳ Extraindo texto do PDF...</span>
              </div>
            )}

            {arquivoPdf && !extraindo && (
              <div className={styles.previewPdf}>
                <span>📄 {arquivoPdf.nome}</span>
                <button
                  onClick={removerArquivo}
                  title="Remover arquivo"
                  className={styles.botaoRemoverPdf}
                >
                  ✕
                </button>
              </div>
            )}

            {erroArquivo && (
              <span className={styles.erroArquivo}>{erroArquivo}</span>
            )}

            <div className={styles.formularioChat}>
              <div className={styles.inputIa}>
                <button
                  type="button"
                  className={`${styles.botaoMidia} ${arquivoPdf ? styles.botaoMidiaAtivo : ""}`}
                  title="Anexar PDF"
                  onClick={() => inputArquivoRef.current?.click()}
                  disabled={extraindo}
                >
                  <img src="/Group-80@2x.png" alt="Anexo" />
                </button>

                <textarea
                  ref={textareaRef}
                  className={styles.campoTexto}
                  placeholder={
                    arquivoPdf
                      ? "PDF anexado. Digite sua pergunta sobre o documento..."
                      : "Digite sua dúvida aqui..."
                  }
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={carregando}
                  rows={1}
                />

                <button
                  type="button"
                  className={`${styles.botaoMicrofone} ${gravando ? styles.botaoMicrofoneAtivo : ""}`}
                  title={gravando ? "Parar gravação" : "Falar"}
                  onClick={handleMicClick}
                  disabled={carregando}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor"/>
                    <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                <button
                  type="button"
                  className={styles.botaoEnviar}
                  title="Enviar mensagem"
                  onClick={() => handleEnviar()}
                  disabled={carregando || (!mensagem.trim() && !arquivoPdf)}
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
