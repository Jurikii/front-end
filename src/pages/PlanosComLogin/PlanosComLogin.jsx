import { useState } from "react";
import Menu1 from "../../components/Menu1";
import SecaoPlanos from "./components/SecaoPlanos";
import { PLANOS_PARA_VOCE, PLANOS_PARA_EQUIPES } from "./data/planos";
import styles from "./PlanosComLogin.module.css";

const Planos = () => {
  const [planoAtivo, setPlanoAtivo] = useState("broto");

  const handleSelecionarPlano = (id) => {
    setPlanoAtivo(id);
  };

  return (
    <div className={styles.planos}>
      <Menu1 />

      <main className={styles.conteudo}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
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
          </div>
        </section>

        {/* Seção: planos individuais */}
        <SecaoPlanos
          titulo="Para você"
          icone="/Paravoce.svg"
          planos={PLANOS_PARA_VOCE}
          colunas={1}
          planoAtivo={planoAtivo}
          onSelecionarPlano={handleSelecionarPlano}
        />

        {/* Seção: planos para equipes */}
        <SecaoPlanos
          titulo="Para equipes"
          icone="/Paraequipes.svg"
          planos={PLANOS_PARA_EQUIPES}
          colunas={2}
          planoAtivo={planoAtivo}
          onSelecionarPlano={handleSelecionarPlano}
        />
      </main>

      {/* Girassóis decorativos */}
      <img
        src="/esquerdo-superior.png"
        alt=""
        className={`${styles.cornerImage} ${styles.cornerTopLeft}`}
      />
      <img
        src="/direito-superior.png"
        alt=""
        className={`${styles.cornerImage} ${styles.cornerTopRight}`}
      />
      <img
        src="/esquerdo-inferior.png"
        alt=""
        className={`${styles.cornerImage} ${styles.cornerBottomLeft}`}
      />
      <img
        src="/direito-inferior.png"
        alt=""
        className={`${styles.cornerImage} ${styles.cornerBottomRight}`}
      />
    </div>
  );
};

export default Planos;