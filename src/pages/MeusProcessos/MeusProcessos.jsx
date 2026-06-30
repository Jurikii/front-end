import { useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CabecalhoProcessos from "./components/CabecalhoProcessos";
import CardProcesso from "./components/CardProcesso";
import { FILTROS, PROCESSOS, STATUS } from "./data/processos";
import styles from "./MeusProcessos.module.css";
import Menu1 from "../../components/Menu1";
import OrdenarPor from "../../components/OrdenarPor";
import Filtros from "../../components/Filtros";

const FILTRO_PADRAO = FILTROS[0].id;

function parseDataBR(dataStr) {
  const [dia, mes, ano] = dataStr.split("/").map(Number);
  return new Date(ano, mes - 1, dia);
}

const BarraFiltros = ({ onOpenOrdenar, onOpenFiltros }) => (
  <div className={styles.barraFiltros}>
    <div className={styles.ordenarPor} onClick={onOpenOrdenar}>
      <div className={styles.infoFiltro}>
        <img className={styles.vectorIcon} alt="" src="/Vector9.svg" />
        <div className={styles.ordernarTexto}>Ordenar por</div>
      </div>
    </div>
    <div className={styles.filtroBtn} onClick={onOpenFiltros}>
      <div className={styles.infoFiltro2}>
        <img className={styles.vectorIcon2} alt="" src="/Vector13.svg" />
        <div className={styles.ordernarTexto}>Filtros</div>
      </div>
    </div>
  </div>
);

const MeusProcessos = () => {
  const [searchParams] = useSearchParams();
  const filtroInicial = useMemo(() => {
    const param = searchParams.get("filtro");
    if (param && FILTROS.some((f) => f.id === param)) return param;
    return FILTRO_PADRAO;
  }, []);
  const [filtroAtivo, setFiltroAtivo] = useState(filtroInicial);
  const [showOrdenarPor, setShowOrdenarPor] = useState(false);
  const [showFiltros, setShowFiltros] = useState(false);
  const [sortOption, setSortOption] = useState("recentes");
  const [filtrosAplicados, setFiltrosAplicados] = useState(null);
  const navigate = useNavigate();

  const handleAcaoProcesso = useCallback((processoId, acaoId) => {
    if (acaoId === "ver") {
      navigate(`/processos/${processoId}`);
    }
  }, [navigate]);

  const handleFiltroChange = useCallback((filtroId) => {
    setFiltroAtivo(filtroId);
  }, []);

  const contagens = useMemo(() => ({
    ativos: PROCESSOS.filter((p) => p.status === STATUS.EM_ANDAMENTO || p.status === STATUS.AGUARDANDO).length,
    encerrados: PROCESSOS.filter((p) => p.status === STATUS.ENCERRADO).length,
    consultas: PROCESSOS.filter((p) => p.status === STATUS.AGENDADO || p.status === STATUS.REALIZADO).length,
  }), []);

  const processosBase = useMemo(() => {
    switch (filtroAtivo) {
      case "ativos":
        return PROCESSOS.filter((p) => p.status === STATUS.EM_ANDAMENTO || p.status === STATUS.AGUARDANDO);
      case "encerrados":
        return PROCESSOS.filter((p) => p.status === STATUS.ENCERRADO);
      case "consultas":
        return PROCESSOS.filter((p) => p.status === STATUS.AGENDADO || p.status === STATUS.REALIZADO);
      default:
        return [];
    }
  }, [filtroAtivo]);

  const processosFiltrados = useMemo(() => {
    let lista = [...processosBase];
    if (filtrosAplicados) {
      lista = lista.filter((p) => {
        const areasAtivas = Object.entries(filtrosAplicados.areas).filter(([, v]) => v).map(([k]) => k);
        if (areasAtivas.length > 0 && !areasAtivas.includes(p.categoria)) return false;

        if (filtrosAplicados.processo && !p.numeroProcesso.includes(filtrosAplicados.processo)) return false;

        if (filtrosAplicados.dataAtual) {
          const dataProcesso = parseDataBR(p.atualizadoEm);
          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);
          if (filtrosAplicados.dataAtual === "Hoje") {
            if (dataProcesso.getTime() !== hoje.getTime()) return false;
          } else if (filtrosAplicados.dataAtual === "Últimos 7 dias") {
            const limite = new Date(hoje);
            limite.setDate(hoje.getDate() - 7);
            if (dataProcesso < limite) return false;
          } else if (filtrosAplicados.dataAtual === "Últimos 30 dias") {
            const limite = new Date(hoje);
            limite.setDate(hoje.getDate() - 30);
            if (dataProcesso < limite) return false;
          }
        }

        return true;
      });
    }
    switch (sortOption) {
      case "recentes":
        lista.sort((a, b) => parseDataBR(b.atualizadoEm) - parseDataBR(a.atualizadoEm));
        break;
      case "antigos":
        lista.sort((a, b) => parseDataBR(a.atualizadoEm) - parseDataBR(b.atualizadoEm));
        break;
    }
    return lista;
  }, [processosBase, sortOption, filtrosAplicados]);

  return (
    <div className={styles.pagina}>
      <Menu1 />

      

      <main className={styles.conteudo}>
        <CabecalhoProcessos
          filtroAtivo={filtroAtivo}
          onFiltroChange={handleFiltroChange}
          contagens={contagens}
        />

        <BarraFiltros
          onOpenOrdenar={() => setShowOrdenarPor(true)}
          onOpenFiltros={() => setShowFiltros(true)}
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

      {showOrdenarPor && (
        <OrdenarPor
          onClose={() => setShowOrdenarPor(false)}
          onSort={setSortOption}
          selecionado={sortOption}
          hideCliente
        />
      )}
      {showFiltros && (
        <Filtros
          onClose={() => setShowFiltros(false)}
          onAplicar={(f) => setFiltrosAplicados(f)}
          onLimpar={() => setFiltrosAplicados(null)}
          valores={filtrosAplicados}
          hideCliente
        />
      )}
    </div>
  );
};

export default MeusProcessos;
