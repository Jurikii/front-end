import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Voltar.module.css";

const Voltar = ({ className = "", pasta = "Trabalhista", count = "5", onFiltrar, onUpload, onCriarPasta }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const onVerTodosContainerClick = useCallback(() => {
    navigate("/documentos/mais");
  }, [navigate]);

  const onCriarPastaContainerClick = useCallback(() => {
    onCriarPasta?.();
  }, [onCriarPasta]);

  const handleEnviar = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload?.(file);
    }
    e.target.value = "";
  }, [onUpload]);

  return (
    <section className={[styles.voltar, className].join(" ")}>
      <div className={styles.verTodos} onClick={() => navigate("/documentos")}>
        <img className={styles.setinha1} alt="" src="/setinha-1.svg" />
        <div
          className={styles.voltarMeus}
        >{`Voltar    > Meus documentos   > ${pasta} `}</div>
      </div>
      <div className={styles.inicioDocumentos}>
        <div className={styles.pasta1}>
          <img
            className={styles.folderIcon}
            loading="lazy"
            alt=""
            src="/Folder2@2x.png"
          />
          <div className={styles.trabalhista}>
            <h1 className={styles.trabalhista2}>{pasta}</h1>
            <div className={styles.documentos}>{count} documentos</div>
          </div>
        </div>
        <div className={styles.saudacaoDocumentos}>
          <div className={styles.cumprimentosHome}>
            <h3 className={styles.documentosRelacionatos}>
              Documentos relacionatos á área {pasta.toLowerCase()} enviados por você
            </h3>
          </div>
        </div>
        <div className={styles.botesIniciais}>
          <div className={styles.menuDeBusca}>
            <div className={styles.pesquisar}>
              <div className={styles.buscarDocumento}>Buscar documento</div>
              <img className={styles.lupaIcon} alt="" src="/lupa.svg" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
          <div className={styles.enviarDocumento} onClick={handleEnviar} style={{ cursor: "pointer" }}>
            <div className={styles.buscarDocumento}>Enviar documento</div>
            <img className={styles.uploadIcon} alt="" src="/upload.svg" />
          </div>
          <div className={styles.enviarDocumento} onClick={onFiltrar} style={{ cursor: "pointer" }}>
            <div className={styles.buscarDocumento}>Filtrar documentos</div>
            <img className={styles.uploadIcon} alt="" src="/filtro.svg" />
          </div>
          <div
            className={styles.criarPasta}
            onClick={onCriarPastaContainerClick}
          >
            <div className={styles.buscarDocumento}>Criar pasta</div>
            <img className={styles.uploadIcon} alt="" src="/adicionar.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

Voltar.propTypes = {
  className: PropTypes.string,
  pasta: PropTypes.string,
  count: PropTypes.string,
  onFiltrar: PropTypes.func,
  onUpload: PropTypes.func,
  onCriarPasta: PropTypes.func,
};

export default Voltar;
