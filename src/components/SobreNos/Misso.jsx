import PropTypes from "prop-types";
import styles from "./Misso.module.css";

const Misso = ({
  className = "",
  missoPadding,
  mditargetArrow,
  mditargetArrowIconWidth,
  nossaMisso,
  contribuirComTecnologiasQue,
}) => {
  return (
    <div
      className={`${styles.misso} ${className}`}
      style={{ padding: missoPadding }}
    >
      <img
        className={styles.mditargetArrowIcon}
        loading="lazy"
        alt=""
        src={mditargetArrow}
        style={{ width: mditargetArrowIconWidth }}
      />
      <div className={styles.ttuloETexto}>
        <h2 className={styles.nossaMisso}>{nossaMisso}</h2>
        <p className={styles.contribuirComTecnologias}>
          {contribuirComTecnologiasQue}
        </p>
      </div>
    </div>
  );
};

Misso.propTypes = {
  className: PropTypes.string,
  mditargetArrow: PropTypes.string,
  nossaMisso: PropTypes.string,
  contribuirComTecnologiasQue: PropTypes.string,
  missoPadding: PropTypes.string,
  mditargetArrowIconWidth: PropTypes.string,
};

export default Misso;
