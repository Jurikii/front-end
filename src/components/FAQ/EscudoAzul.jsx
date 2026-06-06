import PropTypes from "prop-types";
import styles from "./EscudoAzul.module.css";

const EscudoAzul = ({ className = "", property1 = "fechado" }) => {
  return (
    <div
      className={[styles.escudoAzul, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.groupIcon} alt="" src="/Group4.svg" />
    </div>
  );
};

EscudoAzul.propTypes = {
  className: PropTypes.string,
  property1: PropTypes.string,
};

export default EscudoAzul;
