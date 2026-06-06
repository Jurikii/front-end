import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./RecentDocumentsSection.module.css";

const DocumentoItem = ({ doc, menuAberto, onToggleMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onToggleMenu(null);
      }
    };
    if (menuAberto) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuAberto, onToggleMenu]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = doc.icone;
    link.download = doc.nome;
    link.click();
    onToggleMenu(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: doc.nome, text: `${doc.nome} - ${doc.pasta}` });
    } else {
      navigator.clipboard?.writeText(`${doc.nome} - ${doc.pasta}`);
    }
    onToggleMenu(null);
  };

  return (
    <div className={styles.documentoItem}>
      <div className={styles.documentoInfo}>
        <img className={styles.documentoIcone} alt="" src={doc.icone} />
        <div className={styles.documentoTexto}>
          <h3 className={styles.documentoNome}>{doc.nome}</h3>
          <span className={styles.documentoMeta}>
            {doc.pasta} • Enviado em {doc.data} • {doc.tamanho}
          </span>
        </div>
      </div>
      <div className={styles.menuWrapper} ref={menuRef}>
        <img className={styles.menuIcone} alt="Opções" src="/mingcute-more-2-fill.svg"
          onClick={(e) => { e.stopPropagation(); onToggleMenu(menuAberto ? null : doc.id); }} />
        {menuAberto && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem} onClick={handleDownload}>Baixar</div>
            <div className={styles.dropdownItem} onClick={handleShare}>Compartilhar</div>
          </div>
        )}
      </div>
    </div>
  );
};

DocumentoItem.propTypes = {
  doc: PropTypes.object.isRequired,
  menuAberto: PropTypes.bool,
  onToggleMenu: PropTypes.func,
};

const RecentDocumentsSection = ({ className = "", documentos = [], menuAberto, onToggleMenu }) => {
  const navigate = useNavigate();

  return (
    <section className={[styles.recentDocumentsSection, className].join(" ")}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Documentos recentes</h2>
        <div className={styles.verTodos} onClick={() => navigate("/documentos/mais")}>
          <span>Ver todos</span>
          <img className={styles.setinha} loading="lazy" alt="" src="/setinha-1.svg" />
        </div>
      </div>
      <div className={styles.listaDocumentos}>
        {documentos.map((doc) => (
          <DocumentoItem key={doc.id} doc={doc} menuAberto={menuAberto === doc.id} onToggleMenu={onToggleMenu} />
        ))}
      </div>
    </section>
  );
};

RecentDocumentsSection.propTypes = {
  className: PropTypes.string,
  documentos: PropTypes.array,
  menuAberto: PropTypes.any,
  onToggleMenu: PropTypes.func,
};

export default RecentDocumentsSection;
