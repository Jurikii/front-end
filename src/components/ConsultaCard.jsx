import { useRef, useEffect, useState } from "react";
import styles from "../pages/AgendaMinhasConsultas/AgendaMinhasConsultas.module.css";

const ConsultaCard = ({ consulta, onToggle }) => {
  const { data, diaSemana, horario, expandido, tipoAtendimento, duracaoPrevista, status, criadaEm, resumo, cliente } = consulta;
  const detalhesRef = useRef(null);
  const primeiroRender = useRef(true);
  const [colapsando, setColapsando] = useState(false);

  const handleToggle = () => {
    if (expandido) {
      setColapsando(true);
      setTimeout(() => {
        setColapsando(false);
        onToggle();
      }, 250);
    } else {
      onToggle();
    }
  };

  useEffect(() => {
    const el = detalhesRef.current;
    if (!el) return;
    if (primeiroRender.current) {
      primeiroRender.current = false;
      el.style.transition = "none";
      el.style.maxHeight = expandido ? el.scrollHeight + "px" : "0px";
      el.style.opacity = expandido ? "1" : "0";
      void el.offsetHeight;
      el.style.transition = "";
      return;
    }
    if (expandido && !colapsando) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
    }
  }, [expandido, colapsando]);

  const aberto = expandido || colapsando;

  return (
    <div className={aberto ? styles.cardVisualizado : styles.card}>
      <div className={aberto ? styles.cardVisualizado2 : undefined}>
        <div className={aberto ? styles.infoCard : styles.infoCard2}>
          <div className={styles.nomeDescImagem}>
            <img className={styles.fotoCliente} alt="" src="/user.svg" />
            <div className={styles.infoClienteCard}>
              <div className={styles.nomeCliente}>{cliente.nome}</div>
              <div className={styles.assuntoCard}>{resumo}</div>
            </div>
          </div>
          <div className={styles.dataIcon}>
            <img className={styles.vectorIcon4} alt="" src="/Vector7.svg" />
            <div className={styles.dataDia}>
              <h3 className={styles.sextaFeira}>{data}</h3>
              <h3 className={styles.sextaFeira}>{diaSemana}</h3>
            </div>
          </div>
          <div className={styles.horarioIcon}>
            <img className={styles.vectorIcon5} alt="" src="/Vector10.svg" />
            <h3 className={styles.h32}>{horario}</h3>
          </div>
          <img
            className={`${styles.dropdownIcon} ${expandido ? styles.dropdownIconRotated : ""}`}
            alt={expandido ? "Recolher detalhes" : "Expandir detalhes"}
            src="/Dropdown1.svg"
            onClick={handleToggle}
          />
        </div>

        <div
          ref={detalhesRef}
          className={styles.detalhesWrapper}
        >
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
      </div>
    </div>
  );
};

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
    <a className={styles.verMaisDetalhes} href="#">Ver mais detalhes</a>
  </div>
);

const InfoCliente = ({ cliente }) => (
  <div className={styles.resumoDoAssunto3}>
    <div className={styles.cliente}>{cliente.nome}</div>
    <div className={styles.consultaOnline}>Telefone: {cliente.telefone ?? "Não informado"}</div>
    <div className={styles.eMailJoolimagmailcom}>
      E-mail:
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

export default ConsultaCard;
