import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { sugestoesChat } from "../data/advogados";
import ChatSugestoes from "./ChatSugestoes";
import PropTypes from "prop-types";
import styles from "./SeusDireitosChat.module.css";

const SeusDireitosChat = ({ className = "" }) => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const enviar = useCallback(() => {
    if (!mensagem.trim()) return;
    navigate("/login");
  }, [mensagem, navigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") enviar();
    },
    [enviar]
  );

  return (
    <section className={[styles.seusDireitosChat, className].join(" ")}>
      <h1 className={styles.seusDireitosExplicadosContainer}>
        <span>
          <span>{`Seus `}</span>
          <span className={styles.direitos}>direitos</span>
          <span> explicados em segundos.</span>
        </span>
      </h1>
      <div className={styles.nossaIaTraduz}>
        Nossa IA traduz leis, analisa casos e mostra seus próximos passos com
        clareza.
      </div>
      <section className={styles.sugestesDePerguntas}>
        {sugestoesChat.map((item, index) => (
          <ChatSugestoes
            key={index}
            property1={item.property1}
            body={item.body}
          />
        ))}
      </section>
      <div className={styles.chat}>
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
  );
};

SeusDireitosChat.propTypes = {
  className: PropTypes.string,
};

export default SeusDireitosChat;
