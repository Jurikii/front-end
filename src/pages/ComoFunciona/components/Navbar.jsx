import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BotoSecundario from "./BotoSecundario";
import BotoPrincipal from "./BotoPrincipal";
import styles from "./Navbar.module.css";

const Navbar = ({ className = "", activeItem }) => {
  const navigate = useNavigate();

  const onIncioTextClick = useCallback(() => {}, []);

  const onPlanosTextClick = useCallback(() => {}, []);

  const onComoFuncionaTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSobreNsTextClick = useCallback(() => {}, []);

  const onFAQTextClick = useCallback(() => {}, []);

  return (
    <header className={[styles.navbar, className].join(" ")}>
      <div className={styles.maskGroupParent}>
        <img className={styles.maskGroupIcon} alt="" />
        <div className={styles.menuWrapper}>
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
              <h2
                className={`${styles.incio} ${activeItem === "inicio" ? styles.active : ""}`}
                onClick={onIncioTextClick}
              >
                Início
              </h2>
              <h2
                className={`${styles.incio} ${activeItem === "planos" ? styles.active : ""}`}
                onClick={onPlanosTextClick}
              >
                Planos
              </h2>
              <h2
                className={`${styles.incio} ${activeItem === "como-funciona" ? styles.active : ""}`}
                onClick={onComoFuncionaTextClick}
              >
                Como funciona
              </h2>
              <h2
                className={`${styles.incio} ${activeItem === "sobre-nos" ? styles.active : ""}`}
                onClick={onSobreNsTextClick}
              >
                Sobre nós
              </h2>
              <h2
                className={`${styles.incio} ${activeItem === "faq" ? styles.active : ""}`}
                onClick={onFAQTextClick}
              >
                FAQ
              </h2>
            </div>
            <div className={styles.botes}>
              <BotoSecundario />
              <BotoPrincipal />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
