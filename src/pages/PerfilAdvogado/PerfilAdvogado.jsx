import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Menu1 from "../../components/Menu1";
import CardAdvogado from "../../components/PerfilAdvogado/CardAdvogado";
import SobreAtuacao from "../../components/PerfilAdvogado/SobreAtuacao";
import Metricas from "../../components/PerfilAdvogado/Metricas";
import styles from "./PerfilAdvogado.module.css";

const PerfilAdvogado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const advogado = location.state?.advogado;

  const onVoltarClick = useCallback(() => {
    navigate("/advogados");
  }, [navigate]);

  return (
    <div className={styles.perfilAdvogado}>
      <Menu1 />
      <main className={styles.sessaoCompleta}>
        <section className={styles.topo}>
          <button className={styles.voltarBtn} onClick={onVoltarClick}>
            <img className={styles.voltarIcone} loading="lazy" alt="" src="/pepicons-pencil-arrow-up.svg" />
            <span className={styles.voltarTexto}>Voltar para buscas</span>
          </button>
          <h1 className={styles.titulo}>Perfil do advogado</h1>
        </section>
        <CardAdvogado
          nome={advogado?.nome}
          foto={advogado?.foto}
          areas={advogado?.areas}
          oab={advogado?.oab}
          advogadoId={advogado?.id}
        />
        <SobreAtuacao
          nome={advogado?.nome}
          areas={advogado?.areas}
        />
        <Metricas />
      </main>
    </div>
  );
};

export default PerfilAdvogado;
