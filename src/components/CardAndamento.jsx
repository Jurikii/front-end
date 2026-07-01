import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CardAndamento.module.css";

const DATA_SEPARATOR = "  ·  ";

const CardAndamento = ({
  className = "",
  index,
  dataHora,
  titulo,
  descricao,
  onMenuClick,
  onSave,
  onDelete,
  onEditEnd,
  autoEdit,
}) => {
  const [isEditing, setIsEditing] = useState(autoEdit || false);
  const [isExiting, setIsExiting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const parts = dataHora.split(DATA_SEPARATOR);
  const toDateInput = (d) => {
    const [dd, mm, yyyy] = d.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };
  const fromDateInput = (v) => {
    const [yyyy, mm, dd] = v.split("-");
    return `${dd}/${mm}/${yyyy}`;
  };

  const [editDate, setEditDate] = useState(toDateInput(parts[0] || ""));
  const [editTime, setEditTime] = useState(parts[1] || "");
  const [editTitle, setEditTitle] = useState(titulo);
  const [editDesc, setEditDesc] = useState(descricao);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleStartEdit = () => {
    const p = dataHora.split(DATA_SEPARATOR);
    setEditDate(toDateInput(p[0] || ""));
    setEditTime(p[1] || "");
    setEditTitle(titulo);
    setEditDesc(descricao);
    setIsEditing(true);
    setMenuOpen(false);
  };

  const startExiting = (callback) => {
    setIsExiting(true);
    setTimeout(() => {
      callback();
      setIsExiting(false);
    }, 250);
  };

  const handleCancel = () => {
    startExiting(() => {
      if (autoEdit) onDelete?.(index);
      setIsEditing(false);
      onEditEnd?.();
    });
  };

  const handleSave = () => {
    startExiting(() => {
      const updated = {
        dataHora: `${fromDateInput(editDate)}${DATA_SEPARATOR}${editTime}`,
        titulo: editTitle,
        descricao: editDesc,
      };
      onSave?.(index, updated);
      setIsEditing(false);
      onEditEnd?.();
    });
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };

  return (
    <div className={[styles.cardAndamento, className].join(" ")}>
      {(isEditing || isExiting) ? (
        <div className={`${styles.editContent} ${isExiting ? styles.editandoSaindo : styles.editando}`}>
          <div className={styles.editRow}>
            <input
              className={styles.editInput}
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <span className={styles.editSeparador}>·</span>
            <input
              className={styles.editInputSmall}
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />
          </div>
          <input
            className={styles.editInputFull}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título"
          />
          <textarea
            className={styles.editTextarea}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Descrição"
            rows={3}
          />
          <div className={styles.editAcoes}>
            <button className={styles.editCancelar} onClick={handleCancel}>
              Cancelar
            </button>
            <button className={styles.editSalvar} onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.viewContent}>
          <div className={styles.cabecalho}>
            <time className={styles.dataHora}>{dataHora}</time>
            <div className={styles.menuWrapper} ref={menuRef}>
              <button className={styles.botaoMenu} onClick={handleMenuToggle}>
                <img
                  className={styles.iconeMenu}
                  alt="Mais opções"
                  src="/majesticons-more-menu.svg"
                />
              </button>
              {menuOpen && (
                <div className={styles.menuDropdown}>
                  <button
                    className={styles.menuItem}
                    onClick={handleStartEdit}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.menuItemExcluir}
                    onClick={() => {
                      onDelete?.(index);
                      setMenuOpen(false);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.tituloBotoes}>
            <span className={styles.titulo}>{titulo}</span>
          </div>

          <p className={styles.descricao}>{descricao}</p>
        </div>
      )}
    </div>
  );
};

CardAndamento.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  dataHora: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onEditEnd: PropTypes.func,
  autoEdit: PropTypes.bool,
};

export default CardAndamento;
