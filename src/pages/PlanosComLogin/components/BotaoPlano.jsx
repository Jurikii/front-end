import PropTypes from "prop-types";
import styles from "./BotaoPlano.module.css";

/**
 * Botão de ação dos cards de plano.
 * - variante "assinar": borda escura, para planos individuais
 * - variante "vendas": fundo escuro, para planos enterprise
 */
const BotaoPlano = ({ variante = "assinar", onClick, className = "" }) => {
  const labels = {
    assinar: "Assinar plano",
    vendas: "Falar com vendas",
    adquirido: "Plano adquirido",
  };
  const label = labels[variante] || "Assinar plano";

  return (
    <button
      className={[styles.botao, styles[variante], className].join(" ")}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

BotaoPlano.propTypes = {
  variante: PropTypes.oneOf(["assinar", "vendas", "adquirido"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BotaoPlano;
