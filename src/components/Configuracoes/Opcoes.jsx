import PropTypes from "prop-types";
import styles from "./Opcoes.module.css";

const Opcoes = ({ className = "" }) => {
  return (
    <div className={[styles.opcoes, className].join(" ")}>
      <div className={styles.fontinhas}>
        <h1 className={styles.fonte}>Fonte</h1>
        <div className={styles.personalizeOTamanho}>
          Personalize o tamanho do texto para deixar a sua leitura mais
          confortável
        </div>
      </div>
      <section className={styles.tamanhoDaFonte}>
        <div className={styles.fontinhas}>
          <h2 className={styles.tamanhoDaFonte2}>Tamanho da fonte</h2>
          <div className={styles.personalizeOTamanho}>
            Escolha como os textos aparecem na plataforma
          </div>
        </div>
        <div className={styles.sessaoTamanhos}>
          <div className={styles.pequena}>
            <div className={styles.pequena2}>
              <div className={styles.pequenaChild} />
              <h3 className={styles.padro}>Pequena</h3>
            </div>
            <img
              className={styles.glyphsfontBoldIcon}
              alt=""
              src="/glyphs-font-bold1.svg"
            />
          </div>
          <div className={styles.pequena4}>
            <div className={styles.pequena5}>
              <div className={styles.pequenaItem} />
              <h3 className={styles.padro}>Padrão</h3>
            </div>
            <img
              className={styles.glyphsfontBoldIcon2}
              alt=""
              src="/glyphs-font-bold1.svg"
            />
          </div>
          <div className={styles.pequena6}>
            <div className={styles.pequena2}>
              <div className={styles.pequenaChild} />
              <h3 className={styles.padro}>Grande</h3>
            </div>
            <img
              className={styles.glyphsfontBoldIcon3}
              alt=""
              src="/glyphs-font-bold2@2x.png"
            />
          </div>
          <div className={styles.pequena8}>
            <div className={styles.pequena2}>
              <div className={styles.pequenaChild} />
              <h3 className={styles.padro}>Extra grande</h3>
            </div>
            <img
              className={styles.glyphsfontBoldIcon4}
              alt=""
              src="/glyphs-font-bold11@2x.png"
            />
          </div>
        </div>
      </section>
      <section className={styles.testeVisualicao}>
        <div className={styles.tamanhoFonte2}>
          <h3 className={styles.padro}>Pré-visualização</h3>
          <div className={styles.vejaComoO}>
            Veja como o conteúdo aparecerá para você.
          </div>
        </div>
        <div className={styles.processosEmAndamento}>
          <div className={styles.processosEmAndamento2}>
            <img
              className={styles.heroiconsOutlinechat}
              loading="lazy"
              alt=""
              src="/heroicons-outline-chat@2x.png"
            />
            <div className={styles.processosEmAndamento3}>
              <h3 className={styles.padro}>Resposta da Juriki</h3>
              <div className={styles.vocPodeTer}>
                Você pode ter direito ao aviso prévio e ao FGTS. para entender
                melhor sua situação, conte um pouco mais sobre o que aconteceu.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.preferencias}>
        <div className={styles.preferenciaDeLeitura}>
          <div className={styles.tamanhoFonte2}>
            <h3 className={styles.prefernciasDeLeitura}>
              Preferências de leitura
            </h3>
            <div className={styles.vejaComoO}>
              Veja como o conteúdo aparecerá para você.
            </div>
          </div>
          <div className={styles.opcoes2}>
            <div className={styles.compacto}>
              <div className={styles.pequena10}>
                <div className={styles.pequenaChild2} />
                <div className={styles.confortvel}>Compacto</div>
              </div>
              <div className={styles.lineParent}>
                <div className={styles.frameChild} />
                <div className={styles.lineWrapper}>
                  <div className={styles.frameChild} />
                </div>
                <div className={styles.frameChild} />
              </div>
            </div>
            <div className={styles.confortavel}>
              <div className={styles.pequena11}>
                <div className={styles.pequenaChild3} />
                <div className={styles.confortvel}>Confortável</div>
              </div>
              <div className={styles.lineGroup}>
                <div className={styles.lineDiv} />
                <div className={styles.lineDiv} />
                <div className={styles.lineDiv} />
                <div className={styles.lineDiv} />
              </div>
            </div>
            <div className={styles.compacto}>
              <div className={styles.pequena10}>
                <div className={styles.pequenaChild4} />
                <div className={styles.confortvel}>Amplo</div>
              </div>
              <div className={styles.vectorParent}>
                <img
                  className={styles.lineIcon}
                  loading="lazy"
                  alt=""
                  src="/Line-85.svg"
                />
                <img
                  className={styles.lineIcon}
                  loading="lazy"
                  alt=""
                  src="/Line-85.svg"
                />
                <div className={styles.frameChild6} />
                <div className={styles.frameChild6} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.opcoes3}>
          <div className={styles.destacar}>
            <img
              className={styles.lsiconcheckCorrectOutline}
              alt=""
              src="/lsicon-check-correct-outline.svg"
            />
            <div className={styles.destacarOpcoes}>
              <h3 className={styles.destacarInformaesImportant}>
                Destacar informações importantes
              </h3>
            </div>
          </div>
          <div className={styles.negrito}>
            <img
              className={styles.lsiconcheckCorrectOutline}
              alt=""
              src="/lsicon-check-correct-outline.svg"
            />
            <div className={styles.destacarOpcoes2}>
              <h3 className={styles.destacarInformaesImportant}>
                Exibir textos importantes em negrito
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.btns}>
        <div className={styles.btnVerPlanos}>
          <div className={styles.salvarAlteraes}>Salvar alterações</div>
        </div>
        <div className={styles.btnVerPlanos2}>
          <div className={styles.salvarAlteraes}>Restaurar padrões</div>
        </div>
      </div>
    </div>
  );
};

Opcoes.propTypes = {
  className: PropTypes.string,
};

export default Opcoes;
