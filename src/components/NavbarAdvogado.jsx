import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./NavbarAdvogado.module.css";

const NAV_LINKS = [
  { label: "Início", to: "/homeadvogado" },
  { label: "Chat", to: "/chatadvogado" },
  { label: "Agenda", to: "/calendarioadvogado" },
  { label: "Meus processos", to: "/meus-processosadvogado" },
];

const Navbar = ({ className = "" }) => {

  const linkClass = ({ isActive }) =>
    [styles.navItem, isActive ? styles.navItemActive : ""].join(" ");

  return (
    <header className={[styles.navbar, className].join(" ")}>

      <NavLink to="/homeadvogado" className={styles.logo}>
        <img
          className={styles.logoImage}
          loading="lazy"
          alt="Juriki logo"
          src="/Logo-juriki-girassol-completo-2@2x.png"
        />
        <div className={styles.logoText}>
          <h2 className={styles.logoTitle}>JURIKI</h2>
        </div>
      </NavLink>

      <nav className={styles.navLinks}>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink key={label} to={to} className={linkClass} end>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.userArea}>
        <NavLink to="/configuracoesadvogado" className={styles.iconButton} aria-label="Configurações">
          <img src="/Vector.svg" alt="Configurações" />
        </NavLink>
        <button className={styles.iconButton} aria-label="Notificações">
          <img src="/Vector1.svg" alt="Notificações" />
        </button>

        <div className={styles.divider} />

        <NavLink to="/perfiladvogado" className={styles.userButton}>
          <img className={styles.avatar} src="/user.svg" alt="Avatar Rosana Silva" />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Rosana Silva</span>
            <span className={styles.userOab}>OAB/SP 123.456</span>
          </div>
        </NavLink>
      </div>

    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;
