import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Duvida1Chat.module.css";

const Duvida1Chat = ({
  className = "",
  property1 = "Default",
  text = "Fui demitido quais são  meus direitos?",
  duvida1ChatWidth,
  fuiDemitidoQuaisWidth,
  fuiDemitidoQuaisDisplay,
  fuiDemitidoQuaisFlex,
  iconeAzul,
  onClick,
}) => {
  const duvida1ChatStyle = useMemo(() => {
    return {
      width: duvida1ChatWidth,
    };
  }, [duvida1ChatWidth]);

  const fuiDemitidoQuaisStyle = useMemo(() => {
    return {
      width: fuiDemitidoQuaisWidth,
      display: fuiDemitidoQuaisDisplay,
      flex: fuiDemitidoQuaisFlex,
    };
  }, [fuiDemitidoQuaisWidth, fuiDemitidoQuaisDisplay, fuiDemitidoQuaisFlex]);

  return (
    <div
      className={[styles.duvida1Chat, className].join(" ")}
      data-property1={property1}
      style={duvida1ChatStyle}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(e); } }}
    >
      {iconeAzul}
      <div className={styles.fuiDemitidoQuais} style={fuiDemitidoQuaisStyle}>
        {text}
      </div>
      <img className={styles.setinha1} alt="" src="/setinha-1.svg" />
    </div>
  );
};

Duvida1Chat.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  iconeAzul: PropTypes.any,
  onClick: PropTypes.func,

  /** Variant props */
  property1: PropTypes.string,

  /** Style props */
  duvida1ChatWidth: PropTypes.string,
  fuiDemitidoQuaisWidth: PropTypes.string,
  fuiDemitidoQuaisDisplay: PropTypes.string,
  fuiDemitidoQuaisFlex: PropTypes.string,
};

export default Duvida1Chat;
