import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./BotoSecundario.module.css";
import { useAuthModal } from "../../context/AuthModalContext";

const BotoSecundario = ({ className = "" }) => {
  const { openTipoModal } = useAuthModal();

  const onClick = useCallback(() => {
    openTipoModal("login");
  }, [openTipoModal]);

  return (
    <div
      className={[styles.botoSecundario, className].join(" ")}
      onClick={onClick}
    >
      <b className={styles.boto2}>Entrar</b>
    </div>
  );
};

BotoSecundario.propTypes = {
  className: PropTypes.string,
};

export default BotoSecundario;
