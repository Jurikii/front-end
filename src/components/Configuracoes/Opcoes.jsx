import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useConfiguracoes } from "../../hooks/useConfiguracoes";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import ModalUnsaved from "./ModalUnsaved";
import s from "./ConfigBase.module.css";

const FONT_SIZES = [
  { id: "pequena", label: "Pequena", cls: "pequena" },
  { id: "padrao", label: "Padrão", cls: "pequena4" },
  { id: "grande", label: "Grande", cls: "pequena6" },
  { id: "extra-grande", label: "Extra grande", cls: "pequena8" },
];

const CARD_IMG = {
  pequena: "/glyphs-font-bold1.svg",
  padrao: "/glyphs-font-bold1.svg",
  grande: "/glyphs-font-bold2@2x.png",
  "extra-grande": "/glyphs-font-bold11@2x.png",
};

const CARD_IMG_CLS = {
  pequena: "glyphsfontBoldIcon",
  padrao: "glyphsfontBoldIcon2",
  grande: "glyphsfontBoldIcon3",
  "extra-grande": "glyphsfontBoldIcon4",
};

import cardStyles from "./Opcoes.module.css";

const Opcoes = ({ className = "" }) => {
  const { config, updateConfig, saveConfig, discardConfig, resetConfig, hasUnsavedChanges } = useConfiguracoes();
  const { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar } = useNavigationBlocker(hasUnsavedChanges);
  const [salvo, setSalvo] = useState(false);

  const isSelected = (id) => config.fontSize === id;

  const handleSalvar = useCallback(() => {
    saveConfig();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 1500);
  }, [saveConfig]);

  const handleReset = useCallback(() => {
    resetConfig();
  }, [resetConfig]);

  return (
    <>
      <div className={`${s.container} ${className}`}>
        <div className={s.header}>
          <h1 className={s.title}>Fonte</h1>
          <div className={s.subtitle}>Personalize o tamanho do texto para deixar a sua leitura mais confortável</div>
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Tamanho da fonte</h2>
            <div className={s.sectionDesc}>Escolha como os textos aparecem na plataforma</div>
          </div>
          <div className={cardStyles.sessaoTamanhos}>
            {FONT_SIZES.map((opt) => (
              <div
                key={opt.id}
                className={`${cardStyles[opt.cls]} ${isSelected(opt.id) ? cardStyles.selecionado : ""}`}
                onClick={() => updateConfig({ fontSize: opt.id })}
                role="radio"
                aria-checked={isSelected(opt.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    updateConfig({ fontSize: opt.id });
                  }
                }}
              >
                <div className={cardStyles.pequena2}>
                  <div className={`${cardStyles.radioCircle} ${isSelected(opt.id) ? cardStyles.radioPreenchido : ""}`} />
                  <h3 className={cardStyles.padro}>{opt.label}</h3>
                </div>
                <img className={cardStyles[CARD_IMG_CLS[opt.id]]} alt="" src={CARD_IMG[opt.id]} />
              </div>
            ))}
          </div>
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Pré-visualização</h2>
            <div className={s.sectionDesc}>Veja como o conteúdo aparecerá para você</div>
          </div>
          <div className={s.preview}>
            <div className={s.previewBox}>
              <div className={s.previewContent}>
                <img className={s.previewAvatar} alt="" src="/heroicons-outline-chat@2x.png" />
                <div className={s.previewTextGroup}>
                  <h3 className={s.previewName}>Resposta da Juriki</h3>
                  <div className={s.previewText}>
                    Você pode ter direito ao <strong>aviso prévio</strong> e ao <strong>FGTS</strong>. Para entender melhor sua situação, conte um pouco mais sobre o que aconteceu.
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

Opcoes.propTypes = { className: PropTypes.string };
export default Opcoes;
