import { useState } from "react";
import Advogado1 from "./Advogado1";
import PropTypes from "prop-types";
import styles from "./CompletoEscolhaAdvogado.module.css";

const CompletoEscolhaAdvogado = ({ className = "" }) => {
  const [advogado1Items] = useState([
    {
      ellipse31: "/Ellipse-314@2x.png",
      draAnaAndrade: "Dra. Ana Andrade",
      consumidorFamlia: "Consumidor   •   Família",
      consumidorFamliaAlignSelf: "stretch",
      consumidorFamliaDisplay: "",
    },
    {
      ellipse31: "/Ellipse-315@2x.png",
      draAnaAndrade: "Dr. Carlos Manoel",
      consumidorFamlia: "Consumidor   •   Previdenciário   •  Cível",
      consumidorFamliaAlignSelf: "unset",
      consumidorFamliaDisplay: "inline-block",
    },
    {
      ellipse31: "/Ellipse-313@2x.png",
      draAnaAndrade: "Dr. Gabriel Augusto",
      consumidorFamlia: "Consumidor ",
      consumidorFamliaAlignSelf: "stretch",
      consumidorFamliaDisplay: "",
    },
  ]);
  return (
    <section className={[styles.completoEscolhaAdvogado, className].join(" ")}>
      <div className={styles.advogados}>
        <div className={styles.escolhaUmAdvogado}>
          <h2 className={styles.escolhaUmAdvogado2}>Escolha um advogado</h2>
          <div className={styles.escolhaUmAdvogado3}>
            <div className={styles.botesIniciais}>
              <div className={styles.menuDeBusca}>
                <div className={styles.pesquisar}>
                  <div className={styles.busquePorNome}>
                    Busque por nome ou aréa de atuação
                  </div>
                  <img className={styles.lupaIcon} alt="" src="/lupa.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.advogados2}>
          {advogado1Items.map((item, index) => (
            <Advogado1
              key={index}
              ellipse31={item.ellipse31}
              draAnaAndrade={item.draAnaAndrade}
              consumidorFamlia={item.consumidorFamlia}
              consumidorFamliaAlignSelf={item.consumidorFamliaAlignSelf}
              consumidorFamliaDisplay={item.consumidorFamliaDisplay}
            />
          ))}
        </div>
      </div>
      <div className={styles.mensagemSeria}>
        <img className={styles.sininhoIcon} alt="" src="/sininho.svg" />
        <h3 className={styles.asPartesSero}>
          As partes serão notificadas e poderão visualizar os detalhes da
          solicitação.
        </h3>
      </div>
    </section>
  );
};

CompletoEscolhaAdvogado.propTypes = {
  className: PropTypes.string,
};

export default CompletoEscolhaAdvogado;
