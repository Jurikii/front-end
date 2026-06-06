import PropTypes from "prop-types";
import styles from "./P.module.css";

const P = ({
  className = "",
  p1Padding,
  imagemBalo,
  tireDvidasJurdicasComNossa,
  ttulo = "Você pergunta",
  numero = 1,
}) => {
  return (
    <div
      className={`${styles.p1} ${className}`}
      style={{ padding: p1Padding }}
    >
      <img
        className={styles.imagemBaloIcon}
        loading="lazy"
        alt=""
        src={imagemBalo}
      />
      <h3 className={styles.vocPergunta}>
        <ol className={styles.vocPergunta2}>
          <li value={numero}>{ttulo}</li>
        </ol>
      </h3>
      <p className={styles.tireDvidasJurdicas}>
        {tireDvidasJurdicasComNossa}
      </p>
    </div>
  );
};

P.propTypes = {
  className: PropTypes.string,
  p1Padding: PropTypes.string,
  imagemBalo: PropTypes.string,
  tireDvidasJurdicasComNossa: PropTypes.string,
  ttulo: PropTypes.string,
  numero: PropTypes.number,
};

export default P;
