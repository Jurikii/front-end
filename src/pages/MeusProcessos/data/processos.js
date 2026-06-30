/**
 * Dados centralizados da página Meus Processos.
 * Para alterar processos, abas ou nav, edite apenas este arquivo.
 */

// ── Categorias e suas cores ────────────────────────────────────────
// Centraliza o mapeamento de categoria → cor de badge.
// Evita passar cores como props inline nos componentes.
export const CORES_CATEGORIA = {
  Trabalhista: {
    fundo: "rgba(28, 101, 6, 0.05)",
    texto: "#1c6406",
  },
  Civel: {
    fundo: "rgba(61, 106, 138, 0.1)",
    texto: "#3d6a8a",
  },
  Família: {
    fundo: "rgba(75, 34, 157, 0.1)",
    texto: "#4b229d",
  },
};

// ── Status dos processos ───────────────────────────────────────────
export const STATUS = {
  EM_ANDAMENTO: "Em andamento",
  ENCERRADO: "Encerrado",
  AGUARDANDO: "Aguardando",
  AGENDADO: "Agendado",
  REALIZADO: "Realizado",
};

export const STATUS_STYLE = {
  [STATUS.EM_ANDAMENTO]: { bg: "#d4edda", text: "#155724" },
  [STATUS.ENCERRADO]: { bg: "#e8e8e8", text: "#4a4a4a" },
  [STATUS.AGUARDANDO]: { bg: "#fdf0d9", text: "#8a6a1a" },
  [STATUS.AGENDADO]: { bg: "#cce5ff", text: "#004085" },
  [STATUS.REALIZADO]: { bg: "#d4edda", text: "#155724" },
};

