import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./BotoPrincipal.module.css";
import { useAuthModal } from "../../context/AuthModalContext";

const BotoPrincipal = ({ className = "" }) => {
  const { openTipoModal } = useAuthModal();

  const onClick = useCallback(() => {
    openTipoModal("cadastro");
  }, [openTipoModal]);

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
