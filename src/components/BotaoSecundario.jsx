import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./BotaoSecundario.module.css";

const BotaoSecundario = ({ className = "" }) => {
  const onBotoSecundarioContainerClick = useCallback(() => {
    // Please sync "Pag - Login" to the project
  }, []);

  return (
    <div
      className={[styles.botoSecundario, className].join(" ")}
      onClick={onBotoSecundarioContainerClick}
    >
      <b className={styles.boto2}>Entrar</b>
    </div>
  );
};

BotaoSecundario.propTypes = {
  className: PropTypes.string,
};

export default BotaoSecundario;
