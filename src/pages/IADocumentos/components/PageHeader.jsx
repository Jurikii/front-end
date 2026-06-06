import PropTypes from "prop-types";
import styles from "./PageHeader.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";

// Dados dos botões de ação centralizados aqui — fácil de adicionar/remover
const BOTOES_ACAO = [
  { label: "Enviar documento", icone: "/upload.svg", variante: "amarelo" },
  { label: "Filtrar documentos", icone: "/filtro.svg", variante: "amarelo" },
  { label: "Criar pasta", icone: "/adicionar.svg", variante: "sereno" },
];

const BotaoAcao = ({ label, icone, variante, onClick }) => (
  <div className={`${styles.botaoAcao} ${styles[variante]}`} onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
    <span>{label}</span>
    <img src={icone} alt="" />
  </div>
);

BotaoAcao.propTypes = {
  label: PropTypes.string.isRequired,
  icone: PropTypes.string.isRequired,
  variante: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const PageHeader = ({ className = "", onFiltrar, onUpload, onCriarPasta }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [busca, setBusca] = useState("");

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload?.(file);
    }
    e.target.value = "";
  }, [onUpload]);

  return (
    <section className={[styles.pageHeader, className].join(" ")}>
      <div className={styles.linkVoltar} onClick={() => navigate(-1)}>
        <img
          className={styles.setinha}
          loading="lazy"
          alt="Voltar"
          src="/setinha-1.svg"
        />
        <span>Voltar</span>
      </div>

      <div className={styles.conteudo}>
        <div className={styles.titulos}>
          <h1 className={styles.titulo}>Meus documentos</h1>
          <p className={styles.subtitulo}>
            Organize e envie documentos para receber análises e orientações da
            Juriki IA
          </p>
        </div>

        <div className={styles.acoes}>
          <div className={styles.campoBusca}>
            <input
              className={styles.inputBusca}
              type="text"
              placeholder="Buscar documento"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <img
              className={styles.lupaIcone}
              alt="Buscar"
              src="/lupa.svg"
              style={{ cursor: "pointer" }}
              onClick={() => setBusca("")}
            />
          </div>

          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
          {BOTOES_ACAO.map((botao) => (
            <BotaoAcao key={botao.label} {...botao} onClick={botao.label === "Enviar documento" ? () => fileInputRef.current?.click() : botao.label === "Filtrar documentos" ? onFiltrar : botao.label === "Criar pasta" ? onCriarPasta : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
  onFiltrar: PropTypes.func,
  onUpload: PropTypes.func,
};

export default PageHeader;
