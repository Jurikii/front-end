import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./ProcessoCard.module.css";
import { CORES_CATEGORIA } from "../../MeusProcessos/data/processos";

const ProcessoCard = ({ processo }) => {
  const navigate = useNavigate();
  const cores = CORES_CATEGORIA[processo.categoria] ?? {
    fundo: "rgba(0,0,0,0.05)",
    texto: "#333",
  };

  return (
    <section className={styles.card}>
      <div className={styles.contentWrapper}>
        <div className={styles.tags}>
          <h2 className={styles.tagTitle}>{processo.titulo}</h2>
          <div
            className={styles.tagBadge}
            style={{ backgroundColor: cores.fundo, color: cores.texto }}
          >
            <h2 className={styles.tagTitle}>{processo.categoria}</h2>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoCenter}>
            <div className={styles.infoColumn}>
              <h3 className={styles.processoNumero}>
                Processo nº {processo.numeroProcesso}
              </h3>
              <div className={styles.advogadoRow}>
                <p className={styles.infoText}>Advogada: {processo.advogado}</p>
                <button
                  className={styles.trocarBtn}
                  onClick={() => navigate("/trocar-advogado")}
                  title="Trocar de advogado"
                >
                  <img
                    className={styles.trocarIcon}
                    alt=""
                    src="/mdi-light-pencil.svg"
                  />
                  <span>Trocar</span>
                </button>
              </div>
              <p className={styles.infoText}>Atualizado em {processo.atualizadoEm}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statusBadge}>
        <h3 className={styles.statusText}>{processo.status}</h3>
      </div>
    </section>
  );
};

ProcessoCard.propTypes = {
  processo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    numeroProcesso: PropTypes.string.isRequired,
    advogado: PropTypes.string.isRequired,
    atualizadoEm: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProcessoCard;
