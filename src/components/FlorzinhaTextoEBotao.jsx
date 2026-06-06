import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FlorzinhaTextoEBotao.module.css";

const FlorzinhaTextoEBotao = ({ className = "" }) => {
  const navigate = useNavigate();

  const onBotoDvidasContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={[styles.florzinhaTextoEBoto, className].join(" ")}>
      <img className={styles.image77Icon} alt="" src="/image-77@2x.png" />
      <div className={styles.textoEmDestaqueEBoto}>
        <div className={styles.textoEmDestaque}>
          <h2 className={styles.aJustia}>A justiça é para todos.</h2>
          <h3 className={styles.entenderO}>
            Entender é o primeiro passo para transformar.
          </h3>
        </div>
        <div className={styles.botoETextoEmbaixo}>
          <div
            className={styles.botoDvidas}
            onClick={onBotoDvidasContainerClick}
          >
            <b className={styles.comearAgora}>Começar agora</b>
            <img
              className={styles.mingcutearrowUpFillIcon}
              alt=""
              src="/mingcute-arrow-up-fill@2x.png"
            />
          </div>
          <div className={styles.seguro}>
            <img
              className={styles.materialSymbolslockOutlineIcon}
              alt=""
              src="/material-symbols-lock-outline.svg"
            />
            <div className={styles.rpidoSeguroE}>Rápido, seguro e gratuito</div>
          </div>
        </div>
      </div>
    </div>
  );
};

FlorzinhaTextoEBotao.propTypes = {
  className: PropTypes.string,
};

export default FlorzinhaTextoEBotao;
