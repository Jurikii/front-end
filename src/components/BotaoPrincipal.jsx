import PropTypes from "prop-types";
import styles from "./BotaoPrincipal.module.css";

const BotaoPrincipal = ({ className = "" }) => {
  return (
    <div className={[styles.botoPrincipal, className].join(" ")}>
      <b className={styles.boto}>Criar Conta</b>
    </div>
  );
};

BotaoPrincipal.propTypes = {
  className: PropTypes.string,
};

export default BotaoPrincipal;
