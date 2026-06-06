import PropTypes from "prop-types";
import styles from "./Chat.module.css";

const Chat = ({ className = "", property1 = "azul" }) => {
  return (
    <div
      className={[styles.chat, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.vectorIcon} alt="" src="/Vector4.svg" />
    </div>
  );
};

Chat.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,
};

export default Chat;
