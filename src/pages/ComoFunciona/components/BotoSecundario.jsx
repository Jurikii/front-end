import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BotoSecundario.module.css";

const BotoSecundario = ({ className = "" }) => {
  const navigate = useNavigate();

  const onBotoSecundarioClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

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
