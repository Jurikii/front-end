import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useConfiguracoes } from "../../hooks/useConfiguracoes";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import ModalUnsaved from "./ModalUnsaved";
import s from "./ConfigBase.module.css";

const TOGGLES = [
  { key: "emailNotif", label: "Notificações por e-mail", desc: "Receba atualizações importantes no seu e-mail" },
  { key: "processoNotif", label: "Notificações de processos", desc: "Alertas sobre andamentos e movimentações" },
  { key: "consultaNotif", label: "Notificações de consultas", desc: "Lembretes de consultas agendadas com advogados" },
  { key: "lembreteNotif", label: "Lembretes importantes", desc: "Prazos, audiências e compromissos" },
  { key: "documentoNotif", label: "Avisos de documentos", desc: "Notifique quando novos documentos forem disponibilizados" },
  { key: "somNotif", label: "Ativar sons", desc: "Reproduzir sons ao receber notificações" },
];

const Notificacoes = ({ className = "" }) => {
  const { config, updateConfig, saveConfig, discardConfig, resetConfig, hasUnsavedChanges } = useConfiguracoes();
  const { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar } = useNavigationBlocker(hasUnsavedChanges);
  const [salvo, setSalvo] = useState(false);

  const handleSalvar = useCallback(() => { saveConfig(); setSalvo(true); setTimeout(() => setSalvo(false), 1500); }, [saveConfig]);

  return (
    <>
      <div className={`${s.container} ${className}`}>
        <div className={s.header}>
          <h1 className={s.title}>Notificações</h1>
          <div className={s.subtitle}>Gerencie como e quando você recebe notificações</div>
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Preferências de notificação</h2>
            <div className={s.sectionDesc}>Ative ou desative cada tipo de notificação</div>
          </div>
          {TOGGLES.map((t) => (
            <div key={t.key} className={s.switchRow}>
              <div className={s.switchInfo}>
                <h3 className={s.switchLabel}>{t.label}</h3>
                <div className={s.switchDesc}>{t.desc}</div>
              </div>
              <div
                className={`${s.switchTrack} ${config[t.key] ? s.switchTrackAtivo : ""}`}
                onClick={() => updateConfig({ [t.key]: !config[t.key] })}
                role="switch"
                aria-checked={config[t.key]}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ [t.key]: !config[t.key] }); } }}
              >
                <div className={`${s.switchThumb} ${config[t.key] ? s.switchThumbAtivo : ""}`} />
              </div>
            </div>
          ))}
        </div>

        <div className={s.actions}>
          <div className={s.btnPrimary} onClick={handleSalvar}>
            <div>{salvo ? "Salvo!" : "Salvar alterações"}</div>
          </div>
        </div>
      </div>

      <ModalUnsaved
        aberto={modalAberto}
        onSalvar={() => handleModalSalvar(saveConfig)}
        onSair={() => handleModalSair(discardConfig)}
        onCancelar={handleModalCancelar}
      />
    </>
  );
};

Notificacoes.propTypes = { className: PropTypes.string };
export default Notificacoes;
