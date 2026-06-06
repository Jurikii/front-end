import P from "./P";
import PropTypes from "prop-types";
import styles from "./ComoFunciona.module.css";

const ComoFunciona = ({ className = "" }) => {
  return (
    <section className={`${styles.comoFunciona} ${className}`}>
      <div className={styles.ttuloELegenta}>
        <div className={styles.ttuloEFlorzinhas}>
          <img className={styles.groupIcon} alt="" src="/Group.svg" />
          <h2 className={styles.comoTornamosA}>
            Como tornamos a justiça compreensível
          </h2>
          <img className={styles.groupIcon} alt="" src="/Group.svg" />
        </div>
        <div className={styles.tecnologiaEPessoas}>
          Tecnologia e pessoas trabalhando juntas para simplificar sua jornada
          jurídica.
        </div>
      </div>
      <section className={styles.passoAPasso}>
        <P
          imagemBalo="/imagem-bal-o@2x.png"
          tireDvidasJurdicasComNossa="Tire dúvidas jurídicas com nossa IA de forma simples."
          ttulo="Você pergunta"
          numero={1}
        />
        <img
          className={styles.image107Icon}
          loading="lazy"
          alt=""
          src="/image-108@2x.png"
        />
        <P
          p1Padding="0px 1px"
          imagemBalo="/imagem-documento@2x.png"
          tireDvidasJurdicasComNossa="Analizamos e traduzimos documentos e contratos para você entender,"
          ttulo="Nós traduzimos"
          numero={2}
        />
        <img
          className={styles.image107Icon}
          loading="lazy"
          alt=""
          src="/image-108@2x.png"
        />
        <P
          p1Padding="0px 0px 0px 1px"
          imagemBalo="/imagem-balan-a@2x.png"
          tireDvidasJurdicasComNossa="Com informação clara, você toma decisões com mais segutança."
          ttulo="Você decide"
          numero={3}
        />
        <div className={styles.passoAPassoChild} />
        <div className={styles.p4}>
          <img
            className={styles.imagemGirassolIcon}
            loading="lazy"
            alt=""
            src="/imagem-girassol@2x.png"
          />
          <div className={styles.maisQueTecnologia}>
            Mais que tecnologia, oferecemos esperança e caminhos para que seus
            direitos sejam respeitados.
          </div>
        </div>
      </section>
    </section>
  );
};

ComoFunciona.propTypes = {
  className: PropTypes.string,
};

export default ComoFunciona;
