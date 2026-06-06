import Menu1 from "../../components/Menu1";
import SaudacaoHome from "./components/SaudacaoHome";
import PrincipaisDuvidas from "./components/PrincipaisDuvidas";
import DashboardAcessoRapido from "./components/DashboardAcessoRapido";
import styles from "./HomeUsuario.module.css";

const HomeUsuario = () => {
  return (
    <div className={styles.homeUsurio}>
      <Menu1 />
      <main className={styles.homeElementos}>
        <SaudacaoHome />
        <PrincipaisDuvidas />
        <DashboardAcessoRapido />
      </main>
    </div>
  );
};

export default HomeUsuario;
