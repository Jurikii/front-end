import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Advogado from "./Advogado";
import PropTypes from "prop-types";
import styles from "./AdvogadosDisponiveis.module.css";

export const ADVOGADOS_LISTA = [
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

const AdvogadosDisponiveis = ({
  className = "",
  isFavorito,
  onToggleFavorito,
  filteredList,
  filtroAtivo = false,
}) => {
  const navigate = useNavigate();
  const advogadoItems = filtroAtivo && filteredList ? filteredList : ADVOGADOS_LISTA;

  const onAdvogadoClick = useCallback((advogado) => {
    navigate(`/advogados/${advogado.id}`, { state: { advogado } });
  }, [navigate]);

  const onAdvogadoItemClick = useCallback((item) => {
    onAdvogadoClick(item);
  }, [onAdvogadoClick]);

  const favoritos = useMemo(
    () => ADVOGADOS_LISTA.filter((item) => isFavorito?.(item.id)),
    [isFavorito]
  );

  const showFavoritos = favoritos.length > 0 && !filtroAtivo;

  return (
    <section className={[styles.advogadosDisponiveis, className].join(" ")}>
      {showFavoritos && (
        <>
          <h2 className={styles.advogadosDisponveis}>Advogados favoritos</h2>
          <div className={styles.advogados}>
            {favoritos.map((item, index) => (
              <Advogado
                key={`fav-${index}`}
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
                favoritado
                onToggleFavorito={() => onToggleFavorito?.(item.id)}
              />
            ))}
          </div>
          <div className={styles.divisoria} />
        </>
      )}
      <h2 className={styles.advogadosDisponveis}>
        {filtroAtivo ? "Resultados da busca" : "Advogados disponíveis"}
        {filtroAtivo && (
          <span className={styles.resultadoContagem}>
            {" "}· {advogadoItems.length} encontrado{advogadoItems.length !== 1 ? "s" : ""}
          </span>
        )}
      </h2>
      {advogadoItems.length > 0 ? (
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
              favoritado={isFavorito?.(item.id)}
              onToggleFavorito={() => onToggleFavorito?.(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.semResultados}>
          <div className={styles.semResultadosTexto}>
            Nenhum advogado encontrado com esse filtro.
          </div>
          <button
            className={styles.limparFiltro}
            onClick={() => {
              window.location.reload();
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </section>
  );
};

AdvogadosDisponiveis.propTypes = {
  className: PropTypes.string,
  isFavorito: PropTypes.func,
  onToggleFavorito: PropTypes.func,
  filteredList: PropTypes.array,
  filtroAtivo: PropTypes.bool,
};

export default AdvogadosDisponiveis;
