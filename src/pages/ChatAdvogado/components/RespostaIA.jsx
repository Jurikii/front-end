import styles from "./RespostaIA.module.css";

const AvatarIA = () => (
  <div className={styles.avatarIA}>
    <img src="/Logo-juriki-girassol-completo-2@2x.png" alt="Juriki" />
  </div>
);

const RespostaIA = ({ conteudo, horario }) => {
  return (
    <div className={styles.mensagemIA}>
      <AvatarIA />
      <div className={styles.bolha}>
        <p className={styles.paragrafo}>{conteudo}</p>
        {horario && <span className={styles.horario}>{horario}</span>}
      </div>
    </div>
  );
};

export default RespostaIA;
