import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Advogado.module.css";

const Advogado = ({
  className = "",
  onAdvogadoClick,
  fotoDoAdvogadoJustifyContent,
  geminiGeneratedImageBkgpjbk,
  geminiGeneratedImageBkgpjbBorderRadius,
  draBeatrizOliveira,
  consumidorCvelTrabalhista,
  consumidorCvelAlignSelf,
  consumidorCvelDisplay,
  favoritado,
  onToggleFavorito,
}) => {
  const fotoDoAdvogadoStyle = useMemo(() => {
    return {
      justifyContent: fotoDoAdvogadoJustifyContent,
    };
  }, [fotoDoAdvogadoJustifyContent]);

  const geminiGeneratedImageBk5gpjbIconStyle = useMemo(() => {
    return {
      borderRadius: geminiGeneratedImageBkgpjbBorderRadius,
    };
  }, [geminiGeneratedImageBkgpjbBorderRadius]);

  const consumidorCvelStyle = useMemo(() => {
    return {
      alignSelf: consumidorCvelAlignSelf,
      display: consumidorCvelDisplay,
    };
  }, [consumidorCvelAlignSelf, consumidorCvelDisplay]);

  const onAdvogadoClick1 = useCallback(() => {
    // Please sync "Perfil advogado" to the project
  }, []);

  return (
    <section
      className={[styles.advogado, className].join(" ")}
      onClick={onAdvogadoClick}
    >
      <div className={styles.fotoDoAdvogado} style={fotoDoAdvogadoStyle}>
        <img
          className={styles.geminiGeneratedImageBk5gpjbIcon}
          loading="lazy"
          alt=""
          src={geminiGeneratedImageBkgpjbk}
          style={geminiGeneratedImageBk5gpjbIconStyle}
        />
        <div className={styles.nomeDoAdvogado}>
          <h2 className={styles.draBeatrizOliveira}>{draBeatrizOliveira}</h2>
          <h3 className={styles.consumidorCvel} style={consumidorCvelStyle}>
            {consumidorCvelTrabalhista}
          </h3>
        </div>
      </div>
      <div className={styles.setinha}>
        <div className={styles.tipoDeAtendimento}>
          <div className={styles.icones}>
            <button
              className={styles.botaoFavorito}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorito?.();
              }}
              type="button"
              aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <img
                className={styles.iconeCoracao}
                alt=""
                src={favoritado ? "/mdi-heart-filled.svg" : "/mdi-heart-outline.svg"}
              />
            </button>
            <img
              className={styles.materialSymbolsmonitorOutliIcon}
              alt=""
              src="/material-symbols-monitor-outline.svg"
            />
            <img
              className={styles.materialSymbolsmonitorOutliIcon}
              alt=""
              src="/tabler-map-pin.svg"
            />
          </div>
          <h3 className={styles.atendimentoOnlineE}>
            Atendimento online e presencial
          </h3>
        </div>
        <img
          className={styles.setinha1}
          loading="lazy"
          alt=""
          src="/setinha-11@2x.png"
        />
      </div>
    </section>
  );
};

Advogado.propTypes = {
  className: PropTypes.string,
  geminiGeneratedImageBkgpjbk: PropTypes.string,
  draBeatrizOliveira: PropTypes.string,
  consumidorCvelTrabalhista: PropTypes.string,
  favoritado: PropTypes.bool,
  /** Style props */
  fotoDoAdvogadoJustifyContent: PropTypes.string,
  geminiGeneratedImageBkgpjbBorderRadius: PropTypes.string,
  consumidorCvelAlignSelf: PropTypes.string,
  consumidorCvelDisplay: PropTypes.string,
  /** Action props */
  onAdvogadoClick: PropTypes.func,
  onToggleFavorito: PropTypes.func,
};

export default Advogado;
