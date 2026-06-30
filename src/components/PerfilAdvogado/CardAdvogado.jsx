import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritos } from "../../hooks/useFavoritos";
import PropTypes from "prop-types";
import styles from "./CardAdvogado.module.css";

const CardAdvogado = ({
  className = "",
  nome = "Dra. Beatriz Oliveira",
  foto = "/Foto-Adv@2x.png",
  areas = ["Consumidor", "Cível", "Trabalhista"],
  oab = "OAB/SP 123.456",
  advogadoId,
}) => {
  const navigate = useNavigate();
  const { isFavorito, toggleFavorito } = useFavoritos();
  const favoritado = advogadoId ? isFavorito(advogadoId) : false;

  const onAgendarClick = useCallback(() => {
    navigate("/agendar-consulta", { state: { advogado: { nome, foto, areas, oab } } });
  }, [navigate, nome, foto, areas, oab]);

  const handleToggleFavorito = useCallback(() => {
    if (advogadoId) toggleFavorito(advogadoId);
  }, [advogadoId, toggleFavorito]);

  return (
    <section className={`${styles.card} ${className}`}>
      <div className={styles.sessao1Horizontal}>
        <div className={styles.advogado}>
          <img className={styles.fotoAdvIcon} loading="lazy" alt="" src={foto} />
          <div className={styles.informaesAdv}>
            <div className={styles.mensagemVocEstAgendando}>
              <h3 className={styles.label}>Você está agendando com</h3>
            </div>
            <div className={styles.nomeAdv}>
              <h2 className={styles.nome}>{nome}</h2>
            </div>
            <div className={styles.descrioAdv}>
              <div className={styles.linhaArea}>
                <img className={styles.iconeBalança} alt="" src="/cone-balan-a.svg" />
                <h3 className={styles.label}>{areas.join("  •  ")}</h3>
              </div>
              <div className={styles.linhaOab}>
                <img className={styles.iconeOab} alt="" src="/OAB.png" />
                <h3 className={styles.label}>{oab}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sessao2Horizontal}>
        <div
          className={styles.favoritos}
          onClick={handleToggleFavorito}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleToggleFavorito();
          }}
        >
          <img
            className={styles.iconeMd}
            loading="lazy"
            alt=""
            src={favoritado ? "/mdi-heart-filled.svg" : "/mdi-heart-outline.svg"}
          />
          <h3 className={styles.textoFavoritos}>Salvar nos favoritos</h3>
        </div>
        <div className={styles.btnWhatsapp} onClick={onAgendarClick}>
          <div className={styles.btnWhatsappInner}>
            <div className={styles.btnWhats}>
              <b className={styles.agendarConsulta}>Agendar consulta</b>
              <img className={styles.iconeMd} alt="" src="/whatsapp.svg" />
            </div>
            <div className={styles.rodapeWhats}>Será direcionado para o Whatsapp</div>
          </div>
        </div>
      </div>
    </section>
  );
};

CardAdvogado.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string,
  foto: PropTypes.string,
  areas: PropTypes.arrayOf(PropTypes.string),
  oab: PropTypes.string,
  advogadoId: PropTypes.string,
};

export default CardAdvogado;
