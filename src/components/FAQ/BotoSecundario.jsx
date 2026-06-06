import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./BotoSecundario.module.css";

const BotoSecundario = ({ className = "" }) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

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
