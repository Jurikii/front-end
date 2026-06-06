import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu1 from "../../components/Menu1";
import ProcessoHeader from "./components/ProcessoHeader";
import ProcessoCard from "./components/ProcessoCard";
import InformacoesProcesso from "./components/InformacoesProcesso";
import AndamentosSection from "./components/AndamentosSection";
import { PROCESSOS } from "../MeusProcessos/data/processos";
import styles from "./DetalhesProcesso.module.css";

const DetalhesProcesso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const processo = useMemo(
    () => PROCESSOS.find((p) => p.id === id) ?? null,
    [id],
  );

  if (!processo) {
    return (
      <div className={styles.page}>
        <Menu1 />
        <main className={styles.main}>
          <p>Processo não encontrado.</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Menu1 />
      <main className={styles.main}>
        <ProcessoHeader onVoltar={() => navigate("/processos")} />
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <ProcessoCard processo={processo} />
            <InformacoesProcesso processo={processo} />
          </div>
          <AndamentosSection andamentos={processo.andamentos} />
        </div>
      </main>
    </div>
  );
};

export default DetalhesProcesso;
