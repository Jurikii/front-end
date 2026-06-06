import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ProcessosEmAndamento.module.css";

const ProcessosEmAndamento = ({
  className = "",
  iconeBalana,
  iconeBalanaMaxHeight,
  iconeBalanaHeight,
  processosEmAndamentoHeight,
  processosEmAndamento,
  acompanhesSeusProcessosAtivos,
  prop,
}) => {
  const iconeBalanaStyle = useMemo(() => {
    return {
      maxHeight: iconeBalanaMaxHeight,
      height: iconeBalanaHeight,
    };
  }, [iconeBalanaMaxHeight, iconeBalanaHeight]);

  const processosEmAndamentoStyle = useMemo(() => {
    return {
      height: processosEmAndamentoHeight,
    };
  }, [processosEmAndamentoHeight]);

  const onVerTodosContainerClick = useCallback(() => {
    // TODO: navegar para "/processos"
  }, []);

  return (
    <div className={[styles.processosEmAndamento, className].join(" ")}>
      <div className={styles.processosEmAndamento2}>
        <img
          className={styles.iconeBalana}
          loading="lazy"
          alt=""
          src={iconeBalana}
          style={iconeBalanaStyle}
        />
        <div
          className={styles.processosEmAndamento3}
          style={processosEmAndamentoStyle}
        >
          <h3 className={styles.processosEmAndamento4}>
            {processosEmAndamento}
          </h3>
          <div className={styles.acompanhesSeusProcessos}>
            {acompanhesSeusProcessosAtivos}
          </div>
        </div>
      </div>
      <h2 className={styles.h2}>{prop}</h2>
      <div className={styles.verTodos} onClick={onVerTodosContainerClick}>
        <div className={styles.verTodos2}>Ver todos</div>
        <img className={styles.setinha1} alt="" src="/setinha-1.svg" />
      </div>
    </div>
  );
};

ProcessosEmAndamento.propTypes = {
  className: PropTypes.string,
  iconeBalana: PropTypes.string,
  processosEmAndamento: PropTypes.string,
  acompanhesSeusProcessosAtivos: PropTypes.string,
  prop: PropTypes.string,

  /** Style props */
  iconeBalanaMaxHeight: PropTypes.string,
  iconeBalanaHeight: PropTypes.string,
  processosEmAndamentoHeight: PropTypes.string,
};

export default ProcessosEmAndamento;
