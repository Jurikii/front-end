import { useState, cloneElement } from "react";
import PropTypes from "prop-types";
import styles from "./PerguntaFaq.module.css";

const PerguntaFaq = ({
  className = "",
  property1: initialProperty1 = "fechado",
  aJurikiSubstituiUmAdvogado,
  materialSymbolsplayArrowRounded,
  noAJurikiTeAjudaAEntenderS,
  iconeAmarelo,
  iconePergunta,
  iconePergunta1,
}) => {
  const [property1, setProperty1] = useState(initialProperty1);

  const toggleOpen = () => {
    setProperty1((prev) => (prev === "aberto" ? "fechado" : "aberto"));
  };

  return (
    <div
      className={[styles.root, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.pergunta} onClick={toggleOpen}>
        <div className={styles.iconeEPergunta}>
          {cloneElement(iconePergunta1 || iconeAmarelo, { property1 })}
          <h3 className={styles.aJurikiSubstitui}>
            {aJurikiSubstituiUmAdvogado}
          </h3>
        </div>
        <div className={styles.chevronArrow} />
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
