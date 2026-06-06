import PropTypes from "prop-types";
import styles from "./Rodap.module.css";

const REDES_SOCIAIS = [
  { src: "/icon-park-outline-instagram.svg", alt: "Instagram", url: "https://www.instagram.com/juriki" },
  { src: "/mingcute-linkedin-line.svg", alt: "LinkedIn", url: "https://www.linkedin.com/company/juriki" },
  { src: "/qlementine-icons-facebook-16.svg", alt: "Facebook", url: "https://www.facebook.com/juriki" },
  { src: "/ri-youtube-line.svg", alt: "YouTube", url: "https://www.youtube.com/@juriki" },
  { src: "/hugeicons-new-twitter-rectangle.svg", alt: "Twitter", url: "https://x.com/juriki" },
];

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
            {REDES_SOCIAIS.map(({ src, alt, url }) => (
              <a
                key={alt}
                href={url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkSocial}
              >
                <img
                  className={styles.iconeSocial}
                  loading="lazy"
                  alt={alt}
                  src={src}
                />
              </a>
            ))}
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
