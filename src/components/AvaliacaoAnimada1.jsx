import { useRef } from "react";
import { avaliacoes1 } from "../data/avaliacoes";
import Avaliacao from "./Avaliacao";
import PropTypes from "prop-types";
import styles from "./AvaliacaoAnimada1.module.css";

const AvaliacaoAnimada1 = ({ className = "", property1 = "Avaliação 1" }) => {
  const colRef = useRef(null);
  const isDown = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isDown.current = true;
    startY.current = e.pageY - colRef.current.offsetTop;
    scrollTop.current = colRef.current.scrollTop;
  };

  const onMouseLeave = () => { isDown.current = false; };
  const onMouseUp = () => { isDown.current = false; };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.stopPropagation();
    e.preventDefault();
    const y = e.pageY - colRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5;
    colRef.current.scrollTop = scrollTop.current - walk;
  };

  return (
    <section
      className={[styles.avaliaoAnimada2, className].join(" ")}
      data-property1={property1}
      ref={colRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {avaliacoes1.map((item, index) => (
        <Avaliacao
          key={index}
          property1={item.property1}
          avaliaoWidth={item.avaliaoWidth}
          ellipse8={item.ellipse8}
          roseA={item.roseA}
          texto={item.texto}
        />
      ))}
    </section>
  );
};

AvaliacaoAnimada1.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property1: PropTypes.string,
};

export default AvaliacaoAnimada1;
