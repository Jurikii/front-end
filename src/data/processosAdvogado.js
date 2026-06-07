// Dados mockados — substituir por chamadas à API quando o back-end estiver pronto

export const STATUS = {
  EM_ANDAMENTO: "Em andamento",
  INTERROMPIDO: "Interrompido",
  FINALIZADO: "Finalizado",
};

export const processos = [
  {
    id: 1,
    cliente: {
      nome: "Mariana Souza",
      email: "mariana.souza@gmail.com",
      telefone: "(11) 98765-4321",
    },
    area: "Trabalhista",
    titulo: "Rescisão indireta",
    descricao:
      "Alegação de assédio moral e condições inadequadas de trabalho que justificam a rescisão indireta do contrato.",
    numero: "0001234-56.2024.5.02.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "10/06/2026",
  },
  {
    id: 2,
    cliente: {
      nome: "João Pedro Alves",
      email: "joao.alves@email.com",
      telefone: "(11) 91234-5678",
    },
    area: "Cível",
    titulo: "Indenização por danos materiais",
    descricao:
      "Ação de indenização por danos materiais decorrentes de acidente de trânsito com veículo do autor.",
    numero: "0002345-67.2024.8.19.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "10/06/2026",
  },
  {
    id: 3,
    cliente: {
      nome: "Lucia Fernandes",
      email: "lucia.fernandes@email.com",
      telefone: "(21) 97654-3210",
    },
    area: "Família",
    titulo: "Guarda de menores",
    descricao:
      "Disputa de guarda unilateral dos filhos menores com pedido de regulamentação de visitas.",
    numero: "0003456-78.2024.8.19.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "09/06/2026",
  },
  {
    id: 4,
    cliente: {
      nome: "Ricardo Barbosa",
      email: "ricardo.barbosa@email.com",
      telefone: "(31) 98888-7777",
    },
    area: "Consumidor",
    titulo: "Revisão de contrato bancário",
    descricao:
      "Ação revisional de cláusulas contratuais abusivas em contrato de financiamento bancário.",
    numero: "0004567-89.2025.8.13.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "08/06/2026",
  },
  {
    id: 5,
    cliente: {
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@gmail.com",
      telefone: "(21) 99876-5432",
    },
    area: "Cível",
    titulo: "Indenização por danos morais",
    descricao:
      "Ação de indenização por danos morais decorrentes de negativação indevida do nome do autor.",
    numero: "0005678-90.2025.8.19.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "07/06/2026",
  },
  {
    id: 6,
    cliente: {
      nome: "Ana Beatriz Lima",
      email: "ana.lima@email.com",
      telefone: "(31) 98765-1234",
    },
    area: "Tributário",
    titulo: "Anulação de débito fiscal",
    descricao:
      "Mandado de segurança contra lançamento de débito fiscal indevido com pedido de liminar.",
    numero: "0009012-34.2025.4.03.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "06/06/2026",
  },
  {
    id: 7,
    cliente: {
      nome: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      telefone: "(41) 97654-3210",
    },
    area: "Previdenciário",
    titulo: "Aposentadoria por tempo de contribuição",
    descricao:
      "Pedido de concessão de aposentadoria por tempo de contribuição com reconhecimento de atividade especial.",
    numero: "0012345-67.2025.4.04.0001",
    status: STATUS.EM_ANDAMENTO,
    atualizadoEm: "05/06/2026",
  },
  {
    id: 8,
    cliente: {
      nome: "Fernanda Costa",
      email: "fernanda.costa@email.com",
      telefone: "(51) 98888-9999",
    },
    area: "Empresarial",
    titulo: "Recuperação judicial",
    descricao:
      "Processo de recuperação judicial com apresentação de plano de recuperação aos credores.",
    numero: "0034567-89.2025.8.21.0001",
    status: STATUS.INTERROMPIDO,
    atualizadoEm: "03/06/2026",
  },
  {
    id: 9,
    cliente: {
      nome: "Juliana Martins",
      email: "juliana.martins@email.com",
      telefone: "(61) 97777-8888",
    },
    area: "Trabalhista",
    titulo: "Acordo trabalhista",
    descricao:
      "Homologação de acordo extrajudicial perante a Justiça do Trabalho com quitação geral do contrato.",
    numero: "0045678-90.2026.5.10.0001",
    status: STATUS.FINALIZADO,
    atualizadoEm: "01/06/2026",
  },
];
