import { useState, useCallback, useEffect, useRef } from "react";
import { sugestoesChat } from "../data/advogados";
import ChatSugestoes from "./ChatSugestoes";
import PropTypes from "prop-types";
import styles from "./SeusDireitosChat.module.css";
import { useAuthModal } from "../context/AuthModalContext";

const SeusDireitosChat = ({ className = "" }) => {
  const { openTipoModal } = useAuthModal();
  const [mensagem, setMensagem] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const enviar = useCallback(() => {
    if (!mensagem.trim()) return;
    openTipoModal("login");
  }, [mensagem, openTipoModal]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") enviar();
    },
    [enviar]
  );

  return (
    <div className={styles.wrapper}>
      <img
        className={`${styles.fundoFlor1} ${isVisible ? styles.flowerVisible : ""}`}
        alt=""
        src="/fundo-flor-1@2x.png"
      />
      <section ref={sectionRef} className={[styles.seusDireitosChat, className].join(" ")}>
        <h1 className={`${styles.seusDireitosExplicadosContainer} ${isVisible ? styles.animTitle : ""}`}>
          <span>
            <span>{`Seus `}</span>
            <span className={`${styles.direitos} ${isInViewport ? styles.direitosUnderline : ""}`}>direitos</span>
            <span> explicados em segundos.</span>
          </span>
        </h1>
        <div className={`${styles.nossaIaTraduz} ${isVisible ? styles.animSubtitle : ""}`}>
          Nossa IA traduz leis, analisa casos e mostra seus próximos passos com
          clareza.
        </div>
        <section className={`${styles.sugestesDePerguntas} ${isVisible ? styles.animCards : ""}`}>
          {sugestoesChat.map((item, index) => (
            <ChatSugestoes
              key={index}
              property1={item.property1}
              body={item.body}
            />
          ))}
        </section>
        <div className={`${styles.chat} ${isVisible ? styles.animChat : ""}`}>
          <input
            className={styles.input}
            type="text"
            placeholder="Escreva sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.botesChat}>
            <img className={styles.mdiaddIcon} alt="" src="/mdi-add.svg" />
            <img className={styles.mdiaddIcon} alt="" src="/ic-sharp-mic.svg" />
            <img
              className={styles.mdiaddIcon}
              alt="enviar"
              src="/mingcute-send-fill.svg"
              onClick={enviar}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

SeusDireitosChat.propTypes = {
  className: PropTypes.string,
};

export default SeusDireitosChat;
