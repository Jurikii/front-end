import { useCallback } from "react";
import styles from "./BotoSecundario.module.css";
import { useAuthModal } from "../../../context/AuthModalContext";

const BotoSecundario = ({ className = "" }) => {
  const { openTipoModal } = useAuthModal();

  const onBotoSecundarioClick = useCallback(() => {
    openTipoModal("login");
  }, [openTipoModal]);

  return (
    <button
      className={[styles.botoSecundario, className].join(" ")}
      onClick={onBotoSecundarioClick}
    >
      <b className={styles.boto2}>Entrar</b>
    </button>
  );
};

export default BotoSecundario;
