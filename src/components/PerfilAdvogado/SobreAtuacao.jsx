import PropTypes from "prop-types";
import styles from "./SobreAtuacao.module.css";

const SobreAtuacao = ({
  className = "",
  nome = "Dra. Beatriz Oliveira",
  areas = ["Consumidor", "Cível", "Trabalhista"],
}) => {
  const mid = Math.ceil(areas.length / 2);
  const col1 = areas.slice(0, mid);
  const col2 = areas.slice(mid);

  return (
    <section className={`${styles.grupoFinal} ${className}`}>
      <div className={styles.processo1}>
        <div className={styles.processoSelecionado}>
          <h2 className={styles.sobre}>Sobre</h2>
          <div className={styles.descricaoSobre}>
            {nome} é advogada especializada em {areas.slice(0, 2).join(" e ")}, com foco em
            soluções rápidas e eficientes. Atendimento humanizado e
            transparente, sempre buscando o melhor resultado para o cliente.
          </div>
        </div>
      </div>
      <div className={styles.grupoFinal2}>
        <h2 className={styles.tituloAtuacao}>Áreas de atuação</h2>
        <div className={styles.grupoHorizontal}>
          <div className={styles.coluna}>
            {col1.map((area, i) => (
              <div key={i} className={styles.areaItem}>
                <img className={styles.checkIcon} alt="" src="/material-symbols-check-circle-outline.svg" />
                <h3 className={styles.areaNome}>{area}</h3>
              </div>
            ))}
          </div>
          <div className={styles.coluna}>
            {col2.map((area, i) => (
              <div key={i} className={styles.areaItem}>
                <img className={styles.checkIcon} alt="" src="/material-symbols-check-circle-outline.svg" />
                <h3 className={styles.areaNome}>{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

SobreAtuacao.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string,
  areas: PropTypes.arrayOf(PropTypes.string),
};

export default SobreAtuacao;
