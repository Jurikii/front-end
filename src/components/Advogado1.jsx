import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Advogado1.module.css";

const Advogado1 = ({
  className = "",
  ellipse31,
  draAnaAndrade,
  consumidorFamlia,
  consumidorFamliaAlignSelf,
  consumidorFamliaDisplay,
}) => {
  const consumidorFamliaStyle = useMemo(() => {
    return {
      alignSelf: consumidorFamliaAlignSelf,
      display: consumidorFamliaDisplay,
    };
  }, [consumidorFamliaAlignSelf, consumidorFamliaDisplay]);

  return (
    <section className={[styles.advogado, className].join(" ")}>
      <div className={styles.fotoDoAdvogado}>
        <img
          className={styles.fotoDoAdvogadoChild}
          loading="lazy"
          alt=""
          src={ellipse31}
        />
        <div className={styles.nomeDoAdvogado}>
          <h2 className={styles.draAnaAndrade}>{draAnaAndrade}</h2>
          <h3 className={styles.consumidorFamlia} style={consumidorFamliaStyle}>
            {consumidorFamlia}
          </h3>
        </div>
      </div>
      <div className={styles.setinha}>
        <div className={styles.tipoDeAtendimento}>
          <div className={styles.icones}>
            <img
              className={styles.materialSymbolsmonitorOutliIcon}
              alt=""
              src="/material-symbols-monitor-outline.svg"
            />
            <img
              className={styles.materialSymbolsmonitorOutliIcon}
              alt=""
              src="/tabler-map-pin.svg"
            />
          </div>
          <h3 className={styles.atendimentoOnlineE}>
            Atendimento online e presencial
          </h3>
        </div>
        <img
          className={styles.setinha1}
          loading="lazy"
          alt=""
          src="/setinha-11@2x.png"
        />
      </div>
    </section>
  );
};

Advogado1.propTypes = {
  className: PropTypes.string,
  ellipse31: PropTypes.string,
  draAnaAndrade: PropTypes.string,
  consumidorFamlia: PropTypes.string,
  consumidorFamliaAlignSelf: PropTypes.string,
  consumidorFamliaDisplay: PropTypes.string,
};

export default Advogado1;
