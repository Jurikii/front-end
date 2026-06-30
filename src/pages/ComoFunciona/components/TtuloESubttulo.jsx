import { useState, useEffect, useRef } from "react";
import styles from "./TtuloESubttulo.module.css";

const TtuloESubttulo = ({ className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={[styles.ttuloESubttulo, className].join(" ")}
    >
      <div className={`${styles.textinhoEFlorzinhas} ${visible ? styles.eltVisible : styles.eltHidden}`}>
        <div className={styles.textinhoEFlorzinhas2}>
          <img className={styles.groupIcon} alt="" src="/Group.svg" />
          <div className={styles.simplesSeguroE}>Simples, seguro e humano</div>
          <img className={styles.groupIcon} alt="" src="/Group.svg" />
        </div>
      </div>
      <div className={`${styles.comoFuncionaAJuriki} ${visible ? styles.eltVisible : styles.eltHidden}`}>
        <h1 className={styles.comoFuncionaAContainer}>
          <span>{`Como funciona a `}</span>
          <span className={styles.juriki}>Juriki</span>
        </h1>
      </div>
      <div className={`${styles.simplificamosOAcessoInfor} ${visible ? styles.eltVisible : styles.eltHidden}`}>
        <div className={styles.simplificamosOAcesso}>
          Simplificamos o acesso à informação jurídica com tecnologia, clareza e
          apoio profissional
        </div>
      </div>
      <div className={`${styles.ttuloESubttuloChild} ${visible ? styles.eltVisible : styles.eltHidden}`} />
    </section>
  );
};

export default TtuloESubttulo;
