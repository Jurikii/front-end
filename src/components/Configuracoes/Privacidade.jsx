import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useConfiguracoes } from "../../hooks/useConfiguracoes";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import ModalUnsaved from "./ModalUnsaved";
import s from "./ConfigBase.module.css";

const Privacidade = ({ className = "" }) => {
  const { config, updateConfig, saveConfig, discardConfig, resetConfig, hasUnsavedChanges } = useConfiguracoes();
  const { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar } = useNavigationBlocker(hasUnsavedChanges);
  const [salvo, setSalvo] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [sessoesExpiradas, setSessoesExpiradas] = useState(false);

  const handleSalvar = useCallback(() => { saveConfig(); setSalvo(true); setTimeout(() => setSalvo(false), 1500); }, [saveConfig]);
  const handleSalvarSenha = useCallback(() => { setSenhaAtual(""); setSenhaNova(""); }, []);

  return (
    <>
      <div className={`${s.container} ${className}`}>
        <div className={s.header}>
          <h1 className={s.title}>Privacidade e Segurança</h1>
          <div className={s.subtitle}>Proteja sua conta e controle seus dados</div>
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Alterar senha</h2>
            <div className={s.sectionDesc}>Mantenha sua conta segura alterando sua senha regularmente</div>
          </div>
          <div className={s.colorRow}>
            <div className={s.colorLabel} style={{ minWidth: 120 }}>Senha atual</div>
            <input type="password" className={s.inputField} placeholder="Digite sua senha atual" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
          </div>
          <div className={s.colorRow}>
            <div className={s.colorLabel} style={{ minWidth: 120 }}>Nova senha</div>
            <input type="password" className={s.inputField} placeholder="Digite a nova senha" value={senhaNova} onChange={(e) => setSenhaNova(e.target.value)} />
          </div>
          <div className={s.colorRow}>
            <div style={{ minWidth: 120 }} />
            <div className={`${s.btnSmall} ${s.btnSmallPrimary}`} onClick={handleSalvarSenha}>
              <div>Salvar senha</div>
            </div>
          </div>
        </div>

        <div className={s.divider} />

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Sessões conectadas</h2>
            <div className={s.sectionDesc}>Gerencie os dispositivos conectados à sua conta</div>
          </div>
          <div className={s.sessionList}>
            <div className={s.sessionItem}>
              <div className={s.sessionInfo}>
                <div className={s.sessionName}>Windows · Chrome</div>
                <div className={s.sessionMeta}>Ativo agora · São Paulo, Brasil</div>
              </div>
              <div className={`${s.sessionDot} ${s.sessionDotOnline}`} />
            </div>
            <div className={s.sessionItem}>
              <div className={s.sessionInfo}>
                <div className={s.sessionName}>iPhone · Safari</div>
                <div className={s.sessionMeta}>Há 2 horas · Rio de Janeiro, Brasil</div>
              </div>
              <div className={`${s.sessionDot} ${s.sessionDotOnline}`} />
            </div>
            <div className={s.sessionItem}>
              <div className={s.sessionInfo}>
                <div className={s.sessionName}>Android · App Juriki</div>
                <div className={s.sessionMeta}>Há 1 dia · Belo Horizonte, Brasil</div>
              </div>
              <div className={`${s.sessionDot} ${s.sessionDotOffline}`} />
            </div>
          </div>
          <div className={`${s.btnSmall} ${s.btnSmallSecondary}`} onClick={() => setSessoesExpiradas(true)}>
            <div>{sessoesExpiradas ? "Sessões encerradas!" : "Encerrar outras sessões"}</div>
          </div>
        </div>

        <div className={s.divider} />

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Autenticação e dados</h2>
            <div className={s.sectionDesc}>Configurações avançadas de segurança e privacidade</div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Autenticação em duas etapas</h3>
              <div className={s.switchDesc}>Adicione uma camada extra de segurança à sua conta</div>
            </div>
            <div className={`${s.switchTrack} ${config.autenticacaoDoisFatores ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ autenticacaoDoisFatores: !config.autenticacaoDoisFatores })} role="switch" aria-checked={config.autenticacaoDoisFatores} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ autenticacaoDoisFatores: !config.autenticacaoDoisFatores }); } }}>
              <div className={`${s.switchThumb} ${config.autenticacaoDoisFatores ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Controle de dados pessoais</h3>
              <div className={s.switchDesc}>Gerencie como seus dados são utilizados na plataforma</div>
            </div>
            <div className={`${s.switchTrack} ${config.controleDados ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ controleDados: !config.controleDados })} role="switch" aria-checked={config.controleDados} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ controleDados: !config.controleDados }); } }}>
              <div className={`${s.switchThumb} ${config.controleDados ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.divider} />
          <div className={`${s.btnSmall} ${s.btnSmallSecondary}`}>
            <div>Download dos meus dados</div>
          </div>
          <div className={`${s.btnSmall} ${s.btnSmallOutline}`}>
            <div>Encerrar sessões ativas</div>
          </div>
        </div>

        <div className={s.divider} />

        <div className={s.dangerZone}>
          <h3 className={s.dangerTitle}>Excluir conta</h3>
          <div className={s.dangerDesc}>Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.</div>
          <div className={s.btnDanger} style={{ minWidth: 160, height: 40, fontSize: 14 }}>
            <div>Excluir minha conta</div>
          </div>
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

Privacidade.propTypes = { className: PropTypes.string };
export default Privacidade;
