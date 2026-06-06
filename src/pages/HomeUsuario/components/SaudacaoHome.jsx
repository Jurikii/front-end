import PropTypes from "prop-types";
import styles from "./SaudacaoHome.module.css";

const SaudacaoHome = ({ className = "" }) => {
  return (
    <section className={[styles.saudacaoHome, className].join(" ")}>
      <section className={styles.saudao}>
        <div className={styles.cumprimentosHome}>
          <h1 className={styles.olAlice}>Olá, Alice!</h1>
          <h2 className={styles.comoPossoTe}>Como posso te ajudar hoje?</h2>
        </div>
        <div className={styles.juridiquesSozinha}>
          <img
            className={styles.mdiheartOutlineIcon}
            alt=""
            src="/mdi-heart-outline.svg"
          />
          <h3 className={styles.vocNoPrecisa}>
            Você não precisa entender juridiquês sozinha.
          </h3>
        </div>
        <div className={styles.avisoJuriki}>
          <img
            className={styles.seguroIcon}
            loading="lazy"
            alt=""
            src="/seguro@2x.png"
          />
          <div className={styles.textoAviso}>
            <div className={styles.aJurikiOferece}>
              A Juriki oferece informações juridicas para ajudar você a entender
              sua situação.
            </div>
            <div className={styles.emCasosImportantes}>
              Em casos importantes, recomendamos falar com um advogado.
            </div>
          </div>
        </div>
      </section>
      <img
        className={styles.image145Icon}
        loading="lazy"
        alt=""
        src="/image-145@2x.png"
      />
    </section>
  );
};

SaudacaoHome.propTypes = {
  className: PropTypes.string,
};

export default SaudacaoHome;
