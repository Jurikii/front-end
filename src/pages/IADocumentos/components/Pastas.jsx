import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Pastas.module.css";

const PastaCard = ({ nome, documentos, onClick }) => (
  <div className={styles.pastaCard} onClick={onClick}>
    <img
      className={styles.folderIcone}
      loading="lazy"
      alt=""
      src="/Folder@2x.png"
    />
    <div className={styles.pastaTexto}>
      <h3 className={styles.pastaNome}>{nome}</h3>
      <span className={styles.pastaContagem}>{documentos} documentos</span>
    </div>
  </div>
);

PastaCard.propTypes = {
  nome:       PropTypes.string.isRequired,
  documentos: PropTypes.number.isRequired,
  onClick:    PropTypes.func,
};

const Pastas = ({ className = "", pastas = [] }) => {
  const navigate = useNavigate();
  const onVerTodosClick = useCallback(() => {
    navigate("/documentos/mais");
  }, [navigate]);
  const onPastaClick = useCallback((nome, documentos) => {
    navigate("/documentos/trabalhista", { state: { pasta: nome, count: documentos } });
  }, [navigate]);
  return (
  <section className={[styles.pastas, className].join(" ")}>
    <div className={styles.cabecalho}>
      <h2 className={styles.titulo}>Pastas</h2>
      <div className={styles.verTodos} onClick={onVerTodosClick}>
        <span>Ver todos</span>
        <img
          className={styles.setinha}
          loading="lazy"
          alt=""
          src="/setinha-1.svg"
        />
      </div>
    </div>

    <div className={styles.listaPastas}>
      {pastas.map((pasta) => (
        <PastaCard key={pasta.nome} {...pasta} onClick={() => onPastaClick(pasta.nome, pasta.documentos)} />
      ))}
    </div>
  </section>
  );
};

Pastas.propTypes = {
  className: PropTypes.string,
  pastas: PropTypes.arrayOf(PropTypes.shape({
    nome: PropTypes.string,
    documentos: PropTypes.number,
  })),
};

export default Pastas;
