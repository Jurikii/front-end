import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Voltar.module.css";

const Voltar = ({ className = "", onCriarPasta, onFiltrarPastas }) => {
  const navigate = useNavigate();

  return (
    <section className={[styles.voltar, className].join(" ")}>
      <div className={styles.verTodos} onClick={() => navigate("/documentos")}>
        <img
          className={styles.setinha1}
          loading="lazy"
          alt=""
          src="/setinha-1.svg"
        />
        <div className={styles.buscarDocumento}>Voltar</div>
      </div>
      <div className={styles.inicioDocumentos}>
        <div className={styles.saudacaoDocumentos}>
          <div className={styles.cumprimentosHome}>
            <h1 className={styles.meusDocumentos}>Minhas pastas</h1>
            <h3 className={styles.organizeEEnvie}>
              Organize e envie documentos para receber análises e orientações da
              Juriki IA
            </h3>
          </div>
        </div>
      </div>
      <div className={styles.botesIniciais}>
        <div className={styles.menuDeBusca}>
          <div className={styles.pesquisar}>
            <div className={styles.buscarDocumento}>Buscar documento</div>
            <img className={styles.lupaIcon} alt="" src="/lupa.svg" />
          </div>
        </div>
        <div className={styles.enviarDocumento} onClick={onFiltrarPastas}>
          <div className={styles.buscarDocumento}>Filtrar pastas</div>
          <img className={styles.uploadIcon} alt="" src="/filtro.svg" />
        </div>
        <div className={styles.criarPasta} onClick={onCriarPasta}>
          <div className={styles.buscarDocumento}>Criar pasta</div>
          <img className={styles.uploadIcon} alt="" src="/adicionar.svg" />
        </div>
      </div>
    </section>
  );
};

Voltar.propTypes = {
  className: PropTypes.string,
  onCriarPasta: PropTypes.func,
  onFiltrarPastas: PropTypes.func,
};

export default Voltar;