// ── Lista de processos ─────────────────────────────────────────────
export const PROCESSOS = [
  {
    id: "proc-001",
    categoria: "Trabalhista",
    titulo: "Rescisão indireta",
    numeroProcesso: "0001234-56.2024.5.02.0001",
    advogado: "Dra. Beatriz Oliveira",
    dataInicio: "15/03/2024",
    vara: "1ª Vara do Trabalho de São Paulo-SP",
    atualizadoEm: "10/05/2026",
    status: STATUS.EM_ANDAMENTO,
    andamentos: [
      { date: "10/05/2026", title: "Despacho proferido", description: "Despacho determinado a juntada de documentos" },
      { date: "02/05/2026", title: "Petição protocolada", description: "Petição inicial juntada aos autos." },
      { date: "15/04/2026", title: "Audiência realizada", description: "Audiência de conciliação realizada." },
    ],
  },
  {
    id: "proc-002",
    categoria: "Civel",
    titulo: "Cobrança de débitos",
    numeroProcesso: "0002345-67.2024.8.26.0100",
    advogado: "Dr. Rafael Mendes",
    dataInicio: "10/01/2024",
    vara: "3ª Vara Cível de São Paulo-SP",
    atualizadoEm: "08/05/2026",
    status: STATUS.EM_ANDAMENTO,
    andamentos: [
      { date: "08/05/2026", title: "Sentença aguardando publicação", description: "Processo concluso para sentença." },
      { date: "25/04/2026", title: "Audiência de instrução", description: "Oitiva de testemunhas realizada." },
      { date: "10/03/2026", title: "Contestação apresentada", description: "Réu apresentou contestação no prazo legal." },
      { date: "20/02/2026", title: "Citação realizada", description: "Réu citado para contestar a ação." },
    ],
  },
  {
    id: "proc-003",
    categoria: "Família",
    titulo: "Regulamentação de visitas",
    numeroProcesso: "0003456-78.2024.8.26.0200",
    advogado: "Dra. Camila Torres",
    dataInicio: "22/02/2024",
    vara: "2ª Vara de Família de São Paulo-SP",
    atualizadoEm: "05/05/2026",
    status: STATUS.EM_ANDAMENTO,
    andamentos: [
      { date: "05/05/2026", title: "Estudo psicossocial concluído", description: "Laudo apresentado ao juízo." },
      { date: "18/03/2026", title: "Audiência de conciliação", description: "Partes não chegaram a acordo." },
      { date: "10/01/2026", title: "Petição inicial deferida", description: "Liminar de guarda provisória deferida." },
    ],
  },

  // ── Processos encerrados ──────────────────────────────────────────
  {
    id: "proc-004",
    categoria: "Trabalhista",
    titulo: "Acordo trabalhista",
    numeroProcesso: "0004567-89.2023.5.02.0001",
    advogado: "Dra. Beatriz Oliveira",
    dataInicio: "10/06/2023",
    vara: "4ª Vara do Trabalho de São Paulo-SP",
    atualizadoEm: "20/12/2025",
    status: STATUS.ENCERRADO,
    andamentos: [
      { date: "20/12/2025", title: "Acordo homologado", description: "Acordo entre as partes homologado pelo juiz." },
      { date: "15/11/2025", title: "Audiência de conciliação", description: "Proposta de acordo apresentada." },
      { date: "02/08/2025", title: "Perícia contábil", description: "Laudo pericial apresentado." },
    ],
  },
  {
    id: "proc-005",
    categoria: "Civel",
    titulo: "Indenização securitária",
    numeroProcesso: "0005678-90.2023.8.26.0100",
    advogado: "Dr. Rafael Mendes",
    dataInicio: "05/03/2023",
    vara: "5ª Vara Cível de São Paulo-SP",
    atualizadoEm: "10/10/2025",
    status: STATUS.ENCERRADO,
    andamentos: [
      { date: "10/10/2025", title: "Sentença transitada em julgado", description: "Processo arquivado definitivamente." },
      { date: "18/07/2025", title: "Acórdão publicado", description: "Tribunal manteve sentença de primeiro grau." },
      { date: "12/04/2025", title: "Apelação interposta", description: "Parte contrária interpôs recurso de apelação." },
    ],
  },

  // ── Consultas agendadas ──────────────────────────────────────────
  {
    id: "cons-001",
    categoria: "Trabalhista",
    titulo: "Consulta sobre rescisão",
    numeroProcesso: "N/A",
    advogado: "Dra. Beatriz Oliveira",
    dataInicio: "15/07/2026",
    vara: "Online",
    atualizadoEm: "10/06/2026",
    status: STATUS.AGENDADO,
    andamentos: [
      { date: "15/07/2026", title: "Consulta agendada", description: "Reunião virtual agendada para as 14h." },
    ],
  },
  {
    id: "cons-002",
    categoria: "Família",
    titulo: "Consulta sobre guarda",
    numeroProcesso: "N/A",
    advogado: "Dra. Camila Torres",
    dataInicio: "22/07/2026",
    vara: "Online",
    atualizadoEm: "12/06/2026",
    status: STATUS.AGENDADO,
    andamentos: [
      { date: "22/07/2026", title: "Consulta agendada", description: "Reunião virtual agendada para as 10h." },
    ],
  },
];

// ── Abas de filtro ─────────────────────────────────────────────────
export const FILTROS = [
  {
    id: "ativos",
    label: "Ativos",
    icone: "/codicon-folder-active.svg",
  },
  {
    id: "consultas",
    label: "Consultas agendadas",
    icone: "/mdi-light-calendar.svg",
  },
  {
    id: "encerrados",
    label: "Encerrados",
    icone: "/ep-finished.svg",
  },
];

// ── Ações disponíveis em cada card de processo ─────────────────────
export const ACOES_PROCESSO = [
  {
    id: "ver",
    label: "Ver detalhes",
    icone: "/iconoir-eye-solid1.svg",
    variante: "primaria",
  },
];

// ── Links da navbar interna ────────────────────────────────────────
export const LINKS_NAV_INTERNA = [
  { id: "inicio", label: "Início", rota: null },
  { id: "ia", label: "IA Jurídica", rota: null },
  { id: "advogados", label: "Advogados", rota: "/planos" },
  { id: "processos", label: "Meus processos", rota: "/" },
];
