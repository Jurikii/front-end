import PropTypes from "prop-types";
import styles from "./TernoAmarelo.module.css";

const TernoAmarelo = ({ className = "", property1 = "fechado" }) => {
  return (
    <div
      className={[styles.ternoAmarelo, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.vectorIcon} alt="" src="/Vector8.svg" />
    </div>
  );
};

TernoAmarelo.propTypes = {
  className: PropTypes.string,
  property1: PropTypes.string,
};

export default TernoAmarelo;
