import PropTypes from "prop-types";
import styles from "./CartoAzul.module.css";

const CartoAzul = ({ className = "", property1 = "fechado" }) => {
  return (
    <div
      className={[styles.cartoAzul, className].join(" ")}
      data-property1={property1}
    >
      <img
        className={styles.ioncardOutlineIcon}
        loading="lazy"
        alt=""
        src="/ion-card-outline.svg"
      />
    </div>
  );
};

CartoAzul.propTypes = {
  className: PropTypes.string,
  property1: PropTypes.string,
};

export default CartoAzul;
