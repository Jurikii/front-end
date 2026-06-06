import PropTypes from "prop-types";
import styles from "./PerguntaFaq.module.css";

const PerguntaFaq = ({
  className = "",
  property1 = "fechado",
  aJurikiSubstituiUmAdvogado,
  materialSymbolsplayArrowRounded,
  noAJurikiTeAjudaAEntenderS,
  iconeAmarelo,
  iconePergunta,
  iconePergunta1,
}) => {
  return (
    <div
      className={[styles.root, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.pergunta}>
        <div className={styles.iconeEPergunta}>
          {iconePergunta1 || iconeAmarelo}
          <h3 className={styles.aJurikiSubstitui}>
            {aJurikiSubstituiUmAdvogado}
          </h3>
        </div>
        <img
          className={styles.materialSymbolsplayArrowRoIcon}
          alt=""
          src={materialSymbolsplayArrowRounded}
        />
      </div>
      <div className={styles.resposta}>
        <div className={styles.noAJuriki}>{noAJurikiTeAjudaAEntenderS}</div>
      </div>
    </div>
  );
};

PerguntaFaq.propTypes = {
  className: PropTypes.string,
  aJurikiSubstituiUmAdvogado: PropTypes.string,
  materialSymbolsplayArrowRounded: PropTypes.string,
  noAJurikiTeAjudaAEntenderS: PropTypes.string,
  iconeAmarelo: PropTypes.any,
  iconePergunta: PropTypes.any,
  iconePergunta1: PropTypes.any,
  property1: PropTypes.string,
};

export default PerguntaFaq;
