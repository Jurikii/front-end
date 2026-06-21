import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SecaoAvaliacoes from "../components/SecaoAvaliacoes";
import AdvogadosSection from "../components/AdvogadosSection";
import SeusDireitosChat from "../components/SeusDireitosChat";
import FlorzinhaTextoEBotao from "../components/FlorzinhaTextoEBotao";
import Rodap from "../components/Rodape e navbar/Rodap";
import HeroSection from "../components/HeroSection";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#chat-demo") {
      const el = document.getElementById("chat-demo");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [hash]);

  return (
    <div className={styles.homePageTeste}>
      <img
        className={styles.fundoFlorBege1}
        alt=""
        src="/fundo-flor-bege-1@2x.png"
      />
      <img
        className={styles.fundoFlorBege2}
        alt=""
        src="/fundo-flor-bege-2@2x.png"
      />
      <img
        className={styles.fundoFlorBege3}
        alt=""
        src="/fundo-flor-bege-2@2x.png"
      />
      <img
        className={styles.outroFundoFlorAzul1}
        alt=""
        src="/outro-fundo-flor-azul-1@2x.png"
      />
      <img
        className={styles.fundoFlorBegeCantoDireito}
        alt=""
        src="/fundo-flor-bege-canto-direito@2x.png"
      />
      {/* Block 1: Hero Section */}
      <div className={styles.block}>
        <HeroSection />
      </div>

      {/* Block 2: SeusDireitosChat */}
      <div id="chat-demo" className={`${styles.block} ${styles.seusDireitosChatWrapper}`}>
        <SeusDireitosChat />
      </div>

      {/* Block 3: Advogados Section */}
      <div className={styles.block}>
        <AdvogadosSection />
      </div>

      {/* Block 4: SecaoAvaliacoes + FlorzinhaTextoEBotao + Rodap */}
      <div className={styles.blockLast}>
        <div className={styles.secaoAvaliacoesWrapper}>
          <img className={styles.maskGroupIcon} alt="" src="/outro-fundo-flor-azul-1@2x.png" />
          <SecaoAvaliacoes />
        </div>
        <section className={styles.florzinhaTextoEBotoParent}>
          <FlorzinhaTextoEBotao />
        </section>
        <img className={styles.maskGroupIcon} alt="" src="/Mask-group1@2x.png" />
        <Rodap />
      </div>
    </div>
  );
};

export default HomePage;
