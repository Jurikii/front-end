import styles from "./TtuloESubttulo.module.css";

const TtuloESubttulo = ({ className = "" }) => {
  return (
    <section className={[styles.ttuloESubttulo, className].join(" ")}>
      <div className={styles.textinhoEFlorzinhas}>
        <div className={styles.textinhoEFlorzinhas2}>
          <img className={styles.groupIcon} alt="" src="/Group.svg" />
          <div className={styles.simplesSeguroE}>Simples, seguro e humano</div>
          <img className={styles.groupIcon} alt="" src="/Group.svg" />
        </div>
      </div>
      <div className={styles.comoFuncionaAJuriki}>
        <h1 className={styles.comoFuncionaAContainer}>
          <span>{`Como funciona a `}</span>
          <span className={styles.juriki}>Juriki</span>
        </h1>
      </div>
      <div className={styles.simplificamosOAcessoInfor}>
        <div className={styles.simplificamosOAcesso}>
          Simplificamos o acesso à informação jurídica com tecnologia, clareza e
          apoio profissional
        </div>
      </div>
      <div className={styles.ttuloESubttuloChild} />
    </section>
  );
};

export default TtuloESubttulo;
