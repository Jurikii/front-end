import PropTypes from "prop-types";
import styles from "./Milhes.module.css";

const Milhes = ({ className = "" }) => {
  return (
    <section className={`${styles.milhes} ${className}`}>
      <div className={styles.iconeMultidoETexto}>
        <img
          className={styles.image104Icon}
          loading="lazy"
          alt=""
          src="/image-104@2x.png"
        />
        <div className={styles.texto}>
          <div className={styles.milhesDePessoas}>
            Milhões de pessoas deixam de exercer seus direitos por não
            entenderem a linguagem jurídica.
          </div>
          <div className={styles.estamosAquiPara}>
            Estamos aqui para mudar isso.
          </div>
        </div>
      </div>
      <div className={styles.benefcios}>
        <div className={styles.benefciosChild} />
        <div className={styles.simples}>
          <img
            className={styles.image105Icon}
            loading="lazy"
            alt=""
            src="/image-1051@2x.png"
          />
          <div className={styles.linguagemSimples}>Linguagem simples</div>
        </div>
        <div className={styles.benefciosChild} />
        <div className={styles.simples}>
          <img
            className={styles.image105Icon}
            alt=""
            src="/image-1052@2x.png"
          />
          <div className={styles.linguagemSimples}>Informação confiável</div>
        </div>
        <div className={styles.benefciosChild} />
        <div className={styles.tecnologia}>
          <img
            className={styles.image105Icon3}
            alt=""
            src="/image-105@2x.png"
          />
          <div className={styles.tecnologiaComPropsito}>
            Tecnologia com propósito
          </div>
        </div>
      </div>
    </section>
  );
};

Milhes.propTypes = {
  className: PropTypes.string,
};

export default Milhes;
