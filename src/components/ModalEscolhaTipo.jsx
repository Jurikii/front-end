import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";
import styles from "./ModalEscolhaTipo.module.css";

const opcoes = {
  login: {
    title: "Como você deseja continuar?",
    subtitle: "Escolha o tipo de acesso para fazer login.",
    pessoa: { label: "Pessoa Física", desc: "Acesso para clientes", icon: "/user.svg", route: "/login/cliente" },
    advogado: { label: "Advogado", desc: "Acesso para profissionais", icon: "/boxicons-law.svg", route: "/login/advogado" },
  },
  cadastro: {
    title: "Como você deseja se cadastrar?",
    subtitle: "Escolha o tipo de conta que deseja criar.",
    pessoa: { label: "Pessoa Física", desc: "Conta para clientes", icon: "/user.svg", route: "/cadastro/cliente" },
    advogado: { label: "Advogado", desc: "Conta para profissionais", icon: "/boxicons-law.svg", route: "/cadastro/advogado" },
  },
};

const ModalEscolhaTipo = () => {
  const { modalState, closeTipoModal } = useAuthModal();
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const { open, tipo } = modalState;
  const config = opcoes[tipo] || opcoes.login;

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleChoice = (route) => {
    closeTipoModal();
    navigate(route);
  };

  const handleKeyDown = (e, route) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleChoice(route);
    }
  };

  return (
    <div className={styles.overlay} onClick={closeTipoModal}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={closeTipoModal} aria-label="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.header}>
          <img className={styles.logoIcon} alt="" src="/Logo-juriki-girassol-completo-2@2x.png" />
          <h2 className={styles.title}>{config.title}</h2>
          <p className={styles.subtitle}>{config.subtitle}</p>
        </div>

        <div className={styles.options}>
          <div
            className={styles.optionCard}
            onClick={() => handleChoice(config.pessoa.route)}
            onKeyDown={(e) => handleKeyDown(e, config.pessoa.route)}
            tabIndex={0}
            role="button"
            aria-label={config.pessoa.label}
          >
            <div className={styles.iconWrapper}>
              <img className={styles.optionIcon} alt="" src={config.pessoa.icon} />
            </div>
            <div className={styles.optionText}>
              <span className={styles.optionLabel}>{config.pessoa.label}</span>
              <span className={styles.optionDesc}>{config.pessoa.desc}</span>
            </div>
            <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div
            className={styles.optionCard}
            onClick={() => handleChoice(config.advogado.route)}
            onKeyDown={(e) => handleKeyDown(e, config.advogado.route)}
            tabIndex={0}
            role="button"
            aria-label={config.advogado.label}
          >
            <div className={styles.iconWrapper}>
              <img className={styles.optionIcon} alt="" src={config.advogado.icon} />
            </div>
            <div className={styles.optionText}>
              <span className={styles.optionLabel}>{config.advogado.label}</span>
              <span className={styles.optionDesc}>{config.advogado.desc}</span>
            </div>
            <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEscolhaTipo;
