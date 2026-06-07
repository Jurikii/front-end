import PropTypes from "prop-types";
import styles from "./MeuPerfil.module.css";

const MeuPerfil = ({ className = "", editando = false, onToggleEdicao }) => {
  return (
    <section className={[styles.meuPerfil, className].join(" ")}>
      <div className={styles.saudacaoPerfil}>
        <div className={styles.cumprimentosHome}>
          <h1 className={styles.meuPerfil2}>Meu perfil</h1>
          <h3 className={styles.gerencieSuasInformaes}>
            {editando ? "Preencha os campos abaixo para editar seus dados" : "Gerencie suas informações pessoais e sua conta"}
          </h3>
        </div>
      </div>
      <div className={styles.editarPerfil} onClick={onToggleEdicao} role="button" tabIndex={0}>
        <img
          className={styles.mdiLightpencilIcon}
          alt=""
          src="/mdi-light-pencil.svg"
        />
        <div className={styles.editarPerfil2}>{editando ? "Cancelar" : "Editar perfil"}</div>
      </div>
    </section>
  );
};

MeuPerfil.propTypes = {
  className: PropTypes.string,
  editando: PropTypes.bool,
  onToggleEdicao: PropTypes.func,
};

export default MeuPerfil;
