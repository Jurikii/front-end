import PropTypes from "prop-types";
import styles from "./CardConsulta.module.css";

/**
 * Card que exibe o resumo de uma consulta agendada.
 */
const CardConsulta = ({ nomeCliente, assunto, horario }) => (
  <div className={styles.card}>
    <div className={styles.info}>
      <div className={styles.clienteBloco}>
        <img
          className={styles.bolinhaIcone}
          loading="lazy"
          alt=""
          src="/Frame-2147224473.svg"
        />
        <div className={styles.clienteTexto}>
          <span className={styles.nomeCliente}>{nomeCliente}</span>
          <span className={styles.assunto}>{assunto}</span>
        </div>
      </div>
      <div className={styles.horario}>
        <img className={styles.iconeRelogio} alt="" src="/Vector7.svg" />
        <span>{horario}</span>
      </div>
    </div>
  </div>
);

CardConsulta.propTypes = {
  nomeCliente: PropTypes.string.isRequired,
  assunto: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
};

export default CardConsulta;
