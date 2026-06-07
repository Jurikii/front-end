import Navbar from "../../components/Navbar";
import SecaoPlanos from "./components/SecaoPlanos";
import { PLANOS_PARA_VOCE, PLANOS_PARA_EQUIPES } from "./data/planos";
import styles from "./PlanosSemLogin.module.css";
import { useAuthModal } from "../../context/AuthModalContext";

const Planos = () => {
  const { openTipoModal } = useAuthModal();

  return (
    <div className={styles.planos}>
      <Navbar activeItem="Planos" />

      <main className={styles.conteudo}>
        {/* Hero */}
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

        {/* Seção: planos individuais */}
        <SecaoPlanos
          titulo="Para você"
          icone="/Paravoce.svg"
          planos={PLANOS_PARA_VOCE}
          colunas={1}
          onSelecionarPlano={() => openTipoModal("login")}
        />

        {/* Seção: planos para equipes */}
        <SecaoPlanos
          titulo="Para equipes"
          icone="/Paraequipes.svg"
          planos={PLANOS_PARA_EQUIPES}
          colunas={2}
          onSelecionarPlano={() => openTipoModal("login")}
        />
      </main>

    </div>
  );
};

export default Planos;
