import { useCallback, useRef } from "react";
import { advogados } from "../data/advogados";
import AdvogadoCard from "./AdvogadoCard";
import PropTypes from "prop-types";
import styles from "./AdvogadosSection.module.css";

const AdvogadosSection = ({ className = "" }) => {
  const onBotoContainerClick = useCallback(() => {
    // Please sync "Pag - Login" to the project
  }, []);

  const advogadosRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    e.preventDefault();
    isDown.current = true;
    startX.current = e.pageX - advogadosRef.current.offsetLeft;
    scrollLeft.current = advogadosRef.current.scrollLeft;
  };

  const onMouseLeave = () => { isDown.current = false; };
  const onMouseUp = () => { isDown.current = false; };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - advogadosRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    advogadosRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <main
      className={[styles.fundoSeoConheaSeusDefenParent, className].join(" ")}
    >
      <div className={styles.fundoSeoConheaSeusDefen} />
      <img className={styles.maskGroupIcon} alt="" src="/Mask-group2@2x.png" />
      <div className={styles.seoConheaDefensores}>
        <section className={styles.texto}>
          <div className={styles.defensores}>
            <img className={styles.groupIcon} alt="" src="/Group1.svg" />
            <h1 className={styles.conheaSeusDefensoresContainer}>
              <span>Conheça seus</span>
              <span className={styles.span}>{` `}</span>
              <span className={styles.resultadosClaros}>defensores</span>
            </h1>
            <img className={styles.groupIcon} alt="" src="/Group1.svg" />
          </div>
          <h1 className={styles.pessoasReaisDedicadasContainer}>
            <span>
              Pessoas reais dedicadas a transformar seus problemas jurídicos em
            </span>
            <span className={styles.span2}>{` `}</span>
            <span className={styles.resultadosClaros}>resultados claros</span>
          </h1>
        </section>
        <div
          className={styles.advogados}
          ref={advogadosRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >

          {advogados.map((item, index) => (
            <AdvogadoCard
              key={index}
              advocateRectsInner={item.advocateRectsInner}
              drSandraBackram={item.drSandraBackram}
              advogadaCriminalistaEspecializada={
                item.advogadaCriminalistaEspecializada
              }
              property1={item.property1}
              agendarMargin={item.agendarMargin}
            />
          ))}
        </div>
        <div className={styles.boto} onClick={onBotoContainerClick}>
          <b className={styles.conheaNossosEspecialistas}>
            Conheça nossos Especialistas
          </b>
        </div>
        <div className={styles.alerta}>
          <img
            className={styles.iconamoonattentionCircle}
            alt=""
            src="/iconamoon-attention-circle.svg"
          />
          <div className={styles.aIaNo}>
            A IA não substitui o advogado. Atuamos dentro das normas da OAB.
          </div>
        </div>
      </div>
    </main>
  );
};

AdvogadosSection.propTypes = {
  className: PropTypes.string,
};

export default AdvogadosSection;
