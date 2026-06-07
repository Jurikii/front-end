import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import Navbar from "../../components/NavbarAdvogado";
import Sidebar from "../../components/Sidebar";
import LinhaDeDias from "../../components/LinhaDeDias";
import CardConsulta from "../../components/CardConsulta";
import styles from "./AgendaCalendario.module.css";

const DIAS_DA_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const DIAS_DA_SEMANA_EXT = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];
const MESES_ABR = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];
const ANOS_DISPONIVEIS = [2026, 2027, 2028, 2029, 2030];

function gerarCalendario(mes, ano) {
  const primeiroDia = new Date(ano, mes, 1);
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const diaSemanaPrimeiro = primeiroDia.getDay();
  const ultimoDiaAnterior = new Date(ano, mes, 0).getDate();

  const cells = [];
  const isForaDoMes = [];

  for (let i = diaSemanaPrimeiro - 1; i >= 0; i--) {
    cells.push(String(ultimoDiaAnterior - i));
    isForaDoMes.push(true);
  }
  for (let d = 1; d <= diasNoMes; d++) {
    cells.push(String(d));
    isForaDoMes.push(false);
  }

  const resto = cells.length % 7;
  if (resto > 0) {
    for (let d = 1; d <= 7 - resto; d++) {
      cells.push(String(d));
      isForaDoMes.push(true);
    }
  }

  const semanas = [];
  for (let i = 0; i < cells.length; i += 7) {
    semanas.push({
      dias: cells.slice(i, i + 7),
      diasForaDoMes: isForaDoMes.slice(i, i + 7),
    });
  }

  return { nome: `${MESES[mes]} de ${ano}`, semanas, diasNoMes };
}

const CONSULTAS_POR_DIA = {
  3: [
    { nomeCliente: "Carlos Oliveira", assunto: "Revisão contratual", horario: "08:30" },
    { nomeCliente: "Ana Beatriz", assunto: "Abertura de empresa", horario: "10:00" },
  ],
  7: [
    { nomeCliente: "Rafael Costa", assunto: "Inventário", horario: "09:00" },
    { nomeCliente: "Juliana Mendes", assunto: "Pensão alimentícia", horario: "11:00" },
    { nomeCliente: "Lucas Pereira", assunto: "Direito imobiliário", horario: "15:30" },
  ],
  10: [
    { nomeCliente: "Fernanda Lima", assunto: "Contrato de locação", horario: "07:45" },
  ],
  12: [
    { nomeCliente: "Pedro Alves", assunto: "Divórcio litigioso", horario: "09:30" },
    { nomeCliente: "Camila Rocha", assunto: "Regulamentação de visitas", horario: "11:00" },
  ],
  15: [
    { nomeCliente: "Thiago Martins", assunto: "Defesa do consumidor", horario: "08:00" },
    { nomeCliente: "Larissa Dias", assunto: "Acidente de trabalho", horario: "10:30" },
    { nomeCliente: "Gustavo Nunes", assunto: "Cobrança judicial", horario: "14:00" },
    { nomeCliente: "Patrícia Campos", assunto: "Mediação familiar", horario: "16:00" },
  ],
  18: [
    { nomeCliente: "Diego Barbosa", assunto: "Usucapião", horario: "10:00" },
    { nomeCliente: "Tatiane Freitas", assunto: "Danos morais", horario: "13:00" },
  ],
  22: [
    { nomeCliente: "André Santos", assunto: "Direito previdenciário", horario: "09:00" },
    { nomeCliente: "Bianca Torres", assunto: "Acordo extrajudicial", horario: "11:30" },
    { nomeCliente: "Felipe Cardoso", assunto: "Propriedade intelectual", horario: "15:00" },
  ],
  25: [
    { nomeCliente: "Roberta Azevedo", assunto: "Separação judicial", horario: "08:15" },
  ],
  28: [
    { nomeCliente: "Eduardo Gomes", assunto: "Improbidade administrativa", horario: "09:00" },
    { nomeCliente: "Vanessa Oliveira", assunto: "Direitos autorais", horario: "10:30" },
    { nomeCliente: "Marcelo Ribeiro", assunto: "Contrato de prestação", horario: "14:30" },
  ],
  30: [
    { nomeCliente: "Amanda Farias", assunto: "Dissolução de união estável", horario: "11:00" },
  ],
};

const DIAS_COM_BOLINHA = new Set([3, 7, 10, 12, 15, 18, 22, 25, 28, 30]);
const DIAS_SEMANA_NOMES = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado",
];



