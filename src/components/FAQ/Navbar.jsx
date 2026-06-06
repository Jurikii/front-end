import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BotoSecundario from "./BotoSecundario";
import BotoPrincipal from "./BotoPrincipal";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const Navbar = ({ className = "" }) => {
  const navigate = useNavigate();

  const onIncioTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onPlanosTextClick = useCallback(() => {
    navigate("/planossemlogin");
  }, [navigate]);

  const onComoFuncionaTextClick = useCallback(() => {
    navigate("/como-funciona");
  }, [navigate]);

  const onSobreNsTextClick = useCallback(() => {
    navigate("/sobre-nos");
  }, [navigate]);

  const onFAQTextClick = useCallback(() => {
    navigate("/faq");
  }, [navigate]);

  return (
    <header className={[styles.navbar, className].join(" ")}>
      <div className={styles.menu}>
        <div className={styles.logoEJuriki}>
          <img
            className={styles.logoJurikiGirassolCompleto}
            loading="lazy"
            alt=""
            src="/Logo-juriki-girassol-completo-2@2x.png"
          />
          <h2 className={styles.juriki}>JURIKI</h2>
        </div>
        <div className={styles.abas}>
          <h2 className={styles.incio} onClick={onIncioTextClick}>
            Início
          </h2>
          <h2 className={styles.incio} onClick={onPlanosTextClick}>
            Planos
          </h2>
          <h2 className={styles.incio} onClick={onComoFuncionaTextClick}>
            Como funciona
          </h2>
          <h2 className={styles.incio} onClick={onSobreNsTextClick}>
            Sobre nós
          </h2>
          <h2 className={styles.incio} onClick={onFAQTextClick}>
            FAQ
          </h2>
        </div>
        <div className={styles.botes}>
          <BotoSecundario />
          <BotoPrincipal />
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;
