import PropTypes from "prop-types";
import styles from "./BotoSecundario.module.css";

const BotoSecundario = ({ className = "" }) => {
  return (
    <div className={`${styles.botoSecundario} ${className}`}>
      <b className={styles.boto2}>Entrar</b>
    </div>
  );
};

BotoSecundario.propTypes = {
  className: PropTypes.string,
};

export default BotoSecundario;
