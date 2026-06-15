import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdvogado";
import ConsultaCard from "../../components/ConsultaCard";
import OrdenarPor from "../../components/OrdenarPor";
import { consultas as dataConsultas } from "../../data/consultas";
import styles from "./AgendaMinhasConsultas.module.css";

const SIDEBAR_ITENS = [
  { id: "calendario", label: "Calendário", icone: "/Icone-calendario.svg" },
  { id: "minhas-consultas", label: "Minhas consultas", icone: "/Icone-minhas-consultas.svg" },
];

const ITENS_POR_PAGINA = 5;

const AgendaMinhasConsultas = () => {
  const navigate = useNavigate();
  const [secaoAtiva, setSecaoAtiva] = useState("minhas-consultas");
  const [consultas, setConsultas] = useState(dataConsultas);
  const [filtroAtivo, setFiltroAtivo] = useState("agendamento");
  const [mostrarOrdenarPor, setMostrarOrdenarPor] = useState(false);
  const [sortBy, setSortBy] = useState("recentes");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const toggleExpandido = (id) => {
    setConsultas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expandido: !c.expandido } : c))
    );
  };

  const consultasOrdenadas = [...consultas].sort((a, b) => {
    switch (sortBy) {
      case "antigos": {
        const [da, ma, aa] = a.data.split("/").map(Number);
        const [db, mb, ab] = b.data.split("/").map(Number);
        const dateA = new Date(aa, ma - 1, da);
        const dateB = new Date(ab, mb - 1, db);
        return dateA - dateB || a.horario.localeCompare(b.horario);
      }
      case "nome-az":
        return a.cliente.nome.localeCompare(b.cliente.nome);
      case "nome-za":
        return b.cliente.nome.localeCompare(a.cliente.nome);
      default: {
        const [da, ma, aa] = a.data.split("/").map(Number);
        const [db, mb, ab] = b.data.split("/").map(Number);
        const dateA = new Date(aa, ma - 1, da);
        const dateB = new Date(ab, mb - 1, db);
        return dateB - dateA || b.horario.localeCompare(a.horario);
      }
    }
  });

  const consultasFiltradas = consultasOrdenadas.filter((c) =>
    filtroAtivo === "agendamento"
      ? c.status === "Em agendamento"
      : c.status === "Finalizada"
  );

  const totalPaginas = Math.ceil(consultasFiltradas.length / ITENS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const consultasPaginadas = consultasFiltradas.slice(inicio, inicio + ITENS_POR_PAGINA);

  const handleFiltroChange = (filtro) => {
    setFiltroAtivo(filtro);
    setPaginaAtual(1);
  };

  const handleSort = (id) => {
    setSortBy(id);
    setPaginaAtual(1);
  };

  return (
    <div className={styles.agendaMinhasConsultas}>
      <Navbar />

      <main className={styles.mainBody}>
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            {SIDEBAR_ITENS.map(({ id, label, icone }) => (
              <button
                key={id}
                className={secaoAtiva === id ? styles.sidebarItemAtivo : styles.sidebarItem}
                onClick={() => {
                  setSecaoAtiva(id);
                  if (id === "calendario") navigate("/calendarioadvogado");
                }}
              >
                <img className={styles.sidebarIcone} alt="" src={icone} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className={styles.bodyConsultas}>
          <div className={styles.bodyConsultas2}>
            <div className={styles.bodyConsultas3}>
              <div className={styles.minhasConsultasSubtitulo}>
                <div className={styles.minhasConsultas5}>
                  <h1 className={styles.minhasConsultas6}>Minhas consultas</h1>
                </div>
                <div className={styles.acompanheTodasAsSuasConsul}>
                  <div className={styles.acompanheTodasAs}>
                    Acompanhe todas as suas consultas.
                  </div>
                </div>
              </div>

              <FiltroBar
                filtroAtivo={filtroAtivo}
                onFiltroChange={handleFiltroChange}
                onOrdenarClick={() => setMostrarOrdenarPor(true)}
                totalAgendamento={consultas.filter((c) => c.status === "Em agendamento").length}
                totalFinalizadas={consultas.filter((c) => c.status === "Finalizada").length}
              />

              <div className={styles.cardsDeConsulta}>
                {consultasPaginadas.length > 0 ? (
                  consultasPaginadas.map((consulta) => (
                    <ConsultaCard
                      key={consulta.id}
                      consulta={consulta}
                      onToggle={() => toggleExpandido(consulta.id)}
                    />
                  ))
                ) : (
                  <div className={styles.semResultados}>
                    {filtroAtivo === "agendamento"
                      ? "Nenhuma consulta em agendamento"
                      : "Você ainda não tem consultas finalizadas"}
                  </div>
                )}
              </div>

              <Paginacao
                total={consultasFiltradas.length}
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPaginaChange={setPaginaAtual}
              />
            </div>
          </div>
        </section>
      </main>

      {mostrarOrdenarPor && (
        <OrdenarPor onClose={() => setMostrarOrdenarPor(false)} onSort={handleSort} />
      )}
    </div>
  );
};



const FiltroBar = ({ filtroAtivo, onFiltroChange, onOrdenarClick, totalAgendamento, totalFinalizadas }) => (
  <div className={styles.filtros}>
    <div className={styles.filtroConsulta}>
      <div
        className={`${styles.botoEmAgendamento} ${filtroAtivo === "agendamento" ? styles.botoAtivo : ""}`}
        onClick={() => onFiltroChange("agendamento")}
      >
        <div className={styles.emAgendamento4}>Em agendamento ({totalAgendamento})</div>
      </div>
      <div
        className={`${styles.botoFinalizadas} ${filtroAtivo === "finalizadas" ? styles.botoAtivo : ""}`}
        onClick={() => onFiltroChange("finalizadas")}
      >
        <div className={styles.emAgendamento4}>Finalizadas ({totalFinalizadas})</div>
      </div>
    </div>
    <div className={styles.ordenarPor} onClick={onOrdenarClick}>
      <div className={styles.infoFiltro}>
        <img className={styles.vectorIcon3} alt="" src="/Vector9.svg" />
        <div className={styles.ordernarPor}>Ordenar por</div>
      </div>
    </div>
  </div>
);

const Paginacao = ({ total, paginaAtual, totalPaginas, onPaginaChange }) => {
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA + 1;
  const fim = Math.min(paginaAtual * ITENS_POR_PAGINA, total);

  return (
    <div className={styles.resultadosNavResultados}>
      <div className={styles.acompanheTodasAs}>
        Mostrando {inicio} a {fim} de {total} consultas
      </div>
      <div className={styles.resultadosNavResultadosInner}>
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
              <div className={styles.div}>{pagina}</div>
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
    </div>
  );
};

export default AgendaMinhasConsultas;
