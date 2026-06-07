import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useConfiguracoes } from "../../hooks/useConfiguracoes";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import ModalUnsaved from "./ModalUnsaved";
import s from "./ConfigBase.module.css";

const TEMAS = [
  { id: "claro", label: "Claro", desc: "Claro" },
  { id: "escuro", label: "Escuro", desc: "Escuro" },
  { id: "sistema", label: "Sistema", desc: "Auto" },
];

const SWATCHES_PRINCIPAL = [
  { label: "Azul Petróleo", value: "#102e44" },
  { label: "Verde Musgo", value: "#2d5016" },
  { label: "Vinho", value: "#6b1d2f" },
  { label: "Roxo", value: "#4a2c6b" },
  { label: "Azul Claro", value: "#1a6fa0" },
  { label: "Terracota", value: "#9e5a3a" },
];

const SWATCHES_DESTAQUE = [
  { label: "Amarelo", value: "#fab84c" },
  { label: "Laranja", value: "#f49d37" },
  { label: "Verde", value: "#4caf50" },
  { label: "Rosa", value: "#e91e63" },
  { label: "Azul", value: "#2196f3" },
  { label: "Vermelho", value: "#d4433a" },
];

const Aparencia = ({ className = "" }) => {
  const { config, updateConfig, saveConfig, discardConfig, resetConfig, hasUnsavedChanges } = useConfiguracoes();
  const { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar } = useNavigationBlocker(hasUnsavedChanges);
  const [salvo, setSalvo] = useState(false);
  const principalRef = useRef(null);
  const destaqueRef = useRef(null);

  const handleSalvar = useCallback(() => { saveConfig(); setSalvo(true); setTimeout(() => setSalvo(false), 1500); }, [saveConfig]);
  const handleReset = useCallback(() => { resetConfig(); }, [resetConfig]);

  const isPrincipalCustom = !SWATCHES_PRINCIPAL.some((s) => s.value === config.corPrincipal);
  const isDestaqueCustom = !SWATCHES_DESTAQUE.some((s) => s.value === config.corDestaque);

  return (
    <>
      <div className={`${s.container} ${className}`}>
        <div className={s.header}>
          <h1 className={s.title}>Aparência</h1>
          <div className={s.subtitle}>Personalize a aparência visual da plataforma</div>
        </div>

        {/* Tema */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Tema</h2>
            <div className={s.sectionDesc}>Escolha entre claro, escuro ou automático</div>
          </div>
          <div className={s.temaGrid}>
            {TEMAS.map((t) => (
              <div
                key={t.id}
                className={`${s.temaCard} ${config.tema === t.id ? s.temaCardSelected : ""}`}
                onClick={() => updateConfig({ tema: t.id })}
                role="radio"
                aria-checked={config.tema === t.id}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateConfig({ tema: t.id }); } }}
              >
                <div className={`${s.temaPreview} ${t.id === "escuro" ? s.temaPreviewEscuro : t.id === "sistema" ? s.temaPreviewSistema : ""}`}>
                  <div className={s.temaPreviewBar}>
                    <div className={s.temaPreviewDot} style={{ backgroundColor: config.corDestaque }} />
                    <div className={s.temaPreviewDots}>
                      <span /><span />
                    </div>
                  </div>
                  <div className={s.temaPreviewBody}>
                    <div className={s.temaPreviewBodyBlock} />
                    <div className={`${s.temaPreviewBodyBlock} ${s.temaPreviewBodyBlockAccent}`} style={{ width: "60%" }} />
                  </div>
                </div>
                <div className={s.temaInfo}>
                  <span className={s.temaLabel}>{t.label}</span>
                  <span className={s.temaDesc}>{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.divider} />

        {/* Cores */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Cores</h2>
            <div className={s.sectionDesc}>Personalize a paleta de cores da interface</div>
          </div>

          <div className={s.colorsCard}>
            <div className={s.colorsCardBody}>
              {/* Principal */}
              <div className={s.colorBlock}>
                <div className={s.colorBlockHeader}>
                  <div className={s.colorBlockSwatch} style={{ backgroundColor: config.corPrincipal }} />
                  <span className={s.colorBlockLabel}>Cor principal</span>
                  <span className={s.colorBlockHex}>{config.corPrincipal}</span>
                  <span className={s.colorBlockName}>
                    {isPrincipalCustom ? "Personalizada" : SWATCHES_PRINCIPAL.find((s) => s.value === config.corPrincipal)?.label}
                  </span>
                </div>
                <div className={s.swatchRow}>
                  {SWATCHES_PRINCIPAL.map((sw) => (
                    <button
                      key={sw.value}
                      className={`${s.swatchBtn} ${config.corPrincipal === sw.value ? s.swatchBtnSelected : ""}`}
                      style={{ backgroundColor: sw.value }}
                      onClick={() => updateConfig({ corPrincipal: sw.value })}
                      title={sw.label}
                    />
                  ))}
                  <button
                    className={`${s.swatchBtn} ${s.swatchBtnCustom} ${isPrincipalCustom ? s.swatchBtnSelected : ""}`}
                    onClick={() => principalRef.current?.click()}
                    title="Personalizada"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4m10-10h-4M6 12H2"/></svg>
                    <input ref={principalRef} type="color" value={config.corPrincipal} onChange={(e) => updateConfig({ corPrincipal: e.target.value })} className={s.swatchPicker} />
                  </button>
                </div>
              </div>

              <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.06)" }} />

              {/* Destaque */}
              <div className={s.colorBlock}>
                <div className={s.colorBlockHeader}>
                  <div className={s.colorBlockSwatch} style={{ backgroundColor: config.corDestaque }} />
                  <span className={s.colorBlockLabel}>Cor de destaque</span>
                  <span className={s.colorBlockHex}>{config.corDestaque}</span>
                  <span className={s.colorBlockName}>
                    {isDestaqueCustom ? "Personalizada" : SWATCHES_DESTAQUE.find((s) => s.value === config.corDestaque)?.label}
                  </span>
                </div>
                <div className={s.swatchRow}>
                  {SWATCHES_DESTAQUE.map((sw) => (
                    <button
                      key={sw.value}
                      className={`${s.swatchBtn} ${config.corDestaque === sw.value ? s.swatchBtnSelected : ""}`}
                      style={{ backgroundColor: sw.value }}
                      onClick={() => updateConfig({ corDestaque: sw.value })}
                      title={sw.label}
                    />
                  ))}
                  <button
                    className={`${s.swatchBtn} ${s.swatchBtnCustom} ${isDestaqueCustom ? s.swatchBtnSelected : ""}`}
                    onClick={() => destaqueRef.current?.click()}
                    title="Personalizada"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4m10-10h-4M6 12H2"/></svg>
                    <input ref={destaqueRef} type="color" value={config.corDestaque} onChange={(e) => updateConfig({ corDestaque: e.target.value })} className={s.swatchPicker} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* Info banner */}
        <div className={s.infoBanner}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, opacity: 0.5 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>As alterações serão aplicadas em toda a plataforma, incluindo botões, destaques, menus e elementos visuais.</span>
        </div>

        <div className={s.divider} />

        {/* Pré-visualização */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Pré-visualização</h2>
            <div className={s.sectionDesc}>As cores e o tema atualizados em tempo real</div>
          </div>

          <div className={`${s.previewDevice} ${config.tema === "escuro" ? s.previewDeviceEscuro : ""}`}>
            {/* Navbar */}
            <div className={s.previewNavbar} style={{ backgroundColor: config.corPrincipal }}>
              <div className={s.previewNavLogo}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Juriki</span>
              </div>
              <div className={s.previewNavLinks}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>Início</span>
                <span style={{ color: config.corDestaque, fontWeight: 600, fontSize: 10 }}>Processos</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>Config</span>
              </div>
              <div className={s.previewNavAvatar} style={{ backgroundColor: config.corDestaque, color: config.corPrincipal }}>J</div>
            </div>

            <div className={s.previewBody}>
              {/* Card */}
              <div className={`${s.previewCard} ${config.tema === "escuro" ? s.previewCardEscuro : ""}`}>
                <div className={s.previewCardTop}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={config.corDestaque} strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <div>
                    <div className={s.previewCardTitle} style={{ color: config.tema === "escuro" ? "#eee" : config.corPrincipal }}>João Silva</div>
                    <div className={s.previewCardSub}>joao@email.com</div>
                  </div>
                  <div className={s.previewBadge} style={{ backgroundColor: config.corDestaque, color: config.corPrincipal }}>Ativo</div>
                </div>
                <div className={s.previewCardDetails}>
                  <div className={s.previewDetailRow}>
                    <span>Processo</span>
                    <strong>2024.01.003478-2</strong>
                  </div>
                  <div className={s.previewDetailRow}>
                    <span>Status</span>
                    <strong>Em andamento</strong>
                  </div>
                </div>
              </div>

              {/* IA message */}
              <div className={`${s.previewAiMsg} ${config.tema === "escuro" ? "" : ""}`}>
                <div className={s.previewAiAvatar} style={{ backgroundColor: config.corDestaque }} />
                <div>
                  <strong style={{ color: config.tema === "escuro" ? "#eee" : config.corPrincipal }}>Juriki IA</strong>{" "}
                  identificou um <strong style={{ color: config.corDestaque }}>prazo próximo</strong>.{" "}
                  <span className={s.previewAiLink} style={{ color: config.corPrincipal }}>Clique para revisar</span>
                </div>
              </div>

              {/* Buttons */}
              <div className={s.previewActions}>
                <div className={s.previewBtnPrimary} style={{ backgroundColor: config.corDestaque, color: config.corPrincipal }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Salvar
                </div>
                <div className={s.previewBtnSecondary} style={{ borderColor: config.corDestaque, color: config.corDestaque }}>
                  Cancelar
                </div>
              </div>

              {/* Links */}
              <div className={s.previewLinks}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={config.corDestaque} strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <span style={{ color: config.corDestaque, fontWeight: 600 }}>Ver detalhes</span>
                <span style={{ color: config.tema === "escuro" ? "#666" : "#bbb" }}>•</span>
                <span style={{ color: config.tema === "escuro" ? "#888" : "#888" }}>Anexos</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill={config.corDestaque} stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* Actions */}
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

Aparencia.propTypes = { className: PropTypes.string };
export default Aparencia;
