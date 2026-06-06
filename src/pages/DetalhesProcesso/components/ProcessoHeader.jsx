import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ProcessoHeader.module.css";

const ProcessoHeader = ({ onVoltar }) => {
  const handleBackClick = useCallback(() => {
    onVoltar?.();
  }, [onVoltar]);

  return (
    <section className={styles.header}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <img
          className={styles.backIcon}
          loading="lazy"
          alt=""
          src="/pepicons-pencil-arrow-up.svg"
        />
        <span className={styles.backText}>Voltar para meus processos</span>
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Detalhes do processo</h1>
      </div>
    </section>
  );
};

ProcessoHeader.propTypes = {
  onVoltar: PropTypes.func,
};

export default ProcessoHeader;
