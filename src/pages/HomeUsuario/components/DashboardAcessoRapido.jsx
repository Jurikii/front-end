import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProcessosEmAndamento from "./ProcessosEmAndamento";
import ProcessosEmAndamento1 from "./ProcessosEmAndamento1";
import { PROCESSOS, STATUS } from "../../MeusProcessos/data/processos";
import PropTypes from "prop-types";
import styles from "./DashboardAcessoRapido.module.css";

const DashboardAcessoRapido = ({ className = "" }) => {
  const navigate = useNavigate();

  const activeCount = useMemo(
    () => PROCESSOS.filter((p) => p.status === STATUS.EM_ANDAMENTO).length,
    []
  );

  const agendadasCount = useMemo(
    () => PROCESSOS.filter((p) => p.status === STATUS.AGENDADO).length,
    []
  );

  const onProcessosEmAndamentoClick = useCallback(() => {
    navigate("/ia");
  }, [navigate]);

  const onProcessosEmAndamentoClick1 = useCallback(() => {
    navigate("/advogados");
  }, [navigate]);

  const onMeusFavoritosClick = useCallback(() => {
    navigate("/advogados");
  }, [navigate]);

  const onVerTodosContainerClick = useCallback(() => {
    navigate("/processos?filtro=encerrados");
  }, [navigate]);

  return (
    <section className={[styles.dashboardAcessoRapido, className].join(" ")}>
      <section className={styles.seusAcompanhamentos}>
        <h2 className={styles.seusAcompanhamentos2}>Seus acompanhamentos</h2>
        <div className={styles.processos}>
          <ProcessosEmAndamento
            iconeBalana="/icone-balan-a@2x.png"
            processosEmAndamento="Processos em andamento"
            acompanhesSeusProcessosAtivos="Acompanhes seus processos ativos"
            prop={String(activeCount)}
          />
          <div className={styles.processosChild} />
          <ProcessosEmAndamento
            iconeBalana="/icone-advogado@2x.png"
            iconeBalanaMaxHeight="unset"
            iconeBalanaHeight="60px"
            processosEmAndamentoHeight="47px"
            processosEmAndamento="Consultas agendadas"
            acompanhesSeusProcessosAtivos="Acompanhe suas consultas agendadas"
            prop={String(agendadasCount)}
            filtro="consultas"
          />
          <div className={styles.processosChild} />
          <div className={styles.processosConcluidos} onClick={onVerTodosContainerClick}>
            <div className={styles.processosEmAndamento}>
              <img
                className={styles.iconeConcludo}
                loading="lazy"
                alt=""
                src="/icone-conclu-do@2x.png"
              />
              <div className={styles.processosEmAndamento2}>
                <h3 className={styles.processosConcludos}>
                  Processos concluídos
                </h3>
                <div className={styles.vejaSeusProcessos}>
                  Veja seus processos finalizados
                </div>
              </div>
            </div>
            <h2 className={styles.h2}>{String(PROCESSOS.filter((p) => p.status === STATUS.ENCERRADO).length)}</h2>
            <div className={styles.verTodos}>
              <div className={styles.verTodos2}>Ver todos</div>
              <img className={styles.setinha1} alt="" src="/setinha-1.svg" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.acessoRapido}>
        <div className={styles.ttuloAcessoRpido}>
          <h2 className={styles.acessoRpido}>Acesso rápido</h2>
        </div>
        <div className={styles.processos}>
          <ProcessosEmAndamento1
            onIAJurdicaTextClick={onMeusFavoritosClick}
            mdiheartOutline="/mdi-heart-outline1@2x.png"
            meusFavoritos="Meus favoritos"
            vejaSeusAdvogadosSalvos="Veja seus advogados salvos"
          />
          <div className={styles.processosChild} />
          <ProcessosEmAndamento1
            onIAJurdicaTextClick={onProcessosEmAndamentoClick}
            processosEmAndamentoAlignItems="center"
            processosEmAndamentoFlex="unset"
            processosEmAndamentoMinWidth="unset"
            mdiheartOutline="/IA@2x.png"
            meusFavoritos="Falar com a Juriki IA"
            vejaSeusAdvogadosSalvos="Tire dúvidas agora"
          />
          <div className={styles.processosChild} />
          <ProcessosEmAndamento1
            onIAJurdicaTextClick={onProcessosEmAndamentoClick1}
            processosEmAndamentoAlignItems="flex-start"
            processosEmAndamentoFlex="1"
            processosEmAndamentoMinWidth="217px"
            mdiheartOutline="/heroicons-magnifying-glass@2x.png"
            meusFavoritos="Buscar advogados"
            vejaSeusAdvogadosSalvos="Encontre o especialista ideal"
          />
        </div>
      </section>
    </section>
  );
};

DashboardAcessoRapido.propTypes = {
  className: PropTypes.string,
};

export default DashboardAcessoRapido;
