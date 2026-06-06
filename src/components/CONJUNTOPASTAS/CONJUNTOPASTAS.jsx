import PropTypes from "prop-types";
import styles from "./CONJUNTOPASTAS.module.css";

const CONJUNTOPASTAS = ({ className = "" }) => {
  return (
    <div className={[styles.conjuntoPastas, className].join(" ")}>
      <div className={styles.consumidorWrapper}>
        <div className={styles.consumidor}>
          <div className={styles.consumidorChild} />
          <div className={styles.textoPasta}>
            <h3
              className={styles.nomeDoDocumento}
            >{`      Nome do documento `}</h3>
          </div>
          <img
            className={styles.fluentarrowFit16RegularIcon}
            alt=""
            src="/fluent-arrow-fit-16-regular.svg"
          />
        </div>
      </div>
      <div className={styles.textoPasta2} />
      <div className={styles.categoriasParent}>
        <h3 className={styles.categorias}>Categorias</h3>
        <img
          className={styles.fluentarrowFit16RegularIcon}
          alt=""
          src="/fluent-arrow-fit-16-regular.svg"
        />
      </div>
      <div className={styles.categoriasParent}>
        <div className={styles.textoPasta3}>
          <h3 className={styles.categorias}>Enviado em</h3>
        </div>
        <img
          className={styles.fluentarrowFit16RegularIcon}
          alt=""
          src="/fluent-arrow-fit-16-regular.svg"
        />
      </div>
      <div className={styles.categoriasParent}>
        <div className={styles.textoPasta3}>
          <h3 className={styles.categorias}>Tamanho</h3>
        </div>
        <img
          className={styles.fluentarrowFit16RegularIcon}
          alt=""
          src="/fluent-arrow-fit-16-regular.svg"
        />
      </div>
    </div>
  );
};

CONJUNTOPASTAS.propTypes = {
  className: PropTypes.string,
};

export default CONJUNTOPASTAS;
