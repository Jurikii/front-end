import { useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CabecalhoProcessos from "./components/CabecalhoProcessos";
import CardProcesso from "./components/CardProcesso";
import { FILTROS, PROCESSOS, STATUS } from "./data/processos";
import styles from "./MeusProcessos.module.css";
import Menu1 from "../../components/Menu1";

const FILTRO_PADRAO = FILTROS[0].id;

const MeusProcessos = () => {
  const [searchParams] = useSearchParams();
  const filtroInicial = useMemo(() => {
    const param = searchParams.get("filtro");
    if (param && FILTROS.some((f) => f.id === param)) return param;
    return FILTRO_PADRAO;
  }, []);
  const [filtroAtivo, setFiltroAtivo] = useState(filtroInicial);
  const navigate = useNavigate();

  const handleAcaoProcesso = useCallback((processoId, acaoId) => {
    if (acaoId === "ver") {
      navigate(`/processos/${processoId}`);
    }
  }, [navigate]);

  const handleFiltroChange = useCallback((filtroId) => {
    setFiltroAtivo(filtroId);
  }, []);

  const processosFiltrados = useMemo(() => {
    switch (filtroAtivo) {
      case "ativos":
        return PROCESSOS.filter((p) => p.status === STATUS.EM_ANDAMENTO || p.status === STATUS.AGUARDANDO);
      case "encerrados":
        return PROCESSOS.filter((p) => p.status === STATUS.ENCERRADO);
      case "consultas":
        return [];
      default:
        return [];
    }
  }, [filtroAtivo]);

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
