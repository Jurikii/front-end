import PropTypes from "prop-types";
import styles from "./People.module.css";

const People = ({ className = "", property1 = "Default" }) => {
  return (
    <div
      className={[styles.people, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.vectorIcon} alt="" src="/Vector6.svg" />
    </div>
  );
};

People.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,
};

export default People;
