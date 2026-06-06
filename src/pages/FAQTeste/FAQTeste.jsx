import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InicioDvidas from "../../components/FAQ/InicioDvidas";
import FaqBody from "../../components/FAQ/FaqBody";
import Navbar from "../../components/Navbar";
import Rodap from "../../components/FAQ/Rodap";
import styles from "./FAQTeste.module.css";

const FAQTeste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const onSearchEmpty = useCallback((vazia) => {
    setModalAberto(vazia);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setSearchTerm("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const irParaChat = useCallback(() => {
    setModalAberto(false);
    navigate("/#chat-demo");
  }, [navigate]);

  return (
    <div className={styles.faqTeste}>
      <Navbar activeItem="FAQ" />
      <main className={styles.mainContent}>
        <InicioDvidas />
        <div className={styles.chat}>
          <div className={styles.lupaEDvida}>
            <img
              className={styles.cuidasearchOutlineIcon}
              loading="lazy"
              alt=""
              src="/cuida-search-outline.svg"
            />
            <input
              ref={inputRef}
              className={styles.searchInput}
              type="text"
              placeholder="Qual é a sua dúvida?"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className={styles.qualA}>Ex: plano, advogado, segurança...</span>
        </div>
        <FaqBody searchTerm={searchTerm} onSearchEmpty={onSearchEmpty} />

        {modalAberto && (
          <div className={styles.overlay} onClick={fecharModal}>
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.iconArea}>
                <img className={styles.iconSearch} alt="" src="/cuida-search-outline.svg" />
              </div>
              <h2 className={styles.modalTitle}>Não encontramos uma resposta</h2>
              <p className={styles.modalMsg}>
                Que tal perguntar diretamente para a nossa IA? Ela pode te ajudar com isso.
              </p>
              <div className={styles.botoes}>
                <button className={styles.btnCancelar} onClick={fecharModal}>
                  Cancelar
                </button>
                <button className={styles.btnConfirmar} onClick={irParaChat}>
                  Falar com a IA
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Rodap />
    </div>
  );
};

export default FAQTeste;
