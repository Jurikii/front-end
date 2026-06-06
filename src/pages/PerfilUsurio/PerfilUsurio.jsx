import { useState } from "react";
import Menu1 from "../../components/Menu1";
import MeuPerfil from "./components/MeuPerfil";
import Pessoal from "./components/Pessoal";
import ResumoDaConta from "./components/ResumoDaConta";
import AssinaturaEPlanos from "./components/AssinaturaEPlanos";
import ContaESegurana from "./components/ContaESegurana";
import styles from "./PerfilUsurio.module.css";

const PerfilUsurio = () => {
  const [editando, setEditando] = useState(false);
  const [email, setEmail] = useState("Alice.silva@gmail.com");

  return (
    <div className={styles.perfilUsurio}>
      <Menu1 />
      <main className={styles.meuPerfil}>
        <MeuPerfil
          editando={editando}
          onToggleEdicao={() => setEditando((prev) => !prev)}
        />
        <Pessoal
          editando={editando}
          email={email}
          onEmailChange={setEmail}
          onSalvar={() => setEditando(false)}
        />
        <ResumoDaConta />
        <AssinaturaEPlanos />
        <ContaESegurana email={email} />
      </main>
    </div>
  );
};

export default PerfilUsurio;
