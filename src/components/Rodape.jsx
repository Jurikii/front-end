import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Rodape.module.css";

const Rodape = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleNav = useCallback((rota) => {
    if (rota) navigate(rota);
  }, [navigate]);

  return (
    <footer className={[styles.rodap, className].join(" ")}>
      <div className={styles.informaesEmCimaDireitoAu}>
        <div className={styles.logoERedesSociais}>
          <div className={styles.logoEJuriki}>
            <div className={styles.logo}>
              <img
                className={styles.logoJurikiGirassolCompleto}
                alt=""
                src="/Logo-juriki-girassol-completo-2@2x.png"
              />
            </div>
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
          <div className={styles.incioParent}>
            <div className={styles.incio} onClick={() => handleNav("/")}>Início</div>
            <div className={styles.incio} onClick={() => handleNav("/planossemlogin")}>Planos</div>
            <div className={styles.incio} onClick={() => handleNav("/sobre-nos")}>Sobre nós</div>
            <div className={styles.incio} onClick={() => handleNav("/faq")}>FAQ</div>
          </div>
        </div>
        <div className={styles.paraVoc}>
          <div className={styles.navegao2}>Para você</div>
          <div className={styles.informaes}>
            <div className={styles.incio} onClick={() => handleNav("/como-funciona")}>Como funciona</div>
            <div className={styles.incio}>Perguntas frequentes</div>
            <div className={styles.incio}>Termos de uso</div>
            <div className={styles.polticaDePrivacidade}>
              Política de privacidade
            </div>
          </div>
        </div>
        <div className={styles.paraAdvogados}>
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
        <div className={styles.contato}>
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

Rodape.propTypes = {
  className: PropTypes.string,
};

export default Rodape;
