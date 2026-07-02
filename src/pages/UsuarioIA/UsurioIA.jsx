import { useState, useRef, useEffect, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Menu1 from "../../components/Menu1";
import NavbarLateral from "./components/NavbarLateral/NavbarLateral";
import BotoSugesto from "./components/BotoSugesto";
import RespostaIA from "./components/RespostaIA";
import styles from "./UsurioIA.module.css";

// Aponta para o worker via CDN — evita problemas de path no Vite/Webpack
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const N8N_WEBHOOK_URL = "https://thomasrezendesantos.app.n8n.cloud/webhook/juriki-chat";

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

const UsurioIA = () => {
  const [sugestoes] = useState([
    { id: 1, icone: "/Group-78@2x.png",  texto: "Tenho dúvidas sobre meus direitos trabalhistas" },
    { id: 2, icone: "/Group-782@2x.png", texto: "Quero entender um contrato" },
    { id: 3, icone: "/Group-781@2x.png", texto: "Dúvidas sobre direito do consumidor" },
  ]);

  const [mensagem, setMensagem]             = useState("");
  const [historico, setHistorico]           = useState([]);
  const [carregando, setCarregando]         = useState(false);
  const [formatoAtivo, setFormatoAtivo]     = useState("detalhado");
  const [instrucaoLivre, setInstrucaoLivre] = useState("");

  // Estados para upload de PDF
  const [arquivoPdf, setArquivoPdf]   = useState(null); // { nome, texto }
  const [dragAtivo, setDragAtivo]     = useState(false);
  const [erroArquivo, setErroArquivo] = useState("");
  const [extraindo, setExtraindo]     = useState(false);
  const [gravando, setGravando]       = useState(false);
  const reconhecimentoRef = useRef(null);
  const ultimoIndiceProcessadoRef = useRef(0);

  const fimChatRef      = useRef(null);
  const inputArquivoRef = useRef(null);
  const textareaRef     = useRef(null);
  const autoResizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, []);

  useEffect(() => {
    fimChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historico, carregando]);

  useEffect(() => {
    autoResizeTextarea();
  }, [mensagem, autoResizeTextarea]);

  // ─── Pega arquivo pendente do sessionStorage (vindo da Home) ──────────────
  useEffect(() => {
    const dados = sessionStorage.getItem("juriki_arquivo_pendente_dados");
    const nome = sessionStorage.getItem("juriki_arquivo_pendente_nome");
    if (dados && nome) {
      sessionStorage.removeItem("juriki_arquivo_pendente_dados");
      sessionStorage.removeItem("juriki_arquivo_pendente_nome");
      fetch(dados)
        .then((res) => res.blob())
        .then((blob) => {
          const arquivo = new File([blob], nome, { type: "application/pdf" });
          extrairTextoPDF(arquivo);
        })
        .catch(() => {
          setErroArquivo("Não foi possível carregar o arquivo anexado.");
        });
    }
  }, []);

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
    const arrayBuffer = await arquivo.arrayBuffer(); // <-- aqui a mudança
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise; // <-- e aqui

    let texto = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const pagina = await pdf.getPage(i);
      const conteudo = await pagina.getTextContent();
      texto += conteudo.items.map((item) => item.str).join(" ") + "\n";
    }

    // sem revokeObjectURL — não precisa mais

    if (!texto.trim()) {
      setErroArquivo("Este PDF parece ser uma imagem escaneada e não possui texto extraível.");
      return;
    }

    setArquivoPdf({ nome: arquivo.name, texto });
  } catch (err) {
    console.error("Erro pdfjs:", err); // <-- adiciona isso pra ver o erro real no console
    setErroArquivo("Não foi possível ler o PDF. Verifique se o arquivo não está corrompido.");
  } finally {
    setExtraindo(false);
  }
};

  // ─── Handlers de drag-and-drop ──────────────────────────────────────────────
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
    e.target.value = ""; // permite reselecionar o mesmo arquivo
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
  const enviarParaN8n = async (texto) => {
    const formato       = FORMATOS.find((f) => f.id === formatoAtivo);
    const instrucaoLimpa = sanitizarInstrucao(instrucaoLivre);
    const instrucaoFinal = instrucaoLimpa
      ? `${formato.instrucao} Além disso, siga esta instrução específica do usuário: "${instrucaoLimpa}"`
      : formato.instrucao;

    // Se houver PDF, concatena o texto extraído à mensagem
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

  // ─── Envio da mensagem ───────────────────────────────────────────────────────
  const handleEnviar = async (textoOverride) => {
    const texto = (textoOverride ?? mensagem).trim();
    if (!texto || carregando) return;

    // Monta o conteúdo exibido na bolha do usuário
    const conteudoExibido = arquivoPdf
      ? `${texto}\n📄 ${arquivoPdf.nome}`
      : texto;

    setHistorico((prev) => [
      ...prev,
      { tipo: "usuario", conteudo: conteudoExibido, horario: horarioAtual() },
    ]);
    setMensagem("");
    setArquivoPdf(null); // limpa o PDF após enviar
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
          conteudo:
            "⚠️ Não consegui processar sua dúvida no momento. Por favor, tente novamente em instantes.",
          horario: horarioAtual(),
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  // ─── Mensagem pendente da Home Usuário ─────────────────────────────────
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  // ─── Reconhecimento de voz ────────────────────────────────────────────
  const iniciarGravacao = useCallback(() => {
    const SpeechRec =
      window.SpeechRecognition || window.webkitSpeechRecognition;
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

  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      if (reconhecimentoRef.current) {
        reconhecimentoRef.current.abort();
      }
    };
  }, []);

  const emConversa = historico.length > 0;

  return (
    <div className={styles.paginaLayout}>
      <Menu1 />

      <main className={styles.corpoPrincipal}>
        <aside className={styles.sidebarEsquerda}>
          <NavbarLateral
            onSelectConversa={(chat) => {
              setHistorico(chat ? chat.mensagens : []);
              setMensagem("");
            }}
          />
        </aside>

        {/* A section inteira vira a zona de drag-and-drop */}
        <section
          className={`${styles.telaIa} ${dragAtivo ? styles.telaIaDragAtiva : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Input file oculto — acionado pelo botão do alfinete */}
          <input
            ref={inputArquivoRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleInputArquivo}
          />

          {/* Overlay visual de drag ativo */}
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
              <h1 className={styles.olAlice}>Olá, Alice!</h1>
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
                        src="/user.svg"
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

                <div ref={fimChatRef} />
              </div>
            )}

            {/* Preview do arquivo selecionado + erros — acima do formulário */}
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
                {/* Botão do alfinete agora abre o explorador de arquivos */}
                <button
                  type="button"
                  className={styles.botaoMidia}
                  title="Anexar PDF"
                  onClick={() => inputArquivoRef.current?.click()}
                  disabled={extraindo}
                >
                  <img src="/Group-80@2x.png" alt="Anexo" />
                </button>

                <textarea
                  ref={textareaRef}
                  className={styles.campoTexto}
                  rows={1}
                  placeholder={
                    arquivoPdf
                      ? "PDF anexado. Digite sua pergunta sobre o documento..."
                      : "Digite sua dúvida aqui..."
                  }
                  value={mensagem}
                  onChange={(e) => {
                    setMensagem(e.target.value);
                    autoResizeTextarea();
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={carregando}
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

export default UsurioIA;