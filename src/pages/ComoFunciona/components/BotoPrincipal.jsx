import { useCallback } from "react";
import styles from "./BotoPrincipal.module.css";

const BotoPrincipal = ({ className = "" }) => {
  const onBotoPrincipalClick = useCallback(() => {}, []);

  return (
    <button
      className={[styles.botoPrincipal, className].join(" ")}
      onClick={onBotoPrincipalClick}
    >
      <b className={styles.boto}>Criar Conta</b>
    </button>
  );
};

export default BotoPrincipal;
