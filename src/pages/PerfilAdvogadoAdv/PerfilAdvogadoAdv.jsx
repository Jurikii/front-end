import { useState } from "react";
import Navbar from "../../components/NavbarAdvogado";
import MeuPerfil from "./components/MeuPerfil";
import Pessoal from "./components/Pessoal";
import ResumoDaConta from "./components/ResumoDaConta";
import AssinaturaEPlanos from "./components/AssinaturaEPlanos";
import ContaESegurana from "./components/ContaESegurana";
import styles from "./PerfilAdvogadoAdv.module.css";

const PerfilAdvogado = () => {
  const [editando, setEditando] = useState(false);
  const [email, setEmail] = useState("rosana.silva@oabsp.com.br");

  return (
    <div className={styles.perfilAdvogado}>
      <Navbar />
      <main className={styles.conteudo}>
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

export default PerfilAdvogado;
