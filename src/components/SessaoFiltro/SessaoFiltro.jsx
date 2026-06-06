import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SessaoFiltro.module.css";

const OPPOROES = [4, 8, 12, 24];

const SessaoFiltro = ({
  className = "",
  total = 0,
  exibindo = 0,
  itensPorPagina = 12,
  paginaAtual = 1,
  onChangeItensPorPagina,
  onPaginaAnterior,
  onPaginaProxima,
}) => {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const totalPaginas = Math.max(1, Math.ceil(total / itensPorPagina));

  return (
    <footer className={[styles.sessaoFiltro, className].join(" ")}>
      <div className={styles.saudacaoDocumentos}>
        <div className={styles.cumprimentosHome}>
          <h3 className={styles.mostrando7De}>
            Mostrando {exibindo} de {total} documentos
          </h3>
        </div>
      </div>
      <div className={styles.sessao}>
        <img
          className={styles.eiarrowLeftIcon}
          alt="Anterior"
          src="/ei-arrow-left.svg"
          onClick={paginaAtual > 1 ? onPaginaAnterior : undefined}
          style={{ cursor: paginaAtual > 1 ? "pointer" : "default", opacity: paginaAtual > 1 ? 1 : 0.3 }}
        />
        <div className={styles.numero}>
          <h3 className={styles.mostrando7De}>{paginaAtual}</h3>
        </div>
        <img
          className={styles.eiarrowLeftIcon2}
          alt="Próxima"
          src="/ei-arrow-left.svg"
          onClick={paginaAtual < totalPaginas ? onPaginaProxima : undefined}
          style={{ cursor: paginaAtual < totalPaginas ? "pointer" : "default", opacity: paginaAtual < totalPaginas ? 1 : 0.3 }}
        />
      </div>
      <div className={styles.itensPorPgina}>
        <div className={styles.textoPasta}>
          <div className={styles.div}>Itens por página</div>
        </div>
        <div className={styles.selectWrapper}>
          <div
            className={styles.numbers}
            onClick={() => setDropdownAberto((prev) => !prev)}
          >
            <div className={styles.div}>{itensPorPagina}</div>
            <img
              className={styles.akarIconstriangleFill}
              loading="lazy"
              alt=""
              src="/akar-icons-triangle-fill.svg"
            />
          </div>
          {dropdownAberto && (
            <div className={styles.dropdown}>
              {OPPOROES.map((opcao) => (
                <div
                  key={opcao}
                  className={`${styles.dropdownItem} ${opcao === itensPorPagina ? styles.dropdownItemAtivo : ""}`}
                  onClick={() => {
                    onChangeItensPorPagina(opcao);
                    setDropdownAberto(false);
                  }}
                >
                  {opcao}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

SessaoFiltro.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  exibindo: PropTypes.number,
  itensPorPagina: PropTypes.number,
  paginaAtual: PropTypes.number,
  onChangeItensPorPagina: PropTypes.func,
  onPaginaAnterior: PropTypes.func,
  onPaginaProxima: PropTypes.func,
};

export default SessaoFiltro;
