import PropTypes from "prop-types";
import styles from "./Rodap.module.css";

const LINKS_RODAPE = {
  navegacao: ["Início", "Planos", "Sobre nós", "FAQ"],
  paraVoce: ["Como funciona", "Perguntas frequentes", "Termos de uso", "Política de privacidade"],
  paraAdvogados: ["Seja um parceiro", "Ferramentas", "Planos para advogados", "Central de ajuda"],
  contato: {
    email: "contato@juriki.com.br",
    telefone: "(11) 4002-8922",
    horario: "Seg - Sex: 9h às 18h",
  },
};

const Rodap = ({ className = "" }) => {
  return (
    <footer className={[styles.rodap, className].join(" ")}>
      <div className={styles.conteudo}>

        {/* Coluna: logo + redes sociais */}
        <div className={styles.logoERedesSociais}>
          <div className={styles.logoEJuriki}>
            <img
              className={styles.logoIcon}
              loading="lazy"
              alt="Logo Juriki"
              src="/Logo-juriki-girassol-completo-2@2x.png"
            />
            <h3 className={styles.juriki}>JURIKI</h3>
          </div>
          <p className={styles.slogan}>A justiça que fala a sua língua.</p>
          <div className={styles.redesSociais}>
            <a href="https://www.instagram.com/juriki_oficial/" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconeSocial}
                alt="Instagram"
                src="/icon-park-outline-instagram.svg"
              />
            </a>
            <a href="https://www.linkedin.com/in/juriki-oficial-7165a8405/" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconeSocial}
                alt="LinkedIn"
                src="/mingcute-linkedin-line.svg"
              />
            </a>
            <a href="https://www.facebook.com/people/Juriki-Jur%25C3%25ADdico/pfbid0fXtgyKwfohgzxJLss5Ez9qp4AvvauvfHKch6r75uq374MRHHgY9xfNnagk5ksnQfl/" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconeSocial}
                alt="Facebook"
                src="/qlementine-icons-facebook-16.svg"
              />
            </a>
            <a href="https://www.youtube.com/@Juriki_oficial" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconeSocial}
                alt="YouTube"
                src="/ri-youtube-line.svg"
              />
            </a>
            <a href="https://x.com/Juriki_oficial" target="_blank" rel="noopener noreferrer">
              <img
                className={styles.iconeSocial}
                alt="Twitter"
                src="/hugeicons-new-twitter-rectangle.svg"
              />
            </a>
          </div>
        </div>

        {/* Coluna: navegação */}
        <div className={styles.colunaLinks}>
          <h4 className={styles.tituloColuna}>Navegação</h4>
          <ul className={styles.listaLinks}>
            {LINKS_RODAPE.navegacao.map((item) => (
              <li key={item} className={styles.link}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Coluna: para você */}
        <div className={styles.colunaLinks}>
          <h4 className={styles.tituloColuna}>Para você</h4>
          <ul className={styles.listaLinks}>
            {LINKS_RODAPE.paraVoce.map((item) => (
              <li key={item} className={styles.link}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Coluna: para advogados */}
        <div className={styles.colunaLinks}>
          <h4 className={styles.tituloColuna}>Para advogados</h4>
          <ul className={styles.listaLinks}>
            {LINKS_RODAPE.paraAdvogados.map((item) => (
              <li key={item} className={styles.link}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Coluna: contato modificada no Rodap.jsx */}
        <div className={styles.colunaLinks}>
          <h4 className={styles.tituloColuna}>Contato</h4>
          <ul className={styles.listaLinks}>
            <li className={styles.textoContato}>{LINKS_RODAPE.contato.email}</li>
            <li className={styles.textoContato}>{LINKS_RODAPE.contato.telefone}</li>
            <li className={styles.textoContato}>{LINKS_RODAPE.contato.horario}</li>
          </ul>
        </div>

      </div>

      <p className={styles.direitos}>
        © 2026 Juriki. Todos os direitos reservados.
      </p>
    </footer>
  );
};

Rodap.propTypes = {
  className: PropTypes.string,
};

export default Rodap;
