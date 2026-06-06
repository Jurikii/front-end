import PropTypes from "prop-types";
import styles from "./ConversasRecentes.module.css";

const ConversasRecentes = ({ className = "", titulo = "Nova conversa", selecionado = false, onClick }) => {
  return (
    <div
      className={`${styles.itemConversa} ${selecionado ? styles.selecionado : ""} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img className={styles.iconItem} alt="Ícone de chat" src="/Vector5.svg" />
      <span className={styles.tituloConversa}>{titulo}</span>
    </div>
  );
};

ConversasRecentes.propTypes = {
  className: PropTypes.string,
  titulo: PropTypes.string,
  selecionado: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ConversasRecentes;