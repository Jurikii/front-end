import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "./Rodape e navbar/Navbar";
import styles from "./HeroSection.module.css";
import { useAuthModal } from "../context/AuthModalContext";

const HeroSection = ({ className = "" }) => {
  const { openTipoModal } = useAuthModal();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTirarDuvidas = useCallback(() => {
    openTipoModal("login");
  }, [openTipoModal]);

  const handleTestarGratis = useCallback(() => {
    const el = document.getElementById("chat-demo");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.navbarParent} ${className} ${isVisible ? styles.animActive : ""}`}
    >
      <Navbar activeItem="Início" />
      <section className={styles.frameWrapper}>
        <div className={styles.heroImage}>
            <img
              src="/hero-juriki.png"
              alt="Hero Juriki"
              className={styles.heroImg}
            />
          </div>
        <div className={styles.maskGroupGroup}>
          
          <div className={styles.textoSeo1}>
            <div className={styles.groupParent}>
              <img className={styles.groupIcon} alt="" src="/Group.svg" />
              <div className={styles.aJustiaQue}>
                A justiça que fala a sua lingua.
              </div>
              <img className={styles.groupIcon} alt="" src="/Group.svg" />
            </div>
            <h1 className={styles.entendaSeusDireitosContainer}>
              <span className={styles.entendaSeusDireitosContainer2}>
                <span>{`Entenda seus direitos `}</span>
                <span>
                  {" "}
                  <br />
                </span>
                <span className={styles.semJuridiqus}>sem juridiquês.</span>
              </span>
            </h1>
            <b className={styles.tireDvidasTraduza}>
              Tire dúvidas, traduza documentos e fale com advogados — tudo em
              linguagem simples.
            </b>
            <div className={styles.botes2}>
              <div className={styles.botoDvidas} onClick={handleTirarDuvidas} style={{ cursor: "pointer" }}>
                <b
                  className={styles.tirarMinhasDvidas}
                >{`Tirar minhas dúvidas agora `}</b>
                <img
                  className={styles.mingcutearrowUpFillIcon}
                  alt=""
                  src="/mingcute-arrow-up-fill1.svg"
                />
              </div>
              <div className={styles.botoTestar} onClick={handleTestarGratis} style={{ cursor: "pointer" }}>
                <b className={styles.testarGrtis}>Testar grátis</b>
              </div>
            </div>
            <div className={styles.seguroParent}>
              <div className={styles.seguro}>
                <img
                  className={styles.materialSymbolslockOutlineIcon}
                  alt=""
                  src="/material-symbols-lock-outline.svg"
                />
                <div className={styles.seguroEConfivel}>Seguro e confiável</div>
              </div>
              <div className={styles.seguro}>
                <img
                  className={styles.materialSymbolslockOutlineIcon}
                  alt=""
                  src="/boxicons-law.svg"
                />
                <div className={styles.baseadoNaLei}>
                  Baseado na lei brasileira
                </div>
              </div>
            </div>
          </div>




        </div>
      </section>
    </section>
  );
};

HeroSection.propTypes = {
  className: PropTypes.string,
};

export default HeroSection;
