import PropTypes from "prop-types";
import styles from "./BUSCA.module.css";

const BUSCA = ({
  className = "",
  searchQuery = "",
  onSearchChange,
}) => {
  return (
    <section className={[styles.busca, className].join(" ")}>
      <div className={styles.buscarAdvogado}>
        <h1 className={styles.buscarAdvogado2}>Buscar advogado</h1>
        <h3 className={styles.encontreOEspecialista}>
          Encontre o especialista ideal para o seu caso
        </h3>
      </div>
      <div className={styles.botesDeBusca}>
        <div className={styles.menuDeBusca}>
          <div className={styles.pesquisar}>
            <input
              className={styles.buscarDocumento}
              type="text"
              placeholder="Busque por nome ou área de atuação"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <img className={styles.lupaIcon} alt="" src="/lupa.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

BUSCA.propTypes = {
  className: PropTypes.string,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
};

export default BUSCA;
