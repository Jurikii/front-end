import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./TrocarDeAdvogado1.module.css";

const TrocarDeAdvogado1 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onVoltar = useCallback(() => {
    navigate("/processos");
  }, [navigate]);

  return (
    <section className={[styles.trocarDeAdvogado, className].join(" ")}>
      <div className={styles.trocarDeAdvogado2}>
        <div className={styles.voltarParaMeusProcessos} onClick={onVoltar}>
          <img
            className={styles.pepiconsPencilarrowUp}
            loading="lazy"
            alt=""
            src="/pepicons-pencil-arrow-up.svg"
          />
          <div className={styles.voltarParaMeus}>
            Voltar para meus processos
          </div>
        </div>
        <div className={styles.cumprimentosHome}>
          <h1 className={styles.trocarDeAdvogado3}>Trocar de advogado</h1>
        </div>
      </div>
      <section className={styles.processoSelecionado}>
        <h2 className={styles.processoSelecionado2}>Processo selecionado</h2>
        <div className={styles.casoCompleto3}>
          <div className={styles.caso1}>
            <div className={styles.trabalhista}>
              <div className={styles.trabalhista2}>
                <h2 className={styles.trabalhista3}>Trabalhista</h2>
              </div>
              <h2 className={styles.rescisoIndireta}>Rescisão indireta</h2>
            </div>
            <div className={styles.informes}>
              <div className={styles.emAndamento}>
                <div className={styles.informes2}>
                  <h3 className={styles.advogadaDraBeatriz}>
                    Processo nº 0001234-56.2024.5.02.0001
                  </h3>
                  <h3 className={styles.advogadaDraBeatriz}>
                    Advogada: Dra. Beatriz Oliveira
                  </h3>
                  <h3 className={styles.advogadaDraBeatriz}>
                    Atualizado em 10/05/2026
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

TrocarDeAdvogado1.propTypes = {
  className: PropTypes.string,
};

export default TrocarDeAdvogado1;
