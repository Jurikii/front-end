import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";

const LINKS_NAV = [
  { label: "Início", rota: "/" },
  { label: "Planos", rota: "/planossemlogin" },
  { label: "Como funciona", rota: "/como-funciona" },
  { label: "Sobre nós", rota: "/sobre-nos" },
  { label: "FAQ", rota: "/faq" },
];

const Navbar = ({ className = "", activeItem = "" }) => {
  const navigate = useNavigate();
  const { openTipoModal } = useAuthModal();

  const handleNavClick = useCallback(
    (rota) => {
      if (rota) navigate(rota);
    },
    [navigate]
  );

  return (
    <header className={`${styles.navbar} ${className}`}>
      {/* Área da Logo */}
      <div className={styles.logoArea}>
        <NavLink to="/" className={styles.logoArea}>
          <img
            className={styles.logoIcon}
            loading="lazy"
            alt="Logo JURIKI"
            src="/Logo-juriki-girassol-completo-2@2x.png"
          />
          <h1 className={styles.marcaNome}>JURIKI</h1>
        </NavLink>
      </div>

      {/* Links de Navegação */}
      <nav className={styles.navegacaoAbas}>
        {LINKS_NAV.map(({ label, rota }) => (
          <button
            key={label}
            className={`${styles.linkMenu} ${!rota ? styles.linkDesabilitado : ""} ${label === activeItem ? styles.linkMenuAtivo : ""}`}
            onClick={() => handleNavClick(rota)}
            style={{ cursor: rota ? "pointer" : "default" }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Botões de Ação Estruturados como o Menu1 */}
      <div className={styles.botoesArea}>
        <button className={styles.botaoSecundario} onClick={() => openTipoModal("login")}>
          Entrar
        </button>
        <button className={styles.botaoPrincipal} onClick={() => openTipoModal("cadastro")}>
          Criar Conta
        </button>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
  activeItem: PropTypes.string,
};

export default Navbar;