import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Advogado from "./Advogado";
import PropTypes from "prop-types";
import styles from "./AdvogadosDisponiveis.module.css";

const ADVOGADOS_LISTA = [
  {
    id: "beatriz-oliveira",
    fotoDoAdvogadoJustifyContent: "",
    geminiGeneratedImageBkgpjbk:
      "/Gemini-Generated-Image-bk5gpjbk5gpjbk5g-1@2x.png",
    geminiGeneratedImageBkgpjbBorderRadius: "489px",
    nome: "Dra. Beatriz Oliveira",
    draBeatrizOliveira: "Dra. Beatriz Oliveira",
    consumidorCvelTrabalhista: "Consumidor   •   Cível   •  Trabalhista",
    consumidorCvelAlignSelf: "stretch",
    consumidorCvelDisplay: "",
    setinhaJustifyContent: "",
    tipoDeAtendimentoJustifyContent: "",
    areas: ["Consumidor", "Cível", "Trabalhista"],
    oab: "OAB/SP 123.456",
    foto: "/Gemini-Generated-Image-bk5gpjbk5gpjbk5g-1@2x.png",
    rating: 5.0,
  },
  {
    id: "ana-andrade",
    fotoDoAdvogadoJustifyContent: "center",
    geminiGeneratedImageBkgpjbk: "/Ellipse-31@2x.png",
    geminiGeneratedImageBkgpjbBorderRadius: "50%",
    nome: "Dra. Ana Andrade",
    draBeatrizOliveira: "Dra. Ana Andrade",
    consumidorCvelTrabalhista: "Consumidor   •   Família",
    consumidorCvelAlignSelf: "stretch",
    consumidorCvelDisplay: "",
    setinhaJustifyContent: "center",
    tipoDeAtendimentoJustifyContent: "center",
    areas: ["Consumidor", "Família"],
    oab: "OAB/SP 789.012",
    foto: "/Ellipse-31@2x.png",
    rating: 4.8,
  },
  {
    id: "carlos-manoel",
    fotoDoAdvogadoJustifyContent: "center",
    geminiGeneratedImageBkgpjbk: "/Ellipse-311@2x.png",
    geminiGeneratedImageBkgpjbBorderRadius: "50%",
    nome: "Dr. Carlos Manoel",
    draBeatrizOliveira: "Dr. Carlos Manoel",
    consumidorCvelTrabalhista: "Consumidor   •   Previdenciário   •  Cível",
    consumidorCvelAlignSelf: "unset",
    consumidorCvelDisplay: "inline-block",
    setinhaJustifyContent: "center",
    tipoDeAtendimentoJustifyContent: "center",
    areas: ["Consumidor", "Previdenciário", "Cível"],
    oab: "OAB/SP 456.789",
    foto: "/Ellipse-311@2x.png",
    rating: 4.9,
  },
  {
    id: "gabriel-augusto",
    fotoDoAdvogadoJustifyContent: "center",
    geminiGeneratedImageBkgpjbk: "/Ellipse-312@2x.png",
    geminiGeneratedImageBkgpjbBorderRadius: "50%",
    nome: "Dr. Gabriel Augusto",
    draBeatrizOliveira: "Dr. Gabriel Augusto",
    consumidorCvelTrabalhista: "Consumidor ",
    consumidorCvelAlignSelf: "stretch",
    consumidorCvelDisplay: "",
    setinhaJustifyContent: "center",
    tipoDeAtendimentoJustifyContent: "center",
    areas: ["Consumidor"],
    oab: "OAB/SP 321.654",
    foto: "/Ellipse-312@2x.png",
    rating: 4.7,
  },
];

const AdvogadosDisponiveis = ({ className = "" }) => {
  const navigate = useNavigate();
  const [advogadoItems] = useState(ADVOGADOS_LISTA);

  const onAdvogadoClick = useCallback((advogado) => {
    navigate(`/advogados/${advogado.id}`, { state: { advogado } });
  }, [navigate]);

  const onAdvogadoItemClick = useCallback((item) => {
    onAdvogadoClick(item);
  }, [onAdvogadoClick]);
  return (
    <section className={[styles.advogadosDisponiveis, className].join(" ")}>
      <h2 className={styles.advogadosDisponveis}>Advogados disponíveis</h2>
      <div className={styles.advogados}>
        {advogadoItems.map((item, index) => (
          <Advogado
            key={index}
            fotoDoAdvogadoJustifyContent={item.fotoDoAdvogadoJustifyContent}
            geminiGeneratedImageBkgpjbk={item.geminiGeneratedImageBkgpjbk}
            geminiGeneratedImageBkgpjbBorderRadius={
              item.geminiGeneratedImageBkgpjbBorderRadius
            }
            draBeatrizOliveira={item.draBeatrizOliveira}
            consumidorCvelTrabalhista={item.consumidorCvelTrabalhista}
            consumidorCvelAlignSelf={item.consumidorCvelAlignSelf}
            consumidorCvelDisplay={item.consumidorCvelDisplay}
            setinhaJustifyContent={item.setinhaJustifyContent}
            tipoDeAtendimentoJustifyContent={
              item.tipoDeAtendimentoJustifyContent
            }
            onAdvogadoClick={() => onAdvogadoItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
};

AdvogadosDisponiveis.propTypes = {
  className: PropTypes.string,
};

export default AdvogadosDisponiveis;
