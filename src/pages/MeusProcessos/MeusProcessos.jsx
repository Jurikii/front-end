import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CabecalhoProcessos from "./components/CabecalhoProcessos";
import CardProcesso from "./components/CardProcesso";
import { FILTROS, PROCESSOS } from "./data/processos";
import styles from "./MeusProcessos.module.css";
import Menu1 from "../../components/Menu1";

const FILTRO_PADRAO = FILTROS[0].id;

const MeusProcessos = () => {
  const [filtroAtivo, setFiltroAtivo] = useState(FILTRO_PADRAO);
  const navigate = useNavigate();

  const handleAcaoProcesso = useCallback((processoId, acaoId) => {
    if (acaoId === "ver") {
      navigate(`/processos/${processoId}`);
    }
  }, [navigate]);

  const handleFiltroChange = useCallback((filtroId) => {
    setFiltroAtivo(filtroId);
  }, []);

  const processosFiltrados = filtroAtivo === "ativos" ? PROCESSOS : [];

  return (
    <div className={styles.pagina}>
      <Menu1 />

      

      <main className={styles.conteudo}>
        <CabecalhoProcessos
          filtroAtivo={filtroAtivo}
          onFiltroChange={handleFiltroChange}
        />

        <section className={styles.listaProcessos}>
          {processosFiltrados.map((processo) => (
            <CardProcesso
              key={processo.id}
              categoria={processo.categoria}
              titulo={processo.titulo}
              numeroProcesso={processo.numeroProcesso}
              advogado={processo.advogado}
              atualizadoEm={processo.atualizadoEm}
              status={processo.status}
              onAcao={(acaoId) => handleAcaoProcesso(processo.id, acaoId)}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default MeusProcessos;
