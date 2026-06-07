import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useConfiguracoes } from "../../hooks/useConfiguracoes";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import ModalUnsaved from "./ModalUnsaved";
import s from "./ConfigBase.module.css";

const ESPACAMENTO_LINHAS = [
  { id: "1.4", label: "Compacto" },
  { id: "1.6", label: "Confortável" },
  { id: "1.8", label: "Amplo" },
  { id: "2.0", label: "Muito amplo" },
];

const Acessibilidade = ({ className = "" }) => {
  const { config, updateConfig, saveConfig, discardConfig, resetConfig, hasUnsavedChanges } = useConfiguracoes();
  const { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar } = useNavigationBlocker(hasUnsavedChanges);
  const [salvo, setSalvo] = useState(false);

  const handleSalvar = useCallback(() => { saveConfig(); setSalvo(true); setTimeout(() => setSalvo(false), 1500); }, [saveConfig]);
  const handleReset = useCallback(() => { resetConfig(); }, [resetConfig]);

  return (
    <>
      <div className={`${s.container} ${className}`}>
        <div className={s.header}>
          <h1 className={s.title}>Acessibilidade</h1>
          <div className={s.subtitle}>Configure opções para tornar a plataforma mais acessível para você</div>
        </div>

        {/* ── Visibilidade ───────────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Visibilidade</h2>
            <div className={s.sectionDesc}>Ajustes de contraste e exibição</div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Alto contraste</h3>
              <div className={s.switchDesc}>Aumenta o contraste entre elementos para facilitar a leitura</div>
            </div>
            <div className={`${s.switchTrack} ${config.altoContraste ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ altoContraste: !config.altoContraste })} role="switch" aria-checked={config.altoContraste} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ altoContraste: !config.altoContraste }); } }}>
              <div className={`${s.switchThumb} ${config.altoContraste ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Contraste suave</h3>
              <div className={s.switchDesc}>Reduz o contraste para uma experiência visual mais confortável</div>
            </div>
            <div className={`${s.switchTrack} ${config.contrasteSuave ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ contrasteSuave: !config.contrasteSuave })} role="switch" aria-checked={config.contrasteSuave} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ contrasteSuave: !config.contrasteSuave }); } }}>
              <div className={`${s.switchThumb} ${config.contrasteSuave ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Modo monocromático</h3>
              <div className={s.switchDesc}>Remove cores da interface para exibição em escala de cinza</div>
            </div>
            <div className={`${s.switchTrack} ${config.monocromatico ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ monocromatico: !config.monocromatico })} role="switch" aria-checked={config.monocromatico} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ monocromatico: !config.monocromatico }); } }}>
              <div className={`${s.switchThumb} ${config.monocromatico ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Redução de animações</h3>
              <div className={s.switchDesc}>Remove ou reduz animações e transições da interface</div>
            </div>
            <div className={`${s.switchTrack} ${config.reducaoAnimacao ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ reducaoAnimacao: !config.reducaoAnimacao })} role="switch" aria-checked={config.reducaoAnimacao} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ reducaoAnimacao: !config.reducaoAnimacao }); } }}>
              <div className={`${s.switchThumb} ${config.reducaoAnimacao ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* ── Leitura ────────────────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Leitura</h2>
            <div className={s.sectionDesc}>Melhorias para facilitar a leitura de conteúdos</div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Destacar links</h3>
              <div className={s.switchDesc}>Sublinha e destaca todos os links da página</div>
            </div>
            <div className={`${s.switchTrack} ${config.destacarLinks ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ destacarLinks: !config.destacarLinks })} role="switch" aria-checked={config.destacarLinks} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ destacarLinks: !config.destacarLinks }); } }}>
              <div className={`${s.switchThumb} ${config.destacarLinks ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Destacar títulos</h3>
              <div className={s.switchDesc}>Aumenta a diferenciação visual dos títulos</div>
            </div>
            <div className={`${s.switchTrack} ${config.destacarTitulos ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ destacarTitulos: !config.destacarTitulos })} role="switch" aria-checked={config.destacarTitulos} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ destacarTitulos: !config.destacarTitulos }); } }}>
              <div className={`${s.switchThumb} ${config.destacarTitulos ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.colorRow}>
            <div className={s.colorLabel}>Espaçamento entre linhas</div>
            <select className={s.selectField} value={config.espacamentoLinhas} onChange={(e) => updateConfig({ espacamentoLinhas: e.target.value })}>
              {ESPACAMENTO_LINHAS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
          <div className={s.colorRow}>
            <div className={s.colorLabel}>Espaçamento entre letras</div>
            <select className={s.selectField} value={config.espacamentoLetras} onChange={(e) => updateConfig({ espacamentoLetras: e.target.value })}>
              <option value="0">Normal</option>
              <option value="0.5">0.5px</option>
              <option value="1">1px</option>
              <option value="1.5">1.5px</option>
              <option value="2">2px</option>
            </select>
          </div>
        </div>

        <div className={s.divider} />

        {/* ── Navegação ──────────────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Navegação</h2>
            <div className={s.sectionDesc}>Facilite a navegação pela plataforma</div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Navegação simplificada</h3>
              <div className={s.switchDesc}>Reduz elementos de navegação para exibir apenas o essencial</div>
            </div>
            <div className={`${s.switchTrack} ${config.navegacaoSimplificada ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ navegacaoSimplificada: !config.navegacaoSimplificada })} role="switch" aria-checked={config.navegacaoSimplificada} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ navegacaoSimplificada: !config.navegacaoSimplificada }); } }}>
              <div className={`${s.switchThumb} ${config.navegacaoSimplificada ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Aumentar área de clique</h3>
              <div className={s.switchDesc}>Amplia a área clicável de botões e links</div>
            </div>
            <div className={`${s.switchTrack} ${config.areaClique ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ areaClique: !config.areaClique })} role="switch" aria-checked={config.areaClique} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ areaClique: !config.areaClique }); } }}>
              <div className={`${s.switchThumb} ${config.areaClique ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Melhorar foco de teclado</h3>
              <div className={s.switchDesc}>Destaca visualmente o elemento em foco ao navegar com teclado</div>
            </div>
            <div className={`${s.switchTrack} ${config.focoTeclado ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ focoTeclado: !config.focoTeclado })} role="switch" aria-checked={config.focoTeclado} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ focoTeclado: !config.focoTeclado }); } }}>
              <div className={`${s.switchThumb} ${config.focoTeclado ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* ── Assistência ────────────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Assistência</h2>
            <div className={s.sectionDesc}>Compatibilidade com tecnologias assistivas</div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Compatível com leitores de tela</h3>
              <div className={s.switchDesc}>Otimiza a interface para leitores de tela como NVDA, VoiceOver e TalkBack</div>
            </div>
            <div className={`${s.switchTrack} ${config.leitorTela ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ leitorTela: !config.leitorTela })} role="switch" aria-checked={config.leitorTela} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ leitorTela: !config.leitorTela }); } }}>
              <div className={`${s.switchThumb} ${config.leitorTela ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Descrições ampliadas de ícones</h3>
              <div className={s.switchDesc}>Adiciona descrições textuais detalhadas a todos os ícones</div>
            </div>
            <div className={`${s.switchTrack} ${config.descricoesIcones ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ descricoesIcones: !config.descricoesIcones })} role="switch" aria-checked={config.descricoesIcones} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ descricoesIcones: !config.descricoesIcones }); } }}>
              <div className={`${s.switchThumb} ${config.descricoesIcones ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
          <div className={s.switchRow}>
            <div className={s.switchInfo}>
              <h3 className={s.switchLabel}>Atalhos de acessibilidade</h3>
              <div className={s.switchDesc}>Ativa atalhos de teclado para ações frequentes</div>
            </div>
            <div className={`${s.switchTrack} ${config.atalhosAcessibilidade ? s.switchTrackAtivo : ""}`} onClick={() => updateConfig({ atalhosAcessibilidade: !config.atalhosAcessibilidade })} role="switch" aria-checked={config.atalhosAcessibilidade} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ atalhosAcessibilidade: !config.atalhosAcessibilidade }); } }}>
              <div className={`${s.switchThumb} ${config.atalhosAcessibilidade ? s.switchThumbAtivo : ""}`} />
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* ── Pré-visualização ───────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Pré-visualização</h2>
            <div className={s.sectionDesc}>Exemplo em tempo real mostrando como as alterações afetam a interface</div>
          </div>
          <div className={s.preview}>
            <div className={s.previewBox}>
              <div className={s.previewContent}>
                <img className={s.previewAvatar} alt="" src="/heroicons-outline-chat@2x.png" />
                <div className={s.previewTextGroup}>
                  <h3 className={s.previewName} style={{ textDecoration: config.destacarTitulos ? "underline" : "none", textDecorationColor: "var(--amarelo)", textUnderlineOffset: 4 }}>Juriki IA</h3>
                  <div className={s.previewText} style={{ lineHeight: config.espacamentoLinhas, letterSpacing: `${config.espacamentoLetras}px` }}>
                    Olá! Como posso ajudar você hoje? <a href="#" style={{ color: "var(--azul)", fontWeight: config.destacarLinks ? 700 : 400, textDecoration: config.destacarLinks ? "underline" : "none" }}>Clique aqui</a> para falar com um advogado ou acesse nossos <a href="#" style={{ color: "var(--azul)", fontWeight: config.destacarLinks ? 700 : 400, textDecoration: config.destacarLinks ? "underline" : "none" }}>documentos úteis</a>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.actions}>
          <div className={s.btnPrimary} onClick={handleSalvar}>
            <div>{salvo ? "Salvo!" : "Salvar alterações"}</div>
          </div>
          <div className={s.btnSecondary} onClick={handleReset}>
            <div>Restaurar padrões</div>
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

Acessibilidade.propTypes = { className: PropTypes.string };
export default Acessibilidade;
