import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Pastas.module.css";

const Pastas = ({
  className = "",
  mostrarHeader = false,
  cards = [],
}) => {
  const navigate = useNavigate();

  return (
    <section className={[styles.pastas, className].join(" ")}>
      {mostrarHeader && (
        <div className={styles.docRecentes}>
          <h3 className={styles.titulo}>{cards.length} pastas encontrar</h3>
        </div>
      )}
      <div className={styles.conjuntoPastas}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => navigate("/documentos/trabalhista", { state: { pasta: card.label, count: parseInt(card.count, 10) } })}
          >
            <label className={styles.label}>
              <img
                className={styles.folderIcon}
                loading="lazy"
                alt=""
                src="/Folder1@2x.png"
              />
              <div className={styles.cardText}>
                <h3 className={styles.cardLabel}>{card.label}</h3>
                <div className={styles.cardCount}>{card.count} documentos</div>
              </div>
            </label>
            <input className={styles.input} type="file" />
          </div>
        ))}
      </div>
    </section>
  );
};

Pastas.propTypes = {
  className: PropTypes.string,
  mostrarHeader: PropTypes.bool,
  cards: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, count: PropTypes.string })
  ),
};

export default Pastas;
