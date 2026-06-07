import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./LinhaDeDias.module.css";

const TAMANHO_BASE_BOLINHA = 8;
const TAMANHO_POR_CONSULTA = 3;

function calcularTamanhoBolinha(qtd) {
  return TAMANHO_BASE_BOLINHA + (qtd - 1) * TAMANHO_POR_CONSULTA;
}

const LinhaDeDias = ({ dias = [], diaDestaque = -1, diasForaDoMes = [], qtdConsultas = [], dadosConsultas = [], modoRetangulo = false, onBolinhaEnter, onBolinhaLeave, className = "" }) => {
  const estiloDestaque = useMemo(
    () => ({ color: "var(--azul-escuro)" }),
    []
  );

  const estiloMesAtual = useMemo(
    () => ({ color: "var(--preto)" }),
    []
  );

  const handleMouseEnter = useCallback(
    (dia) => (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      onBolinhaEnter?.(Number(dia), {
        left: rect.right + 8,
        top: rect.top,
      }, el);
    },
    [onBolinhaEnter]
  );

  const handleMouseLeave = useCallback(
    () => onBolinhaLeave?.(),
    [onBolinhaLeave]
  );

  return (
    <section className={[styles.linhaDeDias, className].join(" ")}>
      {dias.map((dia, index) => {
        const consultas = dadosConsultas[index] || [];
        return (
          <div key={index} className={styles.celulaOuter}>
            <div
              className={styles.celulaInner}
              style={
                index === diaDestaque
                  ? estiloDestaque
                  : diasForaDoMes[index]
                  ? undefined
                  : estiloMesAtual
              }
            >
              {dia}
              {qtdConsultas[index] > 0 && (() => {
                const tamanho = calcularTamanhoBolinha(qtdConsultas[index]);
                return (
                  <span
                    className={`${styles.bolinha} ${modoRetangulo ? styles.bolinhaHidden : ""}`}
                    style={{ width: tamanho, height: tamanho }}
                    onMouseEnter={handleMouseEnter(dia)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })()}
              {consultas.length > 0 && (
                <div className={`${styles.retangulosLista} ${modoRetangulo ? styles.retangulosListaVisible : ""}`}>
                  {consultas.slice(0, 3).map((c, ci) => (
                    <span
                      key={ci}
                      className={styles.retangulo}
                      onMouseEnter={handleMouseEnter(dia)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span className={styles.retanguloHorario}>{c.horario}</span>
                      <span className={styles.retanguloNome}>{c.nomeCliente}</span>
                    </span>
                  ))}
                  {consultas.length > 3 && (
                    <span className={styles.retanguloMais}>+{consultas.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

LinhaDeDias.propTypes = {
  dias: PropTypes.arrayOf(PropTypes.string).isRequired,
  diaDestaque: PropTypes.number,
  diasForaDoMes: PropTypes.arrayOf(PropTypes.bool),
  qtdConsultas: PropTypes.arrayOf(PropTypes.number),
  dadosConsultas: PropTypes.arrayOf(PropTypes.array),
  modoRetangulo: PropTypes.bool,
  onBolinhaEnter: PropTypes.func,
  onBolinhaLeave: PropTypes.func,
  className: PropTypes.string,
};

export default LinhaDeDias;
