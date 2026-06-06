import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./BotaoAgendar.module.css";

const BotaoAgendar = ({
  className = "",
  property1 = "Default",
  agendarMargin,
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const agendarStyle = useMemo(() => {
    return {
      margin: agendarMargin,
    };
  }, [agendarMargin]);

  return (
    <div
      className={[styles.botoAgendar, className].join(" ")}
      data-property1={property1}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.agendar} style={agendarStyle}>
        Agendar
      </div>
    </div>
  );
};

BotaoAgendar.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,

  /** Style props */
  agendarMargin: PropTypes.string,
};

export default BotaoAgendar;
