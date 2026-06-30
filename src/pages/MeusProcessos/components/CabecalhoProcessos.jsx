import PropTypes from "prop-types";
import { FILTROS, PROCESSOS, STATUS } from "../data/processos";
import styles from "./CabecalhoProcessos.module.css";

/**
 * Cabeçalho da página Meus Processos — substitui Grupo.
 *
 * Mudanças:
 * - Nome semântico: CabecalhoProcessos em vez de Grupo.
 * - Abas geradas a partir de FILTROS (data/processos.js), sem markup repetido.
 * - Estado de aba ativa gerenciado pelo componente pai (filtroAtivo + onFiltroChange).
 * - Contagem exibida como badge em todas as abas.
 */
const CabecalhoProcessos = ({ className = "", filtroAtivo = FILTROS[0].id, onFiltroChange }) => {
  const handleFiltroClick = (filtroId) => {
    if (onFiltroChange) onFiltroChange(filtroId);
  };

  return (
    <section className={[styles.cabecalho, className].join(" ")}>
      {/* Título e subtítulo */}
      <div className={styles.titulo}>
        <h1 className={styles.paginaTitulo}>Meus processos</h1>
        <h3 className={styles.paginaSubtitulo}>
          Acompanhe seus projetos e consultas.
        </h3>
      </div>

      {/* Abas de filtro */}
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
              <span className={styles.filtroBadge}>{filtro.contagem}</span>
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
};

export default CabecalhoProcessos;
