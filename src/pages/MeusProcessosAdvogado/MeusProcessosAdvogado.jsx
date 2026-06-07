import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdvogado";
import Card from "../../components/Card";
import OrdenarPor from "../../components/OrdenarPor";
import Filtros from "../../components/Filtros";
import { processos, STATUS } from "../../data/processosAdvogado";
import styles from "./MeusProcessosAdvogado.module.css";

const ITENS_POR_PAGINA = 5;

const MeusProcessos = () => {
  const navigate = useNavigate();
  const [statusFiltro, setStatusFiltro] = useState(null);
  const [showOrdenarPor, setShowOrdenarPor] = useState(false);
  const [showFiltros, setShowFiltros] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const totais = {
    todos: processos.length,
    emAndamento: processos.filter((p) => p.status === STATUS.EM_ANDAMENTO).length,
    interrompido: processos.filter((p) => p.status === STATUS.INTERROMPIDO).length,
    finalizado: processos.filter((p) => p.status === STATUS.FINALIZADO).length,
  };

  const processosFiltrados = statusFiltro
    ? processos.filter((p) => p.status === statusFiltro)
    : processos;

  const totalPaginas = Math.ceil(processosFiltrados.length / ITENS_POR_PAGINA);
  const processosPagina = processosFiltrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  const handleTabClick = (status) => {
    setStatusFiltro(status);
    setPaginaAtual(1);
  };

  const handleIrParaPagina = (pagina) => {
    setPaginaAtual(pagina);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.meusProcessos}>
      <Navbar />

      <main className={styles.body}>
        <div className={styles.meusProcessosSubttulo}>
          <h1 className={styles.meusProcessos2}>Meus processos</h1>
          <div className={styles.acompanheTodosOs}>Acompanhe todos os processos</div>
        </div>

        <div className={styles.informaesIntermedirias}>
          <TabsStatus totais={totais} activeTab={statusFiltro} onTabClick={handleTabClick} />
          <BarraFiltros
            onOpenOrdenar={() => setShowOrdenarPor(true)}
            onOpenFiltros={() => setShowFiltros(true)}
          />
        </div>

        {showOrdenarPor && <OrdenarPor onClose={() => setShowOrdenarPor(false)} />}
        {showFiltros && <Filtros onClose={() => setShowFiltros(false)} />}

        <BarraPesquisa />

        <section className={styles.cards} key={statusFiltro ?? "todos"}>
          {processosPagina.map((processo) => (
            <Card key={processo.id} processo={processo} onVerProcesso={() => navigate("/detalhes-processoadvogado")} />
          ))}
        </section>

        <Paginacao
          total={processosFiltrados.length}
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onPaginaChange={handleIrParaPagina}
        />
      </main>
    </div>
  );
};

const Badge = ({ count }) => {
  const temCard = count > 0;
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: temCard ? "var(--color-floralwhite-200)" : "var(--color-gainsboro-100)" }}
    >
      <div className={styles.div}>{count}</div>
    </div>
  );
};

const TabsStatus = ({ totais, activeTab, onTabClick }) => (
  <div className={styles.sees}>
    <div
      className={activeTab === null ? styles.seoEmAndamento : styles.seoInterrompido}
      onClick={() => onTabClick(null)}
    >
      <div className={styles.seoEmAndamento2}>
        <div className={activeTab === null ? styles.emAndamento : styles.div}>
          Todos
        </div>
        <Badge count={totais.todos} />
      </div>
    </div>

    <div
      className={activeTab === STATUS.EM_ANDAMENTO ? styles.seoEmAndamento : styles.seoInterrompido}
      onClick={() => onTabClick(STATUS.EM_ANDAMENTO)}
    >
      <div className={styles.seoEmAndamento2}>
        <div className={activeTab === STATUS.EM_ANDAMENTO ? styles.emAndamento : styles.div}>
          {STATUS.EM_ANDAMENTO}
        </div>
        <Badge count={totais.emAndamento} />
      </div>
    </div>

    <div
      className={activeTab === STATUS.INTERROMPIDO ? styles.seoEmAndamento : styles.seoInterrompido}
      onClick={() => onTabClick(STATUS.INTERROMPIDO)}
    >
      <div className={styles.seoEmAndamento3}>
        <div className={activeTab === STATUS.INTERROMPIDO ? styles.emAndamento : styles.div}>
          {STATUS.INTERROMPIDO}
        </div>
        <Badge count={totais.interrompido} />
      </div>
    </div>

    <div
      className={activeTab === STATUS.FINALIZADO ? styles.seoEmAndamento : styles.seoInterrompido}
      onClick={() => onTabClick(STATUS.FINALIZADO)}
    >
      <div className={styles.seoEmAndamento4}>
        <div className={activeTab === STATUS.FINALIZADO ? styles.emAndamento : styles.div}>
          {STATUS.FINALIZADO}
        </div>
        <Badge count={totais.finalizado} />
      </div>
    </div>
  </div>
);

const BarraFiltros = ({ onOpenOrdenar, onOpenFiltros }) => (
  <div className={styles.filtros}>
    <div className={styles.ordenarPor} onClick={onOpenOrdenar}>
      <div className={styles.infoFiltro}>
        <img className={styles.vectorIcon} alt="" src="/Vector9.svg" />
        <div className={styles.ordernarPor}>Ordenar por</div>
      </div>
    </div>
    <div className={styles.filtro} onClick={onOpenFiltros}>
      <div className={styles.infoFiltro2}>
        <img className={styles.vectorIcon2} alt="" src="/Vector13.svg" />
        <div className={styles.ordernarPor}>Filtros</div>
      </div>
    </div>
  </div>
);

const BarraPesquisa = () => (
  <input
    className={styles.barraDePesquisa}
    type="text"
    placeholder="Buscar por cliente, número do processo ou assunto..."
  />
);

const Paginacao = ({ total, paginaAtual, totalPaginas, onPaginaChange }) => {
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA + 1;
  const fim = Math.min(paginaAtual * ITENS_POR_PAGINA, total);

  return (
    <footer className={styles.informaesBaixas}>
      <div className={styles.div}>
        {total === 0
          ? "Mostrando 0 a 0 de 0 processos"
          : `Mostrando ${inicio} a ${fim} de ${total} ${total === 1 ? "processo" : "processos"}`}
      </div>
      {totalPaginas > 1 && (
        <div className={styles.informaesBaixasInner}>
          <div className={styles.frameParent}>
            <img
              className={styles.frameChild}
              alt="Página anterior"
              src="/Group-84.svg"
              onClick={() => onPaginaChange(Math.max(1, paginaAtual - 1))}
            />
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
              <div
                key={pagina}
                className={`${styles.paginaBtn} ${pagina === paginaAtual ? styles.paginaAtiva : styles.paginaInativa}`}
                onClick={() => onPaginaChange(pagina)}
              >
                <div className={styles.div4}>{pagina}</div>
              </div>
            ))}
            <img
              className={styles.frameChild}
              alt="Próxima página"
              src="/Group-83.svg"
              onClick={() => onPaginaChange(Math.min(totalPaginas, paginaAtual + 1))}
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default MeusProcessos;
