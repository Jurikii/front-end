import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ChatSugestoes.module.css";

const ChatSugestoes = ({ className = "", property1 = "Default", body }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

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
