import PropTypes from "prop-types";
import styles from "./BUSCA.module.css";

const BUSCA = ({ className = "" }) => {
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
            <div className={styles.buscarDocumento}>Buscar documento</div>
          </div>
          <img className={styles.lupaIcon} alt="" src="/lupa.svg" />
        </div>
        <div className={styles.buscar}>
          <div className={styles.buscar2}>Buscar</div>
        </div>
        <div className={styles.filtros}>
          <div className={styles.buscarDocumento}>Filtros</div>
          <img className={styles.filtroIcon} alt="" src="/filtro.svg" />
        </div>
      </div>
    </section>
  );
};

BUSCA.propTypes = {
  className: PropTypes.string,
};

export default BUSCA;
