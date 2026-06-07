import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatSugestoes.module.css";
import { useAuthModal } from "../context/AuthModalContext";

const ChatSugestoes = ({ className = "", property1 = "Default", body }) => {
  const { openTipoModal } = useAuthModal();

  const handleClick = useCallback(() => {
    openTipoModal("login");
  }, [openTipoModal]);

  return (
    <div
      className={[styles.chatSugestes, className].join(" ")}
      data-property1={property1}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
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
