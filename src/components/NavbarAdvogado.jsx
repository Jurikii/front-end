import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavbarAdvogado.module.css";

const NAV_LINKS = [
  { label: "Início", paths: ["/homeadvogado"] },
  { label: "Chat", paths: ["/chatadvogado"] },
  { label: "Agenda", paths: ["/calendarioadvogado", "/agendaadvogado"] },
  { label: "Meus processos", paths: ["/meus-processosadvogado", "/detalhes-processoadvogado"] },
];

const Navbar = ({ className = "" }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (paths) => paths.includes(pathname);

  return (
    <header className={[styles.navbar, className].join(" ")}>

      <div className={styles.logo}>
        <img
          className={styles.logoImage}
          loading="lazy"
          alt="Juriki logo"
          src="/Logo-juriki-girassol-completo-2@2x.png"
        />
        <div className={styles.logoText}>
          <h2 className={styles.logoTitle}>JURIKI</h2>
          <span className={styles.logoSlogan}>A justiça que fala a sua língua</span>
        </div>
      </div>

      <nav className={styles.navLinks}>
        {NAV_LINKS.map(({ label, paths }) => (
          <button
            key={label}
            className={[styles.navItem, isActive(paths) ? styles.navItemActive : ""].join(" ")}
            onClick={() => navigate(paths[0])}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className={styles.userArea}>
        <button className={styles.iconButton} onClick={() => navigate("/configuracoesadvogado")} aria-label="Configurações">
          <img src="/Vector.svg" alt="Configurações" />
        </button>
        <button className={styles.iconButton} aria-label="Notificações">
          <img src="/Vector1.svg" alt="Notificações" />
        </button>

        <div className={styles.divider} />

        <button className={styles.userButton} onClick={() => navigate("/perfiladvogado")}>
          <img className={styles.avatar} src="/user.svg" alt="Avatar Alice Silva" />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Alice Silva</span>
            <span className={styles.userOab}>OAB/SP 123.456</span>
          </div>
        </button>
      </div>

    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;
