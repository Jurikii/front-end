import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Avaliacao.module.css";

const Avaliacao = ({
  className = "",
  property1 = "Avaliação 2 - v1",
  avaliaoWidth,
  ellipse8,
  roseA,
  texto,
}) => {
  const avaliaoStyle = useMemo(() => {
    return {
      maxWidth: avaliaoWidth,
    };
  }, [avaliaoWidth]);

  return (
    <div
      className={[styles.root, className].join(" ")}
      data-property1={property1}
      style={avaliaoStyle}
    >
      <div className={styles.atendimentoHumanoEContainer}>
        <span>
          <span>“</span>
          <span className={styles.clarezaNasExplicaes}>
            {texto}
          </span>
          <span>”</span>
        </span>
      </div>
      <img
        className={styles.avaliaoChild}
        loading="lazy"
        alt=""
        src={ellipse8}
      />
      <h3 className={styles.roseA}>{roseA}</h3>
      <img className={styles.avaliaoItem} alt="" src="/Group-75.svg" />
    </div>
  );
};

Avaliacao.propTypes = {
  className: PropTypes.string,
  ellipse8: PropTypes.string,
  roseA: PropTypes.string,
  texto: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,

  /** Style props */
  avaliaoWidth: PropTypes.string,
};

export default Avaliacao;
