import BotaoAgendar from "./BotaoAgendar";
import PropTypes from "prop-types";
import styles from "./AdvogadoCard.module.css";

const AdvogadoCard = ({
  className = "",
  advocateRectsInner,
  drSandraBackram,
  advogadaCriminalistaEspecializada,
  property1,
  agendarMargin,
}) => {
  return (
    <div className={[styles.vectorParent, className].join(" ")}>
      <img className={styles.instanceChild} alt="" src="/Rectangle-241.svg" draggable="false" />
      <div className={styles.advocateRectsInnerParent}>
        <img
          className={styles.advocateRectsInner}
          loading="lazy"
          alt=""
          src={advocateRectsInner}
          draggable="false"
        />
        <div className={styles.drSandraBackram}>{drSandraBackram}</div>
      </div>
      <div className={styles.advocateInfos}>
        <div className={styles.advogadaCriminalistaEspecial}>
          {advogadaCriminalistaEspecializada}
        </div>
        <BotaoAgendar property1={property1} agendarMargin={agendarMargin} />
      </div>
    </div>
  );
};

AdvogadoCard.propTypes = {
  className: PropTypes.string,
  advocateRectsInner: PropTypes.string,
  drSandraBackram: PropTypes.string,
  advogadaCriminalistaEspecializada: PropTypes.string,
  property1: PropTypes.any,
  agendarMargin: PropTypes.any,
};

export default AdvogadoCard;
