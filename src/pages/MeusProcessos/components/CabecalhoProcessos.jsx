import PropTypes from "prop-types";
import { FILTROS } from "../data/processos";
import styles from "./CabecalhoProcessos.module.css";

const CabecalhoProcessos = ({ className = "", filtroAtivo = FILTROS[0].id, onFiltroChange, contagens = {} }) => {
  const handleFiltroClick = (filtroId) => {
    if (onFiltroChange) onFiltroChange(filtroId);
  };

  return (
    <section className={[styles.cabecalho, className].join(" ")}>
      <div className={styles.titulo}>
        <h1 className={styles.paginaTitulo}>Meus processos</h1>
        <h3 className={styles.paginaSubtitulo}>
          Acompanhe seus projetos e consultas.
        </h3>
      </div>

      <nav className={styles.filtros}>
        {FILTROS.map((filtro) => {
          const ativo = filtro.id === filtroAtivo;
          return (
            <button
              key={filtro.id}
              className={ativo ? styles.filtroAtivo : styles.filtro}
              onClick={() => handleFiltroClick(filtro.id)}
              aria-pressed={ativo}
            >
              <span className={styles.filtroLabel}>{filtro.label}</span>
              <span className={styles.filtroBadge}>{contagens[filtro.id] ?? 0}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
};

CabecalhoProcessos.propTypes = {
  className: PropTypes.string,
  filtroAtivo: PropTypes.string,
  onFiltroChange: PropTypes.func,
  contagens: PropTypes.objectOf(PropTypes.number),
};

export default CabecalhoProcessos;
