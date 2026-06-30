import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./InicioDvidas.module.css";

const InicioDvidas = ({ className = "" }) => {
  const navigate = useNavigate();

  const onBotoDvidasContainerClick = useCallback(() => {
    navigate("/#chat-demo");
  }, [navigate]);

  return (
    <section className={[styles.inicioDvidas, className].join(" ")}>
      <div className={styles.dvidas}>
        <div className={styles.florzinhaETexto}>
          <img className={styles.groupIcon} loading="lazy" alt="" src="/Group5.svg" />
          <div className={styles.aquiAJustia}>
            Aqui a justiça é clara para todos.
          </div>
          <img className={styles.groupIcon} alt="" src="/Group5.svg" />
        </div>
        <div className={styles.ttuloELinha}>
          <h1 className={styles.dvidasFrequentes}>
            <span>{`Dúvidas `}</span>
            <span className={styles.frequentes}>frequentes</span>
          </h1>
          <div className={styles.ttuloELinhaChild} />
        </div>
        <b className={styles.semJuridiqusS}>
          Sem juridiquês. Só respostas claras pra você entender seus direitos.
        </b>
        <div className={styles.noAchouEBoto}>
          <div className={styles.iconeBaloETexto}>
            <img className={styles.groupIcon3} alt="" src="/Group6.svg" />
            <h3 className={styles.noAchouO}>
              Não achou o que procura? Pergunte direto pra nossa IA.
            </h3>
          </div>
          <div
            className={styles.botoDvidas}
            onClick={onBotoDvidasContainerClick}
          >
            <img
              className={styles.hugeiconschat01}
              alt=""
              src="/hugeicons-chat-01.svg"
            />
            <div className={styles.aquiAJustia}>Perguntar para a IA</div>
          </div>
        </div>
      </div>
      <img
        className={styles.image113Icon}
        loading="lazy"
        alt=""
        src="/image-113@2x.png"
      />
    </section>
  );
};

InicioDvidas.propTypes = {
  className: PropTypes.string,
};

export default InicioDvidas;
