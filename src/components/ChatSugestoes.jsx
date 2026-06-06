import PropTypes from "prop-types";
import styles from "./ChatSugestoes.module.css";

const ChatSugestoes = ({ className = "", property1 = "Default", body }) => {
  return (
    <div
      className={[styles.chatSugestes, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.body}>{body}</div>
    </div>
  );
};

ChatSugestoes.propTypes = {
  className: PropTypes.string,
  body: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,
};

export default ChatSugestoes;
