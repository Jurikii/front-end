import PropTypes from "prop-types";
import BotaoPlano from "./BotaoPlano";
import styles from "./CardPlano.module.css";

const CardPlano = ({
  nome,
  descricao,
  icone,
  preco,
  features = [],
  tipoBotao = "assinar",
  destaque = false,
  colunas = 1,
  className = "",
  onSelecionarPlano,
  planoId,
}) => {
  const cardClass = [
    styles.card,
    destaque ? styles.destaque : "",
    colunas === 2 ? styles.duasColunas : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClass}>
      <header className={styles.cabecalho}>
        <div className={styles.iconeContainer}>
          <img className={styles.icone} loading="lazy" alt={nome} src={icone} />
        </div>

        <div className={styles.infoPlano}>
          <div className={styles.nomeEDescricao}>
            <h2 className={styles.nome}>{nome}</h2>
            <h3 className={styles.descricao}>{descricao}</h3>
          </div>
          <div className={styles.preco}>
            <span className={styles.cifrao}>R$</span>
            <span className={styles.valor}>{preco}</span>
            <span className={styles.periodo}>/mês</span>
          </div>
        </div>
      </header>

      <img
        className={styles.divisor}
        loading="lazy"
        alt=""
        src="/Frame-21472244501@2x.png"
      />

      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            <img
              className={styles.checkIcon}
              alt="Incluso"
              src="/Check1.svg"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <BotaoPlano
        variante={tipoBotao}
        onClick={onSelecionarPlano ? () => onSelecionarPlano(planoId) : undefined}
      />
    </article>
  );
};

CardPlano.propTypes = {
  nome: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  icone: PropTypes.string.isRequired,
  preco: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
  tipoBotao: PropTypes.oneOf(["assinar", "vendas", "adquirido"]),
  destaque: PropTypes.bool,
  colunas: PropTypes.oneOf([1, 2]),
  className: PropTypes.string,
  onSelecionarPlano: PropTypes.func,
  planoId: PropTypes.string,
};

export default CardPlano;
