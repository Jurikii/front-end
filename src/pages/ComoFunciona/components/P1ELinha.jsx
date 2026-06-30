import { useMemo } from "react";
import styles from "./P1ELinha.module.css";

const P1ELinha = ({
  className = "",
  passo1FlexWrap,
  passo1AlignContent,
  iconeBaloFala,
  conteASuaDvida,
  descrevaSuaSituaoOuEnvieSua,
}) => {
  const passo1Style = useMemo(() => {
    return {
      flexWrap: passo1FlexWrap,
      alignContent: passo1AlignContent,
    };
  }, [passo1FlexWrap, passo1AlignContent]);

  return (
    <section className={[styles.p1ELinha, className].join(" ")}>
      <div className={styles.passo1} style={passo1Style}>
        <img
          className={styles.iconeBaloFala}
          loading="lazy"
          alt=""
          src={iconeBaloFala}
        />
        <div className={styles.texto}>
          <h2 className={styles.conteASua}>{conteASuaDvida}</h2>
          <div className={styles.descrevaSuaSituao}>
            {descrevaSuaSituaoOuEnvieSua}
          </div>
        </div>
      </div>
    </section>
  );
};

export default P1ELinha;
