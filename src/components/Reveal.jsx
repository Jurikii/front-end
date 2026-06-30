import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Reveal.module.css";

const Reveal = ({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.01,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const isInViewport =
      rect.top < window.innerHeight - 80 && rect.bottom > 80;
    if (isInViewport) setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${isVisible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

Reveal.propTypes = {
  children: PropTypes.node,
  as: PropTypes.elementType,
  className: PropTypes.string,
  delay: PropTypes.number,
  threshold: PropTypes.number,
};

export default Reveal;
