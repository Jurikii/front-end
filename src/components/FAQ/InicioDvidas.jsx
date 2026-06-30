import PropTypes from "prop-types";
import styles from "./InicioDvidas.module.css";

const InicioDvidas = ({ className = "" }) => {
  return (
    <section className={[styles.inicioDvidas, className].join(" ")}>
      <div className={styles.dvidas}>
        <div className={styles.florzinhaETexto}>
          <img className={styles.groupIcon} loading="lazy" alt="" src="/Group5.svg" />
          <div className={styles.aquiAJustia}>
            Aqui a justiça é clara para todos.
          </div>
          <img className={styles.groupIcon} alt="" src="/Group5.svg" />
        </div>
        <div className={styles.ttuloELinha}>
          <h1 className={styles.dvidasFrequentes}>
            <span>{`Dúvidas `}</span>
            <span className={styles.frequentes}>frequentes</span>
          </h1>
          <div className={styles.ttuloELinhaChild} />
        </div>
        <b className={styles.semJuridiqusS}>
          Sem juridiquês. Só respostas claras pra você entender seus direitos.
        </b>
      </div>
      <img
        className={styles.image113Icon}
        loading="lazy"
        alt=""
        src="/image-113@2x.png"
      />
    </section>
  );
};

InicioDvidas.propTypes = {
  className: PropTypes.string,
};

export default InicioDvidas;
