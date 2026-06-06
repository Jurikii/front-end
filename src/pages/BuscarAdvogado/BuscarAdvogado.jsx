import Menu1 from "../../components/Menu1";
import BUSCA from "../../components/BUSCA";
import AdvogadosDisponiveis from "../../components/AdvogadosDisponiveis";
import styles from "./BuscarAdvogado.module.css";

const BuscarAdvogado = () => {
  return (
    <div className={styles.buscarAdvogado}>
      <Menu1 />
      <main className={styles.elementos}>
        <BUSCA />
        <div className={styles.areasAtuacao}>
          <h2 className={styles.reasDeAtuao}>Áreas de atuação</h2>
          <div className={styles.areasAtuacao2}>
            <div className={styles.trabalhista}>
              <div className={styles.trabalhista2}>Trabalhista</div>
            </div>
            <div className={styles.civil}>
              <div className={styles.cvel}>Cível</div>
            </div>
            <div className={styles.civil}>
              <div className={styles.famlia}>Família</div>
            </div>
            <div className={styles.trabalhista}>
              <div className={styles.consumidor2}>Consumidor</div>
            </div>
            <div className={styles.previdenciario}>
              <div className={styles.previdencirio}>Previdenciário</div>
            </div>
            <div className={styles.previdenciario}>
              <div className={styles.verTodas2}>Ver todas</div>
            </div>
          </div>
        </div>
        <AdvogadosDisponiveis />
      </main>
    </div>
  );
};

export default BuscarAdvogado;
