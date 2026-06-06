import PropTypes from "prop-types";
import styles from "./Metricas.module.css";

const Metricas = ({ className = "" }) => {
  return (
    <section className={`${styles.metricas} ${className}`}>
      <div className={`${styles.item} ${styles.avaliacoesItem}`}>
        <h2 className={styles.valor}>128</h2>
        <h3 className={styles.rotulo}>Avaliações</h3>
      </div>
      <div className={styles.divisor} />
      <div className={`${styles.item} ${styles.itemCentral}`}>
        <h2 className={`${styles.valor} ${styles.valorRecomendacao}`}>98%</h2>
        <h3 className={`${styles.rotulo} ${styles.rotuloCentral}`}>Recomendações</h3>
      </div>
      <div className={styles.divisor} />
      <div className={`${styles.item} ${styles.itemCentral}`}>
        <h2 className={styles.valor}>8 anos</h2>
        <h3 className={`${styles.rotulo} ${styles.rotuloCentral}`}>Experiência</h3>
      </div>
      <div className={styles.divisor} />
      <div className={`${styles.item} ${styles.casosItem}`}>
        <h2 className={styles.valor}>+ 500</h2>
        <h3 className={styles.rotulo}>Casos concluídos</h3>
      </div>
    </section>
  );
};

Metricas.propTypes = {
  className: PropTypes.string,
};

export default Metricas;
