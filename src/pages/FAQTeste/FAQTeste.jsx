import InicioDvidas from "../../components/FAQ/InicioDvidas";
import FaqBody from "../../components/FAQ/FaqBody";
import Navbar from "../../components/Navbar";
import Rodap from "../../components/FAQ/Rodap";
import styles from "./FAQTeste.module.css";

const FAQTeste = () => {
  return (
    <div className={styles.faqTeste}>
      <Navbar activeItem="FAQ" />
      <main className={styles.mainContent}>
        <InicioDvidas />
        <div className={styles.chat}>
          <div className={styles.lupaEDvida}>
            <img
              className={styles.cuidasearchOutlineIcon}
              loading="lazy"
              alt=""
              src="/cuida-search-outline.svg"
            />
            <h3 className={styles.qualA}>Qual é a sua dúvida?</h3>
          </div>
          <h3 className={styles.qualA}>Ex: plano, advogado, segurança...</h3>
        </div>
        <FaqBody />
      </main>
      <Rodap />
    </div>
  );
};

export default FAQTeste;
