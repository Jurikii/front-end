import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdvogado";
import ChatBanner from "../../components/ChatBanner";
import StatCard from "../../components/StatCard";
import AppointmentItem from "../../components/AppointmentItem";
import ProcessItem from "../../components/ProcessItem";
import styles from "./HomeAdvogado.module.css";

// ── Dados ────────────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    icon: "/Group-901@2x.png",
    value: "8",
    label: "Consultas hoje",
    subtitle: "4 em agendamento",
  },
  {
    icon: "/Group-902@2x.png",
    value: "23",
    label: "Processos ativos",
    subtitle: "3 com atualizações",
  },
  {
    icon: "/Group-90@2x.png",
    value: "5",
    label: "Prazos próximos",
    subtitle: "Nos próximos 7 dias",
  },
  {
    icon: "/Group-903@2x.png",
    value: "3",
    label: "Documentos criados",
    subtitle: "Nos últimos 7 dias",
  },
];

const APPOINTMENTS = [
  {
    time: "11:00",
    day: "Hoje",
    initials: "JL",
    name: "João Pedro Lima",
    subject: "Revisão de pensão alimentícia",
    type: "online",
  },
  {
    time: "14:30",
    day: "Hoje",
    initials: "FA",
    name: "Fernanda Alves",
    subject: "Indenização por danos morais",
    type: "online",
  },
  {
    time: "16:00",
    day: "Hoje",
    initials: "CH",
    name: "Carlos Henrique",
    subject: "Rescisão indireta",
    type: "presencial",
  },
];

const PROCESSES = [
  {
    icon: "/icone1@2x.png",
    number: "0001234-56.2024.5.02.0001",
    subject: "Divórcio consensual",
    status: "Em andamento",
  },
  {
    icon: "/icone2@2x.png",
    number: "0001234-56.2024.5.02.0001",
    subject: "Cobrança de débitos",
    status: "Em andamento",
  },
  {
    icon: "/icone@2x.png",
    number: "0001234-56.2024.5.02.0001",
    subject: "Divórcio consensual",
    status: "Docs pendentes",
  },
];

// ── Componente ────────────────────────────────────────────────────────────────

const HomeAdvogado = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>

        {/* Saudação */}
        <section className={styles.greeting}>
          <div className={styles.greetingText}>
            <h1 className={styles.greetingTitle}>Olá, Dra. Alice!</h1>
            <h3 className={styles.greetingSubtitle}>Como posso te ajudar hoje?</h3>
          </div>
          <img
            className={styles.greetingAvatar}
            loading="lazy"
            alt="Avatar Dra. Alice"
            src="/image-114@2x.png"
          />
        </section>

        {/* Banner do chat IA */}
        <ChatBanner onOpen={() => navigate("/chatadvogado")} />

        {/* Cards de estatísticas */}
        <section className={styles.statsRow}>
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </section>

        {/* Consultas e Processos */}
        <section className={styles.panels}>

          {/* Próximas consultas */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <img alt="" src="/icone-calendario-proximas-consultas.svg" className={styles.panelIcon} />
                <h3>Próximas consultas</h3>
              </div>
              <button className={styles.linkButton} onClick={() => navigate("/calendarioadvogado")}>Ver calendário</button>
            </div>

            <div className={styles.list}>
              {APPOINTMENTS.map((appt, i) => (
                <div key={i}>
                  {i > 0 && <hr className={styles.separator} />}
                  <AppointmentItem
                    {...appt}
                    isPresential={appt.type === "presencial"}
                  />
                </div>
              ))}
            </div>

            <button className={styles.viewAllButton} onClick={() => navigate("/agendaadvogado")}>Ver todas as consultas</button>
          </div>

          {/* Processos recentes */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <img alt="" src="/icone-pasta-processos-recentes.svg" className={styles.panelIcon} />
                <h3>Processos recentes</h3>
              </div>
            </div>

            <div className={styles.list}>
              {PROCESSES.map((proc, i) => (
                <div key={i}>
                  {i > 0 && <hr className={styles.separator} />}
                  <ProcessItem {...proc} />
                </div>
              ))}
            </div>

            <button className={styles.viewAllButton} onClick={() => navigate("/meus-processosadvogado")}>Ver todos os processos</button>
          </div>

        </section>
      </main>
    </div>
  );
};

export default HomeAdvogado;
