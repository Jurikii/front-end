import PropTypes from "prop-types";
import styles from "./Document1.module.css";

const Document = ({ className = "", property1 = "Default" }) => {
  return (
    <div
      className={[styles.document, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.vectorIcon} alt="" src="/Vector5.svg" />
    </div>
  );
};

Document.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,
};

export default Document;
