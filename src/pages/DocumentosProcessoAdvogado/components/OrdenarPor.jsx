import styles from "./OrdenarPor.module.css";

const opcoes = [
  { id: "recentes", label: "Mais Recentes" },
  { id: "antigos", label: "Mais antigos" },
  { id: "nome-az", label: "Nome do cliente (A-Z)" },
  { id: "nome-za", label: "Nome do cliente (Z-A)" },
  { id: "prioridade-alta", label: "Prioridade (Alta → Baixa)" },
  { id: "prioridade-baixa", label: "Prioridade (Baixa → Alta)" },
];

export default function OrdenarPor({ aberto, onFechar, selecionado, onChange }) {
  return (
    <div className={`${styles.ordenarOverlay} ${aberto ? styles.ordenarOverlayAberto : ''}`} onClick={onFechar}>
      <div
        className={styles.ordenarModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.ordenarHeader}>
          <div className={styles.ordenarTitulo}>
            <svg
              className={styles.ordenarIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h18M7 12h10M11 18h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 9L3 6l3-3M18 15l3 3-3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.ordenarTituloTexto}>Ordenar por</span>
          </div>
          <button className={styles.ordenarFechar} onClick={onFechar}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.ordenarDivider} />

        <div className={styles.ordenarLista}>
          {opcoes.map((opcao) => (
            <label
              key={opcao.id}
              className={styles.ordenarOpcao}
              onClick={() => { onChange(opcao.id); onFechar(); }}
            >
              <span
                className={[styles.ordenarRadio, selecionado === opcao.id ? styles.selecionado : ""].join(" ")}
              >
                {selecionado === opcao.id && (
                  <span className={styles.ordenarRadioInner} />
                )}
              </span>
              <span className={styles.ordenarOpcaoLabel}>{opcao.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
