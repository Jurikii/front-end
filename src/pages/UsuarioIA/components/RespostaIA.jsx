import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./RespostaIA.module.css";

// Ícone do girassol (logo Juriki) para o avatar da IA
const AvatarIA = () => (
  <div className={styles.avatarIA}>
    <img src="/Logo-juriki-girassol-completo-2@2x.png" alt="Juriki" />
  </div>
);

// Aplica apenas classes CSS aos elementos HTML — sem forçar emojis ou detectar conteúdo.
// A IA decide livremente a estrutura e os emojis via markdown.
const componentesMarkdown = {
  p({ children }) {
    return <p className={styles.paragrafo}>{children}</p>;
  },
  li({ children }) {
    return <li className={styles.itemLista}>{children}</li>;
  },
  ul({ children }) {
    return <ul className={styles.lista}>{children}</ul>;
  },
  ol({ children }) {
    return <ol className={styles.lista}>{children}</ol>;
  },
  strong({ children }) {
    return <strong className={styles.negrito}>{children}</strong>;
  },
};

const RespostaIA = ({ conteudo, horario }) => {
  return (
    <div className={styles.mensagemIA}>
      <AvatarIA />
      <div className={styles.bolha}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={componentesMarkdown}
        >
          {conteudo}
        </ReactMarkdown>
        {horario && <span className={styles.horario}>{horario}</span>}
      </div>
    </div>
  );
};

export default RespostaIA;
