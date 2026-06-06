import { useState, useCallback, useRef } from "react";
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
  const textoRef = useRef("");
  const navigate = useNavigate();

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
            <div className={styles.digiteSuaDvidaClip}>
              <img
                className={styles.digiteSuaDvidaClipChild}
                loading="lazy"
                alt=""
                src="/Group-80@2x.png"
              />
              <input
                type="text"
                className={styles.campoTexto}
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
