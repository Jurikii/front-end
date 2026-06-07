import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CardResumo from "./CardResumo";
import PropTypes from "prop-types";
import styles from "./ResumoDaConta.module.css";

const CARDS = [
  {
    icone:    "/document@2x.png",
    titulo:   "Processos ativos",
    descricao: "Casos em andamento",
    rota:     "/meus-processosadvogado",
  },
  {
    icone:    "/heroicons-outline-chat@2x.png",
    titulo:   "Consultas realizadas",
    descricao: "Atendimentos com clientes",
    rota:     null,
  },
  {
    icone:    "/mdi-light-calendar1@2x.png",
    titulo:   "Petições geradas",
    descricao: "Documentos produzidos",
    rota:     null,
  },
  {
    icone:    "/heroicons-outline-chat@2x.png",
    titulo:   "Clientes atendidos",
    descricao: "Pessoas assistidas",
    rota:     null,
  },
];

const ResumoDaConta = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((rota) => {
    if (rota) navigate(rota);
  }, [navigate]);

  return (
    <section className={[styles.resumoDaConta, className].join(" ")}>
      <h2 className={styles.resumoDaConta2}>Resumo da conta</h2>
      <div className={styles.conjuntoDeResumo}>
        {CARDS.map((card) => (
          <CardResumo key={card.titulo} {...card} onClick={() => handleClick(card.rota)} />
        ))}
      </div>
    </section>
  );
};

ResumoDaConta.propTypes = {
  className: PropTypes.string,
};

export default ResumoDaConta;
