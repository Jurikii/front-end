import styles from "./Rodap.module.css";

const Rodap = ({ className = "" }) => {
  return (
    <footer className={[styles.rodap, className].join(" ")}>
      <div className={styles.informaesEmCimaDireitoAu}>
        <div className={styles.logoERedesSociais}>
          <div className={styles.logoEJuriki}>
            <img
              className={styles.logoIcon}
              loading="lazy"
              alt=""
              src="/Logo@2x.png"
            />
            <h3 className={styles.juriki}>JURIKI</h3>
          </div>
          <div className={styles.aJustiaQue}>
            A justiça que fala a sua língua.
          </div>
          <div className={styles.redesSociais}>
            <img
              className={styles.iconParkOutlineinstagram}
              alt=""
              src="/icon-park-outline-instagram.svg"
            />
            <img
              className={styles.iconParkOutlineinstagram}
              alt=""
              src="/mingcute-linkedin-line.svg"
            />
            <img
              className={styles.iconParkOutlineinstagram}
              alt=""
              src="/qlementine-icons-facebook-16.svg"
            />
            <img
              className={styles.iconParkOutlineinstagram}
              alt=""
              src="/ri-youtube-line.svg"
            />
            <img
              className={styles.iconParkOutlineinstagram}
              alt=""
              src="/hugeicons-new-twitter-rectangle.svg"
            />
          </div>
        </div>
        <div className={styles.navegao}>
          <div className={styles.navegao2}>Navegação</div>
          <div className={styles.footerDetails}>
            <div className={styles.incio}>Início</div>
            <div className={styles.incio}>Planos</div>
            <div className={styles.incio}>Sobre nós</div>
            <div className={styles.incio}>FAQ</div>
          </div>
        </div>
        <div className={styles.paraVoc}>
          <div className={styles.navegao2}>Para você</div>
          <div className={styles.informaes}>
            <div className={styles.incio}>Como funciona</div>
            <div className={styles.incio}>Perguntas frequentes</div>
            <div className={styles.incio}>Termos de uso</div>
            <div className={styles.polticaDePrivacidade}>
              Política de privacidade
            </div>
          </div>
        </div>
        <div className={styles.paraVoc}>
          <div className={styles.navegao2}>Para advogados</div>
          <div className={styles.informaes}>
            <div className={styles.incio}>Seja um parceiro</div>
            <div className={styles.incio}>Ferramentas</div>
            <div className={styles.polticaDePrivacidade}>
              Planos para advogados
            </div>
            <div className={styles.incio}>Central de ajuda</div>
          </div>
        </div>
        <div className={styles.paraVoc}>
          <div className={styles.navegao2}>Contato</div>
          <div className={styles.informaes}>
            <div className={styles.polticaDePrivacidade}>
              contato@juriki.com.br
            </div>
            <div className={styles.incio}>(11) 4002-8922</div>
            <div className={styles.incio}>Seg - Sex: 9h às 18h</div>
          </div>
        </div>
      </div>
      <div className={styles.polticaDePrivacidade}>
        © 2026 Juriki. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Rodap;
