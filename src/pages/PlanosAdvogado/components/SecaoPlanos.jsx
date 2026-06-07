import PropTypes from "prop-types";
import CardPlano from "./CardPlano";
import styles from "./SecaoPlanos.module.css";

const SecaoPlanos = ({ titulo, icone, planos = [], colunas = 1, planoAtivo, onSelecionarPlano }) => {
  return (
    <section className={styles.secao}>
      <header className={styles.cabecalho}>
        <img className={styles.icone} loading="lazy" alt="" src={icone} />
        <h3 className={styles.titulo}>{titulo}</h3>
      </header>

      <div className={styles.cards}>
        {planos.map((plano) => (
          <CardPlano
            key={plano.id}
            nome={plano.nome}
            descricao={plano.descricao}
            icone={plano.icone}
            preco={plano.preco}
            features={plano.features}
            tipoBotao={plano.id === planoAtivo ? "adquirido" : plano.tipoBotao}
            destaque={plano.id === planoAtivo ? true : plano.destaque}
            colunas={colunas}
            onSelecionarPlano={onSelecionarPlano}
            planoId={plano.id}
          />
        ))}
      </div>
    </section>
  );
};

SecaoPlanos.propTypes = {
  titulo: PropTypes.string.isRequired,
  icone: PropTypes.string.isRequired,
  planos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      descricao: PropTypes.string.isRequired,
      icone: PropTypes.string.isRequired,
      preco: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string),
      tipoBotao: PropTypes.oneOf(["assinar", "vendas"]),
      destaque: PropTypes.bool,
    })
  ),
  colunas: PropTypes.oneOf([1, 2]),
  planoAtivo: PropTypes.string,
  onSelecionarPlano: PropTypes.func,
};

export default SecaoPlanos;
