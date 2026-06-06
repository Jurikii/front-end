import PropTypes from "prop-types";
import styles from "./House.module.css";

const House = ({ className = "", property1 = "azul" }) => {
  return (
    <div
      className={[styles.house, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.groupIcon} alt="" src="/Group3.svg" />
    </div>
  );
};

House.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,
};

export default House;