function obterSemanaDoDia(dia, mes, ano) {
  const data = new Date(ano, mes, dia);
  const diaSemana = data.getDay();
  const inicio = new Date(ano, mes, dia);
  inicio.setDate(inicio.getDate() - diaSemana);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(inicio);
    d.setDate(inicio.getDate() + i);
    return d;
  });
}

const AgendaCalendario = () => {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [visaoAtual, setVisaoAtual] = useState("mes");
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());
  const [modoRetangulo, setModoRetangulo] = useState(false);
  const [mostrarSeletorMes, setMostrarSeletorMes] = useState(false);
  const [diaHovered, setDiaHovered] = useState(null);
  const [posPanel, setPosPanel] = useState({ left: 0, top: 0 });
  const timeoutRef = useRef(null);
  const bolinhaElRef = useRef(null);
  const painelRef = useRef(null);
  const mostrarTodasConsultas = true;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const GAP = 8;

  const posicionarPainel = useCallback(() => {
    if (!bolinhaElRef.current) return;
    const rect = bolinhaElRef.current.getBoundingClientRect();
    const left = rect.right + GAP;
    const altura = painelRef.current ? painelRef.current.offsetHeight : 0;
    const top = altura > 0 && window.innerHeight - rect.top < altura
      ? Math.max(GAP, rect.bottom - altura)
      : rect.top;
    setPosPanel({ left, top });
  }, []);

  useEffect(() => {
    if (diaHovered === null) return;

    const handleScroll = () => posicionarPainel();

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [diaHovered, posicionarPainel]);

  useLayoutEffect(() => {
    if (diaHovered !== null && painelRef.current) {
      posicionarPainel();
    }
  }, [diaHovered, posicionarPainel]);

  const handleBolinhaEnter = useCallback((dia, pos, el) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    bolinhaElRef.current = el;
    setDiaHovered(dia);
    setPosPanel(pos);
  }, []);

  const handleBolinhaLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setDiaHovered(null);
      bolinhaElRef.current = null;
    }, 300);
  }, []);

  const handlePainelEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handlePainelLeave = useCallback(() => {
    setDiaHovered(null);
    bolinhaElRef.current = null;
  }, []);

  const mesData = useMemo(() => gerarCalendario(mesAtual, anoAtual), [mesAtual, anoAtual]);

  const exibirBolinhas = mesAtual === 5 && anoAtual === 2026;
  const semanasComBolinha = mesData.semanas.map((semana) => ({
    ...semana,
    qtdConsultas: semana.dias.map((dia, i) =>
      exibirBolinhas && !semana.diasForaDoMes[i] && DIAS_COM_BOLINHA.has(Number(dia))
        ? (CONSULTAS_POR_DIA[Number(dia)]?.length || 0)
        : 0
    ),
    dadosConsultas: semana.dias.map((dia, i) =>
      exibirBolinhas && !semana.diasForaDoMes[i] && DIAS_COM_BOLINHA.has(Number(dia))
        ? (CONSULTAS_POR_DIA[Number(dia)] || [])
        : []
    ),
  }));

  const diaHoveredData = diaHovered !== null
    ? new Date(anoAtual, mesAtual, diaHovered)
    : null;
  const diaHoveredLabel = diaHoveredData
    ? `${DIAS_SEMANA_NOMES[diaHoveredData.getDay()]}, ${String(diaHovered).padStart(2, "0")}/${String(mesAtual + 1).padStart(2, "0")}`
    : "";

  const consultasDoDia = diaHovered !== null
    ? (CONSULTAS_POR_DIA[diaHovered] || [])
    : [];
  const consultasVisiveis = mostrarTodasConsultas
    ? consultasDoDia
    : consultasDoDia.slice(0, 2);

  const consultasDoDiaSelecionado = (mesAtual === 5 && anoAtual === 2026)
    ? (CONSULTAS_POR_DIA[diaSelecionado] || [])
    : [];

  const insights = useMemo(() => {
    const agora = new Date();
    const hoje = agora.getDate();
    const horaAtual = agora.getHours() * 60 + agora.getMinutes();

    const consultasFlat = [];
    for (const dia in CONSULTAS_POR_DIA) {
      CONSULTAS_POR_DIA[dia].forEach((c) => {
        consultasFlat.push({ ...c, dia: Number(dia) });
      });
    }

    const total = consultasFlat.length;

    const horarioContagem = {};
    consultasFlat.forEach((c) => {
      horarioContagem[c.horario] = (horarioContagem[c.horario] || 0) + 1;
    });
    const horarioMaisEscolhido = Object.entries(horarioContagem).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "—";

    const assuntoContagem = {};
    consultasFlat.forEach((c) => {
      assuntoContagem[c.assunto] = (assuntoContagem[c.assunto] || 0) + 1;
    });
    const assuntoMaisRecorrente = Object.entries(assuntoContagem).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "—";

    const finalizadas = consultasFlat.filter((c) => {
      if (c.dia < hoje) return true;
      if (c.dia > hoje) return false;
      const [h, m] = c.horario.split(":").map(Number);
      return h * 60 + m < horaAtual;
    }).length;

    return { total, horarioMaisEscolhido, assuntoMaisRecorrente, finalizadas };
  }, []);

  const [termoBusca, setTermoBusca] = useState("");

  const todasConsultas = useMemo(() => {
    const consultas = [];
    for (const dia in CONSULTAS_POR_DIA) {
      CONSULTAS_POR_DIA[dia].forEach((c) => {
        consultas.push({ ...c, dia: Number(dia) });
      });
    }
    return consultas;
  }, []);

  const resultadosBusca = useMemo(() => {
    if (!termoBusca.trim()) return [];
    const termo = termoBusca.trim().toLowerCase();
    return todasConsultas.filter(
      (c) =>
        c.nomeCliente.toLowerCase().includes(termo) ||
        c.assunto.toLowerCase().includes(termo)
    );
  }, [termoBusca, todasConsultas]);

  const irParaAnterior = () => {
    if (visaoAtual === "dia") {
      const novaData = new Date(anoAtual, mesAtual, diaSelecionado - 1);
      setDiaSelecionado(novaData.getDate());
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
    } else if (visaoAtual === "semana") {
      const novaData = new Date(anoAtual, mesAtual, diaSelecionado - 7);
      setDiaSelecionado(novaData.getDate());
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
    } else {
      if (mesAtual === 0) {
        setMesAtual(11);
        setAnoAtual((a) => a - 1);
      } else {
        setMesAtual((m) => m - 1);
      }
    }
  };

  const irParaProximo = () => {
    if (visaoAtual === "dia") {
      const novaData = new Date(anoAtual, mesAtual, diaSelecionado + 1);
      setDiaSelecionado(novaData.getDate());
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
    } else if (visaoAtual === "semana") {
      const novaData = new Date(anoAtual, mesAtual, diaSelecionado + 7);
      setDiaSelecionado(novaData.getDate());
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
    } else {
      if (mesAtual === 11) {
        setMesAtual(0);
        setAnoAtual((a) => a + 1);
      } else {
        setMesAtual((m) => m + 1);
      }
    }
  };

  const tituloVisao = useMemo(() => {
    if (visaoAtual === "dia") {
      const d = new Date(anoAtual, mesAtual, diaSelecionado);
      return `${DIAS_DA_SEMANA_EXT[d.getDay()]}, ${String(diaSelecionado).padStart(2, "0")} de ${MESES[mesAtual]} de ${anoAtual}`;
    }
    if (visaoAtual === "semana") {
      const semana = obterSemanaDoDia(diaSelecionado, mesAtual, anoAtual);
      const primeiro = semana[0];
      const ultimo = semana[6];
      const mesmoMes = primeiro.getMonth() === ultimo.getMonth();
      if (mesmoMes) {
        return `${String(primeiro.getDate()).padStart(2, "0")} a ${String(ultimo.getDate()).padStart(2, "0")} de ${MESES[primeiro.getMonth()]} de ${primeiro.getFullYear()}`;
      }
      return `${String(primeiro.getDate()).padStart(2, "0")} de ${MESES_ABR[primeiro.getMonth()]} a ${String(ultimo.getDate()).padStart(2, "0")} de ${MESES_ABR[ultimo.getMonth()]} de ${ultimo.getFullYear()}`;
    }
    return mesData.nome;
  }, [visaoAtual, mesAtual, anoAtual, diaSelecionado, mesData.nome]);

  const semanaDias = useMemo(() => {
    if (visaoAtual !== "semana") return [];
    const datas = obterSemanaDoDia(diaSelecionado, mesAtual, anoAtual);
    const exibirConsultas = mesAtual === 5 && anoAtual === 2026;
    return datas.map((data) => {
      const dia = data.getDate();
      const foraDoMes = data.getMonth() !== mesAtual;
      const temConsulta = exibirConsultas && !foraDoMes && DIAS_COM_BOLINHA.has(dia);
      return {
        dia: String(dia),
        foraDoMes,
        qtd: temConsulta ? (CONSULTAS_POR_DIA[dia]?.length || 0) : 0,
        consultas: temConsulta ? (CONSULTAS_POR_DIA[dia] || []) : [],
      };
    });
  }, [visaoAtual, diaSelecionado, mesAtual, anoAtual]);

  const handleFiltroClick = (visao) => {
    setVisaoAtual(visao);
  };

  return (
    <div className={styles.pagina}>
      <Navbar />

      <main className={styles.conteudo}>
        <Sidebar />

        <section className={styles.calendarioSecao}>
          <div className={styles.calendarioCard}>
            <div className={styles.calendarioConteudo}>

              <div className={styles.cabecalho}>
                <h1 className={styles.titulo}>Calendário</h1>
                <p className={styles.subtitulo}>Visualize e gerencie suas consultas.</p>

                <div className={styles.insightsRow}>
                  <div className={styles.insightCard}>
                    <span className={styles.insightValor}>{insights.total}</span>
                    <span className={styles.insightRotulo}>Consultas no mês</span>
                  </div>
                  <div className={styles.insightCard}>
                    <span className={styles.insightValor}>{insights.horarioMaisEscolhido}</span>
                    <span className={styles.insightRotulo}>Horário mais escolhido</span>
                  </div>
                  <div className={styles.insightCard}>
                    <span className={styles.insightValor}>{insights.assuntoMaisRecorrente}</span>
                    <span className={styles.insightRotulo}>Assunto mais recorrente</span>
                  </div>
                  <div className={styles.insightCard}>
                    <span className={styles.insightValor}>{insights.finalizadas}</span>
                    <span className={styles.insightRotulo}>Consultas finalizadas</span>
                  </div>
                </div>

                <div className={styles.buscaContainer}>
                  <input
                    className={styles.campoBusca}
                    type="text"
                    placeholder="Buscar por nome ou assunto..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                  {termoBusca && (
                    <button
                      className={styles.limparBusca}
                      onClick={() => setTermoBusca("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {termoBusca ? (
                <div className={styles.resultadosBusca}>
                  <h2 className={styles.resultadosTitulo}>
                    {resultadosBusca.length > 0
                      ? `${resultadosBusca.length} consulta(s) encontrada(s)`
                      : "Nenhuma consulta encontrada"}
                  </h2>
                  <div className={styles.resultadosLista}>
                    {resultadosBusca.map((c, i) => (
                      <CardConsulta
                        key={i}
                        nomeCliente={c.nomeCliente}
                        assunto={c.assunto}
                        horario={c.horario}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.controlesWrapper}>
                    <div className={styles.mesNavegacao}>
                      <button
                        className={styles.btnMes}
                        onClick={irParaProximo}
                        aria-label="Próximo"
                      >
                        ‹
                      </button>


                      <button
                        className={styles.mesLabel}
                        onClick={visaoAtual === "mes" ? () => setMostrarSeletorMes((v) => !v) : undefined}
                        aria-expanded={visaoAtual === "mes" ? mostrarSeletorMes : undefined}
                      >
                        <span className={styles.mesNome}>{tituloVisao}</span>
                        {visaoAtual === "mes" && <img className={styles.chevronMes} alt="" src="/Vector6.svg" />}
                      </button>

                      <button
                        className={styles.btnMes}
                        onClick={irParaProximo}
                        aria-label="Próximo"
                      >
                        ›
                      </button>

                      {visaoAtual === "mes" && (
                        <div className={`${styles.seletorMes} ${mostrarSeletorMes ? styles.seletorMesAberto : ""}`}>
                          <div className={styles.seletorAnos}>
                            {ANOS_DISPONIVEIS.map((ano) => (
                              <button
                                key={ano}
                                className={
                                  ano === anoAtual
                                    ? styles.seletorAnoAtivo
                                    : styles.seletorAno
                                }
                                onClick={() => setAnoAtual(ano)}
                              >
                                {ano}
                              </button>
                            ))}
                          </div>
                          <div className={styles.seletorMesesGrid}>
                            {MESES.map((nome, idx) => (
                              <button
                                key={idx}
                                className={
                                  idx === mesAtual
                                    ? styles.seletorMesItemAtivo
                                    : styles.seletorMesItem
                                }
                                onClick={() => {
                                  setMesAtual(idx);
                                  setMostrarSeletorMes(false);
                                }}
                              >
                                {nome}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.filtrosBarra}>
                      <button
                        className={`${styles.filtroBtn} ${visaoAtual === "dia" ? styles.filtroBtnAtivo : ""}`}
                        onClick={() => handleFiltroClick("dia")}
                      >
                        Dia
                      </button>
                      <button
                        className={`${styles.filtroBtn} ${visaoAtual === "semana" ? styles.filtroBtnAtivo : ""}`}
                        onClick={() => handleFiltroClick("semana")}
                      >
                        Semana
                      </button>
                      <button
                        className={`${styles.filtroBtn} ${visaoAtual === "mes" ? styles.filtroBtnAtivo : ""}`}
                        onClick={() => handleFiltroClick("mes")}
                      >
                        Mês
                      </button>

                      <button
                        className={styles.btnToggleModo}
                        onClick={() => setModoRetangulo((v) => !v)}
                      >
                        {modoRetangulo ? "Exibir indicadores" : "Exibir detalhes"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.grade}>

                    {visaoAtual === "dia" ? (
                      <div className={styles.visaoDia}>
                        <div className={styles.visaoDiaHeader}>
                          <span className={styles.visaoDiaData}>
                            {DIAS_DA_SEMANA_EXT[new Date(anoAtual, mesAtual, diaSelecionado).getDay()]}, {String(diaSelecionado).padStart(2, "0")}/{String(mesAtual + 1).padStart(2, "0")}/{anoAtual}
                          </span>
                          <span className={styles.visaoDiaContagem}>{consultasDoDiaSelecionado.length} consultas</span>
                        </div>
                        {consultasDoDiaSelecionado.length > 0 ? (
                          <div className={styles.visaoDiaLista}>
                            {consultasDoDiaSelecionado.map((c, i) => (
                              <CardConsulta
                                key={i}
                                nomeCliente={c.nomeCliente}
                                assunto={c.assunto}
                                horario={c.horario}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className={styles.visaoVazia}>Nenhuma consulta agendada para este dia.</p>
                        )}
                      </div>
                    ) : visaoAtual === "semana" ? (
                      <div className={styles.diasContainer}>
                        <div className={styles.cabecalhoDias}>
                          {DIAS_DA_SEMANA.map((dia) => (
                            <div key={dia} className={styles.cabecalhoDiaItem}>
                              <span>{dia}</span>
                            </div>
                          ))}
                        </div>
                        <div key={`sem-${mesAtual}-${anoAtual}-${diaSelecionado}`} className={styles.semanas}>
                          <LinhaDeDias
                            dias={semanaDias.map((d) => d.dia)}
                            diasForaDoMes={semanaDias.map((d) => d.foraDoMes)}
                            qtdConsultas={semanaDias.map((d) => d.qtd)}
                            dadosConsultas={semanaDias.map((d) => d.consultas)}
                            modoRetangulo={modoRetangulo}
                            onBolinhaEnter={handleBolinhaEnter}
                            onBolinhaLeave={handleBolinhaLeave}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={styles.diasContainer}>
                        <div className={styles.cabecalhoDias}>
                          {DIAS_DA_SEMANA.map((dia) => (
                            <div key={dia} className={styles.cabecalhoDiaItem}>
                              <span>{dia}</span>
                            </div>
                          ))}
                        </div>

                        <div key={`${mesAtual}-${anoAtual}`} className={styles.semanas}>
                          {semanasComBolinha.map((semana, i) => (
                            <LinhaDeDias
                              key={i}
                              dias={semana.dias}
                              diasForaDoMes={semana.diasForaDoMes}
                              qtdConsultas={semana.qtdConsultas}
                              dadosConsultas={semana.dadosConsultas}
                              modoRetangulo={modoRetangulo}
                              onBolinhaEnter={handleBolinhaEnter}
                              onBolinhaLeave={handleBolinhaLeave}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>

            <aside
              ref={painelRef}
              className={`${styles.painelDia} ${diaHovered !== null ? styles.painelDiaVisivel : ""}`}
              style={{
                position: "fixed",
                left: posPanel.left,
                top: posPanel.top,
                bottom: "auto",
              }}
              onMouseEnter={handlePainelEnter}
              onMouseLeave={handlePainelLeave}
            >
              <div className={styles.painelDiaCabecalho}>
                <span className={styles.painelDiaTitulo}>{diaHoveredLabel}</span>
                <div className={styles.painelDiaContagem}>
                  <span>{consultasDoDia.length} consultas</span>
                </div>
              </div>

              <div className={styles.listaConsultas}>
                {consultasVisiveis.map((consulta, i) => (
                  <CardConsulta
                    key={i}
                    nomeCliente={consulta.nomeCliente}
                    assunto={consulta.assunto}
                    horario={consulta.horario}
                  />
                ))}
              </div>

              <button className={styles.btnVerMais}>Ver mais consultas</button>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgendaCalendario;
