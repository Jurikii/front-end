import PropTypes from "prop-types";
import styles from "./AndamentosSection.module.css";

const ANDAMENTOS_EXEMPLO = [
  {
    date: "10/05/2026",
    title: "Despacho proferido",
    description: "Despacho determinado a juntada de documentos",
  },
  {
    date: "02/05/2026",
    title: "Petição protocolada",
    description: "Petição inicial juntada aos autos.",
  },
  {
    date: "15/04/2026",
    title: "Audiência realizada",
    description: "Audiência de conciliação realizada.",
  },
];

const AndamentosSection = ({ andamentos = ANDAMENTOS_EXEMPLO }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Andamentos</h2>
      <div className={styles.timeline}>
        <div className={styles.items}>
          {andamentos.map((item, index) => (
            <div className={styles.item} key={index}>
              <h3 className={styles.date}>{item.date}</h3>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

AndamentosSection.propTypes = {
  andamentos: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};

export default AndamentosSection;
