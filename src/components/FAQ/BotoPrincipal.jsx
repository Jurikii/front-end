import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./BotoPrincipal.module.css";

const BotoPrincipal = ({ className = "" }) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate("/cadastro");
  }, [navigate]);

  return (
    <div
      className={[styles.botoPrincipal, className].join(" ")}
      onClick={onClick}
    >
      <b className={styles.boto}>Criar Conta</b>
    </div>
  );
};

BotoPrincipal.propTypes = {
  className: PropTypes.string,
};

export default BotoPrincipal;
