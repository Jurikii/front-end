import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ModalConfirm.module.css";

const ModalConfirm = ({
  aberto,
  titulo = "Sair da conta",
  mensagem = "Você realmente quer sair?",
  onConfirmar,
  onCancelar,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (aberto) {
      dialogRef.current?.focus();
    }
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onCancelar}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconArea}>
          <img
            className={styles.iconSair}
            alt=""
            src="/mdi-logout.svg"
          />
        </div>
        <h2 className={styles.titulo}>{titulo}</h2>
        <p className={styles.mensagem}>{mensagem}</p>
        <div className={styles.botoes}>
          <button className={styles.btnCancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button className={styles.btnConfirmar} onClick={onConfirmar}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

ModalConfirm.propTypes = {
  aberto: PropTypes.bool.isRequired,
  titulo: PropTypes.string,
  mensagem: PropTypes.string,
  onConfirmar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default ModalConfirm;
