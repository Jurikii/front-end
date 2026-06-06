import Menu1 from "../../components/Menu1";
import TrocarDeAdvogado1 from "../../components/TrocarDeAdvogado1";
import CompletoEscolhaAdvogado from "../../components/CompletoEscolhaAdvogado";
import styles from "./TrocarDeAdvogado.module.css";

const TrocarDeAdvogado = () => {
  return (
    <div className={styles.trocarDeAdvogado}>
      <Menu1 />
      <main className={styles.mainContent}>
        <TrocarDeAdvogado1 />
        <CompletoEscolhaAdvogado />
      </main>
    </div>
  );
};

export default TrocarDeAdvogado;
