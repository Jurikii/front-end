import PropTypes from "prop-types";
import styles from "./ChatBanner.module.css";

const ChatBanner = ({ className = "", onOpen }) => {
  return (
    <section className={[styles.banner, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <img className={styles.icon} alt="" src="/ph-star-four-bold.svg" />
          <h3 className={styles.title}>Chat com a IA</h3>
        </div>
        <p className={styles.description}>
          Pesquise leis, jurisprudências, crie documentos e muito mais.
        </p>
      </div>

      <button className={styles.openButton} onClick={onOpen}>
        <img className={styles.icon} alt="" src="/IA.svg" />
        <span>Abrir chat</span>
      </button>
    </section>
  );
};

ChatBanner.propTypes = {
  className: PropTypes.string,
  onOpen: PropTypes.func,
};

export default ChatBanner;
