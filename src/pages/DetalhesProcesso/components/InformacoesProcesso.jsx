import PropTypes from "prop-types";
import styles from "./InformacoesProcesso.module.css";
import { CORES_CATEGORIA, STATUS, STATUS_STYLE } from "../../MeusProcessos/data/processos";

const InformacoesProcesso = ({ processo }) => {
  const cores = CORES_CATEGORIA[processo.categoria] ?? {
    fundo: "rgba(0,0,0,0.05)",
    texto: "#333",
  };

  const corStatus = STATUS_STYLE[processo.status] ?? STATUS_STYLE[STATUS.EM_ANDAMENTO];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Informações do processo</h2>
      <div className={styles.list}>
        <div className={styles.row}>
          <div className={styles.labelGroup}>
            <img className={styles.icon} alt="" src="/Icone-calendario-azul.svg" />
            <h3 className={styles.label}>Data de início</h3>
          </div>
          <h3 className={styles.value}>{processo.dataInicio}</h3>
        </div>
        <div className={styles.divider} />
        <div className={styles.rowSpaceBetween}>
          <div className={styles.labelGroup}>
            <img className={styles.icon} alt="" src="/tabler-map-pin.svg" />
            <h3 className={styles.label}>Vara</h3>
          </div>
          <span className={`${styles.value} ${styles.valueFixed}`}>{processo.vara}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <div className={styles.labelGroup}>
            <img className={styles.icon} alt="" src="/Icone-Balanca-azul.svg" />
            <h3 className={styles.label}>Situação atual</h3>
          </div>
          <h3 className={`${styles.value} ${styles.statusValue}`} style={{ color: corStatus.text }}>{processo.status}</h3>
        </div>
        <div className={styles.divider} />
        <div className={styles.rowWrap}>
          <div className={styles.labelGroupLast}>
            <img
              className={styles.iconLast}
              alt=""
              src="/material-symbols-light-timer-arrow-up-outline.svg"
            />
            <h3 className={styles.label}>Última atualização</h3>
          </div>
          <h3 className={styles.value}>{processo.atualizadoEm}</h3>
        </div>
      </div>
    </section>
  );
};

InformacoesProcesso.propTypes = {
  processo: PropTypes.shape({
    categoria: PropTypes.string.isRequired,
    dataInicio: PropTypes.string.isRequired,
    vara: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    atualizadoEm: PropTypes.string.isRequired,
  }).isRequired,
};

export default InformacoesProcesso;
