import s from "./OpcoesModal.module.css";

export default function ModalUnsaved({ aberto, onSalvar, onSair, onCancelar }) {
  if (!aberto) return null;
  return (
    <div className={s.overlay} onClick={onCancelar}>
      <div className={s.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2 className={s.titulo}>Você possui alterações não salvas</h2>
        <p className={s.mensagem}>Você fez alterações nesta página. Deseja salvar antes de sair?</p>
        <div className={s.botoes}>
          <button className={s.btnSalvar} onClick={onSalvar}>Salvar alterações</button>
          <button className={s.btnSair} onClick={onSair}>Sair sem salvar</button>
          <button className={s.btnCancelar} onClick={onCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
