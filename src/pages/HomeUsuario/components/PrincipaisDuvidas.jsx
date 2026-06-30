import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Duvida1Chat from "./Duvida1Chat";
import Chat from "./Chat";
import House from "./House";
import Document from "./Document1";
import People from "./People";
import PropTypes from "prop-types";
import styles from "./PrincipaisDuvidas.module.css";

const PrincipaisDuvidas = ({ className = "" }) => {
  const [textoInput, setTextoInput] = useState("");
  const [gravando, setGravando] = useState(false);
  const textoRef = useRef("");
  const textareaRef = useRef(null);
  const reconhecimentoRef = useRef(null);
  const ultimoIndiceProcessadoRef = useRef(0);
  const inputArquivoRef = useRef(null);
  const navigate = useNavigate();

  const autoResizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, []);

  useEffect(() => {
    autoResizeTextarea();
  }, [textoInput, autoResizeTextarea]);

  const handleEnviar = useCallback(() => {
    const msg = textoRef.current.trim();
    if (!msg) return;
    sessionStorage.setItem("juriki_mensagem_pendente", msg);
    navigate("/ia");
  }, [navigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEnviar();
    }
  }, [handleEnviar]);

  const handleDuvidaClick = useCallback((texto) => {
    sessionStorage.setItem("juriki_mensagem_pendente", texto);
    navigate("/ia");
  }, [navigate]);

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
        setTextoInput((prev) => (prev ? prev + " " + novoTexto : novoTexto).trim());
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

  const handleArquivoSelecionado = (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    e.target.value = "";

    const leitor = new FileReader();
    leitor.onload = () => {
      try {
        sessionStorage.setItem("juriki_arquivo_pendente_nome", arquivo.name);
        sessionStorage.setItem("juriki_arquivo_pendente_dados", leitor.result);
      } catch {
        alert("Arquivo muito grande para ser anexado desta forma. Use a página de IA diretamente.");
        return;
      }
      navigate("/ia");
    };
    leitor.readAsDataURL(arquivo);
  };

  return (
    <section className={[styles.principaisDuvidas, className].join(" ")}>
      <section className={styles.principaisDvidas}>
        <div className={styles.principaisDuvidas2}>
          <div className={styles.ttuloPrincipaisDvidas}>
            <img
              className={styles.phstarFourBoldIcon}
              alt=""
              src="/ph-star-four-bold.svg"
            />
            <h2 className={styles.principaisDvidas2}>Principais dúvidas</h2>
          </div>
          <h3 className={styles.vejaPerguntasFeitas}>
            Veja perguntas feitas por usuários como você:
          </h3>
        </div>
        <form className={styles.duvidasTotais}>
          <Duvida1Chat
            property1="Default"
            text="Fui demitido quais são  meus direitos?"
            iconeAzul={<Chat property1="azul" />}
            onClick={() => handleDuvidaClick("Fui demitido quais são  meus direitos?")}
          />
          <Duvida1Chat
            property1="Default"
            text="Meu aluguel pode aumentar durante o contrato?"
            duvida1ChatWidth="325px"
            fuiDemitidoQuaisWidth="unset"
            fuiDemitidoQuaisDisplay="unset"
            fuiDemitidoQuaisFlex="1"
            iconeAzul={<House property1="azul" />}
            onClick={() => handleDuvidaClick("Meu aluguel pode aumentar durante o contrato?")}
          />
          <Duvida1Chat
            property1="Default"
            text="Como funciona a pensão alimentícia?"
            duvida1ChatWidth="unset"
            fuiDemitidoQuaisWidth="unset"
            fuiDemitidoQuaisDisplay="unset"
            fuiDemitidoQuaisFlex="1"
            iconeAzul={<Document property1="Default" />}
            onClick={() => handleDuvidaClick("Como funciona a pensão alimentícia?")}
          />
          <Duvida1Chat
            property1="Default"
            text="Quais são os meus direitos como consumidor?"
            duvida1ChatWidth="325px"
            fuiDemitidoQuaisWidth="unset"
            fuiDemitidoQuaisDisplay="unset"
            fuiDemitidoQuaisFlex="1"
            iconeAzul={<People property1="Default" />}
            onClick={() => handleDuvidaClick("Quais são os meus direitos como consumidor?")}
          />
        </form>
      </section>
      <section className={styles.chatDemo}>
        <div className={styles.inputIa}>
          <div className={styles.informaesInput}>
            <input
              ref={inputArquivoRef}
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={handleArquivoSelecionado}
            />
            <div className={styles.digiteSuaDvidaClip}>
              <button
                type="button"
                className={styles.botaoAnexo}
                title="Anexar PDF"
                onClick={() => inputArquivoRef.current?.click()}
              >
                <img
                  className={styles.digiteSuaDvidaClipChild}
                  loading="lazy"
                  alt="Anexo"
                  src="/Group-80@2x.png"
                />
              </button>
              <textarea
                ref={textareaRef}
                className={styles.campoTexto}
                rows={1}
                placeholder="Escreva sua dúvida aqui"
                value={textoInput}
                onChange={(e) => {
                  setTextoInput(e.target.value);
                  textoRef.current = e.target.value;
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              type="button"
              className={`${styles.botaoMicrofone} ${gravando ? styles.botaoMicrofoneAtivo : ""}`}
              title={gravando ? "Parar gravação" : "Falar"}
              onClick={handleMicClick}
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
              onClick={handleEnviar}
              disabled={!textoInput.trim()}
            >
              <img
                className={styles.digiteSuaDvidaClipChild}
                alt="Enviar"
                src="/Group-79@2x.png"
              />
            </button>
          </div>
        </div>
        <div className={styles.descrioDeSegurana}>
          <img className={styles.vectorIcon} alt="" src="/Vector7.svg" />
          <div className={styles.escrevaSuaDvida}>
            Suas conversas são confidenciais e seguras.
          </div>
        </div>
      </section>
    </section>
  );
};

PrincipaisDuvidas.propTypes = {
  className: PropTypes.string,
};

export default PrincipaisDuvidas;
