import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CardResumo from "./CardResumo";
import PropTypes from "prop-types";
import styles from "./ResumoDaConta.module.css";

const CARDS = [
  {
    icone:    "/heroicons-outline-chat@2x.png",
    titulo:   "Conversas realizadas",
    descricao: "Perguntas feitas para a IA",
    rota:     "/ia",
  },
  {
    icone:    "/document@2x.png",
    titulo:   "Documentos enviados",
    descricao: "Arquivos analisados",
    rota:     "/documentos",
  },
  {
    icone:    "/mdi-light-calendar1@2x.png",
    titulo:   "Consultas agendadas",
    descricao: "Com advogados",
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