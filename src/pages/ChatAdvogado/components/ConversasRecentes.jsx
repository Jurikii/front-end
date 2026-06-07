import PropTypes from "prop-types";
import styles from "./ConversasRecentes.module.css";

const ConversasRecentes = ({ className = "", titulo, selecionado = false, onClick }) => {
  return (
    <button
      className={`${styles.itemConversa} ${selecionado ? styles.itemSelecionado : ""} ${className}`}
      onClick={onClick}
    >
      <span className={styles.tituloConversa}>{titulo}</span>
    </button>
  );
};

ConversasRecentes.propTypes = {
  className: PropTypes.string,
  titulo: PropTypes.string.isRequired,
  selecionado: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ConversasRecentes;
