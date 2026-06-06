import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./ProcessosEmAndamento1.module.css";

const ProcessosEmAndamento1 = ({
  className = "",
  onIAJurdicaTextClick,
  processosEmAndamentoAlignItems,
  processosEmAndamentoFlex,
  processosEmAndamentoMinWidth,
  mdiheartOutline,
  meusFavoritos,
  vejaSeusAdvogadosSalvos,
}) => {
  const processosEmAndamento1Style = useMemo(() => {
    return {
      alignItems: processosEmAndamentoAlignItems,
      flex: processosEmAndamentoFlex,
      minWidth: processosEmAndamentoMinWidth,
    };
  }, [
    processosEmAndamentoAlignItems,
    processosEmAndamentoFlex,
    processosEmAndamentoMinWidth,
  ]);

  return (
    <div
      className={[styles.processosEmAndamento, className].join(" ")}
      onClick={onIAJurdicaTextClick}
    >
      <div
        className={styles.processosEmAndamento2}
        style={processosEmAndamento1Style}
      >
        <img
          className={styles.mdiheartOutlineIcon}
          alt=""
          src={mdiheartOutline}
        />
        <div className={styles.processosEmAndamento3}>
          <h3 className={styles.meusFavoritos}>{meusFavoritos}</h3>
          <div className={styles.vejaSeusAdvogados}>
            {vejaSeusAdvogadosSalvos}
          </div>
        </div>
      </div>
      <img className={styles.setinha1} alt="" src="/setinha-1.svg" />
    </div>
  );
};

ProcessosEmAndamento1.propTypes = {
  className: PropTypes.string,
  mdiheartOutline: PropTypes.string,
  meusFavoritos: PropTypes.string,
  vejaSeusAdvogadosSalvos: PropTypes.string,

  /** Style props */
  processosEmAndamentoAlignItems: PropTypes.string,
  processosEmAndamentoFlex: PropTypes.string,
  processosEmAndamentoMinWidth: PropTypes.string,

  /** Action props */
  onIAJurdicaTextClick: PropTypes.func,
};

export default ProcessosEmAndamento1;
