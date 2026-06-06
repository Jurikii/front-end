import Menu1 from "../../components/Menu1";
import Opcoes from "../../components/Configuracoes/Opcoes";
import styles from "./Configuracoes.module.css";

const Configuracoes = () => {
  return (
    <div className={styles.configuracoes}>
      <Menu1 />
      <main className={styles.conteudo}>
        <section className={styles.navbarLateral}>
          <div className={styles.navBarLateral}>
            <div className={styles.configuracoesOpes}>
              <div className={styles.configuracoes2}>
                <h2 className={styles.configuracoes3}>Configurações</h2>
                <div className={styles.personalizeSuaExperincia}>
                  Personalize sua experiência na Juriki
                </div>
              </div>
              <div className={styles.opes}>
                <div className={styles.fonte}>
                  <img
                    className={styles.glyphsfontBoldIcon}
                    alt=""
                    src="/glyphs-font-bold.svg"
                  />
                  <h3 className={styles.temas}>Fonte</h3>
                </div>
                <div className={styles.cores}>
                  <img
                    className={styles.glyphsfontBoldIcon}
                    alt=""
                    src="/mdi-palette-outline.svg"
                  />
                  <h3 className={styles.temas}>Temas</h3>
                </div>
                <div className={styles.cores}>
                  <img
                    className={styles.glyphsfontBoldIcon}
                    alt=""
                    src="/iconoir-sound-high-solid.svg"
                  />
                  <h3 className={styles.temas}>Temas</h3>
                </div>
                <div className={styles.cores}>
                  <img
                    className={styles.glyphsfontBoldIcon}
                    alt=""
                    src="/streamline-plump-user-protection-1-remix.svg"
                  />
                  <h3 className={styles.temas}>Temas</h3>
                </div>
              </div>
            </div>
            <div className={styles.helpdesk}>
              <div className={styles.precisaDeAjuda}>
                <h3 className={styles.precisaDeAjuda2}>Precisa de ajuda?</h3>
                <div className={styles.faleComNosso}>
                  Fale com nosso suporte ou acesse o FAQ
                </div>
              </div>
              <div className={styles.btnhelp}>
                <div className={styles.acessarAjuda}>Acessar ajuda</div>
              </div>
            </div>
          </div>
          <img
            className={styles.image148Icon}
            loading="lazy"
            alt=""
            src="/image-148@2x.png"
          />
        </section>
        <section className={styles.opcoesSection}>
          <Opcoes />
        </section>
      </main>
    </div>
  );
};

export default Configuracoes;
