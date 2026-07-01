import PropTypes from "prop-types";
import styles from "./Card.module.css";

const coresStatus = {
  "Em andamento": { bg: "#e1f1df", text: "#285b21" },
  Interrompido: { bg: "#fdf0d9", text: "#8a6a1a" },
  Finalizado: { bg: "#e8e8e8", text: "#4a4a4a" },
};

const coresAreas = {
  Trabalhista: { bg: "#e1f1df", text: "#285b21" },
  Cível: { bg: "#dce8f5", text: "#1a4a7a" },
  Família: { bg: "#f5e0e8", text: "#7a2a4a" },
  Consumidor: { bg: "#fdf0d9", text: "#7a5a1a" },
  Tributário: { bg: "#e8dff5", text: "#4a2a7a" },
  Previdenciário: { bg: "#d6f0f0", text: "#1a5a5a" },
  Empresarial: { bg: "#f0e8d6", text: "#5a4a1a" },
};

const Card = ({ processo, className = "", onVerProcesso }) => {
  const { cliente, area, titulo, descricao, numero, status, atualizadoEm } = processo;
  const corArea = coresAreas[area] || { bg: "#e1f1df", text: "#285b21" };
  const corStatus = coresStatus[status] || { bg: "#e1f1df", text: "#285b21" };

  return (
    <section className={[styles.card, className].join(" ")}>
      <div className={styles.contedoCardProcesso}>
        <div className={styles.infoCliente}>
          <img className={styles.infoClienteChild} alt="" src="/user.svg" />
          <div className={styles.infoCliente2}>
            <h3 className={styles.marianaSouza}>{cliente.nome}</h3>
            <div className={styles.marianasouzagmailcom}>{cliente.email}</div>
            <div className={styles.marianasouzagmailcom}>{cliente.telefone}</div>
          </div>
        </div>

        <div className={styles.frame}>
          <div className={styles.frameChild} />
        </div>

          <div className={styles.classificaesProcesso}>
          <div className={styles.statusDoProcesso} style={{ backgroundColor: corArea.bg, color: corArea.text }}>
            <div className={styles.trabalhista}>{area}</div>
          </div>
          <h3 className={styles.marianaSouza}>{titulo}</h3>
          <div className={styles.alegaoDeAssdio}>{descricao}</div>
          <div className={styles.procN0001234562024502}>Proc. n° {numero}</div>
        </div>

        <div className={styles.frame}>
          <div className={styles.frameChild} />
        </div>

        <div className={styles.statusDoProcessoParent}>
          <div className={styles.statusDoProcesso2}>
            <div className={styles.statusDoProcesso3} style={{ backgroundColor: corStatus.bg, color: corStatus.text }}>
              <div className={styles.trabalhista}>{status}</div>
            </div>
            <div className={styles.atualizadoEm10062026}>
              Atualizado em {atualizadoEm}
            </div>
          </div>
          <img
            className={styles.botoVerProcesso}
            loading="lazy"
            alt="Ver processo"
            src="/Bot-o-ver-processo1@2x.png"
            onClick={onVerProcesso}
          />
        </div>
      </div>
    </section>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  onVerProcesso: PropTypes.func,
  processo: PropTypes.shape({
    cliente: PropTypes.shape({
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      telefone: PropTypes.string.isRequired,
    }).isRequired,
    area: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    atualizadoEm: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
