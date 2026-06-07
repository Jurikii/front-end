import styles from "../pages/AgendaMinhasConsultas/AgendaMinhasConsultas.module.css";

const ConsultaCardExpandido = ({ consulta, onToggle }) => {
  const { tipoAtendimento, duracaoPrevista, status, criadaEm, resumo, cliente } = consulta;

  return (
    <section className={styles.cardVisualizado}>
      <div className={styles.cardVisualizado2}>
        <CardHeader consulta={consulta} onToggle={onToggle} />

        <div className={styles.informaesAdicionaisConsult}>
          <div className={styles.informaesAdicionaisConsult2}>
            <DetalhesDaConsulta
              tipoAtendimento={tipoAtendimento}
              duracaoPrevista={duracaoPrevista}
              status={status}
              criadaEm={criadaEm}
            />

            <div className={styles.informaesAdicionaisConsultChild} />

            <ResumoAssunto resumo={resumo} />

            <div className={styles.informaesAdicionaisConsultChild} />

            <InfoCliente cliente={cliente} />

            <div className={styles.informaesAdicionaisConsultChild} />

            <ObservacoesCliente observacoes={cliente.observacoes} />
          </div>
        </div>
      </div>
    </section>
  );
};

const CardHeader = ({ consulta, onToggle }) => (
  <div className={styles.infoCard}>
    <div className={styles.nomeDescImagem}>
      <img className={styles.fotoCliente} alt="" src="/user.svg" />
      <div className={styles.infoClienteCard}>
        <div className={styles.nomeCliente}>{consulta.cliente.nome}</div>
        <div className={styles.assuntoCard}>{consulta.resumo}</div>
      </div>
    </div>
    <div className={styles.dataIcon}>
      <img className={styles.vectorIcon4} alt="" src="/Vector7.svg" />
      <div className={styles.dataDia}>
        <h3 className={styles.sextaFeira}>{consulta.data}</h3>
        <h3 className={styles.sextaFeira}>{consulta.diaSemana}</h3>
      </div>
    </div>
    <div className={styles.horarioIcon}>
      <img className={styles.vectorIcon5} alt="" src="/Vector10.svg" />
      <h3 className={styles.h32}>{consulta.horario}</h3>
    </div>
    <img className={`${styles.dropdownIcon} ${styles.dropdownIconRotated}`} alt="Recolher detalhes" src="/Dropdown1.svg" onClick={onToggle} />
  </div>
);

const DetalhesDaConsulta = ({ tipoAtendimento, duracaoPrevista, status, criadaEm }) => (
  <div className={styles.detalhesDaConsulta}>
    <div className={styles.detalhesDaConsulta2}>
      <div className={styles.emAgendamento4}>Detalhes da consulta</div>
    </div>
    <InfoLinha label="Tipo de atendimento" valor={tipoAtendimento} />
    <InfoLinha label="Duração prevista" valor={duracaoPrevista} />
    <div className={styles.tipoDeAtendimento}>
      <div className={styles.consultaOnline}>Status</div>
      <div className={styles.emAgendamento}>
        <div className={styles.acompanheTodasAs}>{status}</div>
      </div>
    </div>
    <InfoLinha label="Criada em" valor={criadaEm} />
  </div>
);

const InfoLinha = ({ label, valor }) => (
  <div className={styles.tipoDeAtendimento}>
    <div className={styles.consultaOnline}>{label}</div>
    <div className={styles.consultaOnline}>{valor}</div>
  </div>
);

const ResumoAssunto = ({ resumo }) => (
  <div className={styles.resumoDoAssunto}>
    <div className={styles.cliente}>Resumo do assunto</div>
    <div className={styles.marianaDesejaOrientao}>{resumo}</div>
    <div className={styles.verMaisDetalhes}>Ver mais detalhes</div>
  </div>
);

const InfoCliente = ({ cliente }) => (
  <div className={styles.resumoDoAssunto3}>
    <div className={styles.cliente}>Cliente</div>
    <div className={styles.verPerfilDoCliente}>
      <img className={styles.vectorIcon7} alt="" src="/Vector11.svg" />
      <div className={styles.acompanheTodasAs}>Ver perfil do cliente</div>
    </div>
    <div className={styles.consultaOnline}>Telefone</div>
    <div className={styles.eMailJoolimagmailcom}>
      E-mail
      <br />
      {cliente.email}
    </div>
  </div>
);

const ObservacoesCliente = ({ observacoes }) => (
  <div className={styles.resumoDoAssunto4}>
    <div className={styles.cliente}>Observações do cliente:</div>
    <div className={styles.oClienteNo}>
      {observacoes ?? "O cliente não adicionou observações."}
    </div>
  </div>
);

export default ConsultaCardExpandido;
