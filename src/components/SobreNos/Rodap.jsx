import PropTypes from "prop-types";
import styles from "./Rodap.module.css";

const Rodap = ({ className = "" }) => {
  return (
    <footer className={`${styles.rodap} ${className}`}>
      <div className={styles.informaesEmCimaDireitoAu}>
        <div className={styles.logoERedesSociais}>
          <div className={styles.logoEJuriki}>
            <img
              className={styles.logoIcon}
              loading="lazy"
              alt=""
              src="/Logo@2x.png"
            />
            <div className={styles.juriki}>JURIKI</div>
          </div>
          <div className={styles.aJustiaQue}>
            A justiça que fala a sua língua.
          </div>
          <div className={styles.redesSociais}>
            <a href="https://www.instagram.com/juriki_oficial/" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconParkOutlineinstagram}
                alt=""
                src="/icon-park-outline-instagram.svg"
              />
            </a>
            <a href="https://www.linkedin.com/in/juriki-oficial-7165a8405/" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconParkOutlineinstagram}
                alt=""
                src="/mingcute-linkedin-line.svg"
              />
            </a>
            <a href="https://www.facebook.com/people/Juriki-Jur%25C3%25ADdico/pfbid0fXtgyKwfohgzxJLss5Ez9qp4AvvauvfHKch6r75uq374MRHHgY9xfNnagk5ksnQfl/" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconParkOutlineinstagram}
                alt=""
                src="/qlementine-icons-facebook-16.svg"
              />
            </a>
            <a href="https://www.youtube.com/@Juriki_oficial" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconParkOutlineinstagram}
                alt=""
                src="/ri-youtube-line.svg"
              />
            </a>
            <a href="https://x.com/Juriki_oficial" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconParkOutlineinstagram}
                alt=""
                src="/hugeicons-new-twitter-rectangle.svg"
              />
            </a>
          </div>
        </div>
        <div className={styles.navegao}>
          <div className={styles.navegao2}>Navegação</div>
          <div className={styles.incioParent}>
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

Rodap.propTypes = {
  className: PropTypes.string,
};

export default Rodap;
