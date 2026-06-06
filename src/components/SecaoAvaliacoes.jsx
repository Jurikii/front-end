import { useState, useEffect, useRef, useCallback } from "react";
import { avaliacoesAnimada, avaliacoesSubindo, avaliacoes1 } from "../data/avaliacoes";
import Avaliacao from "./Avaliacao";
import PropTypes from "prop-types";
import styles from "./SecaoAvaliacoes.module.css";

const colunas = [avaliacoesAnimada, avaliacoesSubindo, avaliacoes1];

const GAP      = 24;
const INTERVAL = 3500;

function ColunaCiclo({ items, delay = 0 }) {
  const [topIdx,    setTopIdx]    = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slotH,     setSlotH]     = useState(0);
  const firstRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (firstRef.current && firstRef.current.offsetHeight > 0) {
        setSlotH(firstRef.current.offsetHeight + GAP);
      }
    };
    measure();
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 400);
    const ro = new ResizeObserver(measure);
    if (firstRef.current) ro.observe(firstRef.current);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => setAnimating(true), INTERVAL);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay]);

  const onTransitionEnd = useCallback(
    (e) => {
      if (e.propertyName !== "transform") return;
      setAnimating(false);
      setTopIdx((prev) => (prev + 1) % items.length);
    },
    [items.length]
  );

  const visible = [0, 1, 2].map((i) => items[(topIdx + i) % items.length]);
  const containerH = slotH > 0 ? slotH * 2 : undefined;

  return (
    <div className={styles.coluna} style={{ height: containerH }}>
      {visible.map((item, i) => (
        <div
          key={`${topIdx}-${i}`}
          ref={i === 0 ? firstRef : null}
          className={styles.cartaoWrapper}
          style={{
            position:   "absolute",
            top:        i * slotH,
            left:       0,
            right:      0,
            transform:  animating ? `translateY(-${slotH}px)` : "translateY(0)",
            transition: animating
              ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
          onTransitionEnd={i === 0 ? onTransitionEnd : undefined}
        >
          <Avaliacao
            property1={item.property1}
            avaliaoWidth={item.avaliaoWidth}
            ellipse8={item.ellipse8}
            roseA={item.roseA}
            texto={item.texto}
          />
        </div>
      ))}
    </div>
  );
}

ColunaCiclo.propTypes = {
  items: PropTypes.array.isRequired,
  delay: PropTypes.number,
};

const SecaoAvaliacoes = ({ className = "" }) => {
  return (
    <section className={[styles.seoAvaliaes, className].join(" ")}>
      <div className={styles.textoHistrias}>
        <h1 className={styles.maisDoQueContainer}>
          <span>{`Mais do que números, `}</span>
          <span className={styles.histriasTransformadas}>
            histórias transformadas
          </span>
          <span>.</span>
        </h1>
        <h1 className={styles.milharesDePessoasContainer}>
          <span>Milhares de pessoas já encontraram</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.histriasTransformadas}>clareza</span>
          <span className={styles.span}>{` `}</span>
          <span>e</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.histriasTransformadas}>segurança</span>
          <span className={styles.span4}>{` `}</span>
          <span>com a nossa consultoria.</span>
        </h1>
      </div>

      <div className={styles.avaliaes}>
        {colunas.map((cards, i) => (
          <ColunaCiclo key={i} items={cards} delay={i * 1100} />
        ))}
      </div>
    </section>
  );
};

SecaoAvaliacoes.propTypes = {
  className: PropTypes.string,
};

export default SecaoAvaliacoes;