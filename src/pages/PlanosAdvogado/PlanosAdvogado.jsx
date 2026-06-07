import { useState } from "react";
import Navbar from "../../components/NavbarAdvogado";
import SecaoPlanos from "./components/SecaoPlanos";
import { PLANOS_PARA_VOCE, PLANOS_PARA_EQUIPES } from "./data/planos";
import styles from "./PlanosAdvogado.module.css";

const PlanosAdvogado = () => {
  const [planoAtivo, setPlanoAtivo] = useState("broto");

  const handleSelecionarPlano = (id) => {
    setPlanoAtivo(id);
  };

  return (
    <div className={styles.planos}>
      <Navbar />

      <main className={styles.conteudo}>
        <section className={styles.hero}>
          <h1 className={styles.tituloHero}>
            <span>Escolha o </span>
            <span className={styles.destaque}>plano ideal</span>
            <span> para o seu momento</span>
          </h1>
          <p className={styles.subtituloHero}>
            Comece com o essencial e evolua conforme sua necessidade.
            <br />
            Sem complicação, com clareza e apoio quando você precisar
          </p>
        </section>

        <SecaoPlanos
          titulo="Para você"
          icone="/Paravoce.svg"
          planos={PLANOS_PARA_VOCE}
          colunas={1}
          planoAtivo={planoAtivo}
          onSelecionarPlano={handleSelecionarPlano}
        />

        <SecaoPlanos
          titulo="Para equipes"
          icone="/Paraequipes.svg"
          planos={PLANOS_PARA_EQUIPES}
          colunas={2}
          planoAtivo={planoAtivo}
          onSelecionarPlano={handleSelecionarPlano}
        />
      </main>
    </div>
  );
};

export default PlanosAdvogado;
