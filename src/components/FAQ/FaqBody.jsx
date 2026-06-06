import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PerguntaFaq from "./PerguntaFaq";
import TernoAmarelo from "./TernoAmarelo";
import EscudoAzul from "./EscudoAzul";
import CartoAzul from "./CartoAzul";
import PropTypes from "prop-types";
import styles from "./FaqBody.module.css";

const FaqBody = ({ className = "" }) => {
  const navigate = useNavigate();

  const onBotoDvidasContainerClick = useCallback(() => {
    navigate("/#chat-demo");
  }, [navigate]);

  return (
    <section className={[styles.faqBody, className].join(" ")}>
      <section className={styles.categorias}>
        <div className={styles.maisBuscadas}>
          <img
            className={styles.streamlinestar1SolidIcon}
            loading="lazy"
            alt=""
            src="/streamline-star-1-solid.svg"
          />
          <h3 className={styles.sobreAIa}>Mais buscadas</h3>
        </div>
        <div className={styles.sobreIa}>
          <img
            className={styles.magerobotHappyIcon}
            loading="lazy"
            alt=""
            src="/mage-robot-happy.svg"
          />
          <h3 className={styles.sobreAIa}>Sobre a IA</h3>
        </div>
        <div className={styles.sobreUso}>
          <img
            className={styles.streamlinestar1SolidIcon}
            loading="lazy"
            alt=""
            src="/hugeicons-chat.svg"
          />
          <h3 className={styles.sobreAIa}>Sobre o uso</h3>
        </div>
        <div className={styles.sobreIa}>
          <img
            className={styles.streamlinestar1SolidIcon}
            loading="lazy"
            alt=""
            src="/icon-park-protect.svg"
          />
          <h3 className={styles.sobreAIa}>Privacidade e segurança</h3>
        </div>
        <div className={styles.sobreIa}>
          <img
            className={styles.entypobriefcaseIcon}
            loading="lazy"
            alt=""
            src="/entypo-briefcase.svg"
          />
          <h3 className={styles.sobreAIa}>Para advogados</h3>
        </div>
        <div className={styles.sobreIa}>
          <img
            className={styles.streamlinestar1SolidIcon}
            loading="lazy"
            alt=""
            src="/fluent-emoji-high-contrast-sunflower.svg"
          />
          <h3 className={styles.sobreAIa}>Sobre a plataforma</h3>
        </div>
        <div className={styles.mensagem}>
          <div className={styles.texto}>
            <div className={styles.aJurikiExiste}>
              A juriki existe para tornar o jurídico simples, acessível e
              humano.
            </div>
            <div className={styles.conteComA}>Conte com a gente!</div>
          </div>
          <img
            className={styles.image114Icon}
            loading="lazy"
            alt=""
            src="/image-114@2x.png"
          />
        </div>
      </section>
      <div className={styles.perguntasMaisBuscadas}>
        <div className={styles.perguntasMaisBuscadas2}>
          <div className={styles.ttuloSeo}>
            <div className={styles.iconeEPergunta}>
              <img
                className={styles.estrelaIcon}
                loading="lazy"
                alt=""
                src="/estrela@2x.png"
              />
              <div className={styles.texto2}>
                <h2 className={styles.maisBuscadas3}>Mais buscadas</h2>
                <h3 className={styles.asDvidasMais}>
                  As dúvidas mais comuns de quem está começando.
                </h3>
              </div>
            </div>
          </div>
          <section className={styles.peguntas}>
            <PerguntaFaq
              property1="aberto"
              aJurikiSubstituiUmAdvogado="A Juriki substitui um advogado?"
              materialSymbolsplayArrowRounded="/material-symbols-play-arrow-rounded@2x.png"
              noAJurikiTeAjudaAEntenderS={`Não. A Juriki te ajuda a entender sua situação de forma simples e rápida.
Se o seu caso precisar de um advogado, a gente te orienta e te conecta com um profissional.`}
              iconeAmarelo={<TernoAmarelo property1="aberto" />}
              iconePergunta={null}
            />
            <PerguntaFaq
              property1="fechado"
              aJurikiSubstituiUmAdvogado="Posso confiar nas respostas?"
              materialSymbolsplayArrowRounded="/material-symbols-play-arrow-rounded1@2x.png"
              noAJurikiTeAjudaAEntenderS={`Sim — usamos fontes jurídicas confiáveis pra te orientar.
Mas é importante lembrar: nossas respostas são um ponto de partida.
Para decisões importantes, o ideal é contar com um advogado.`}
              iconeAmarelo={<EscudoAzul property1="fechado" />}
              iconePergunta={<EscudoAzul property1="fechado" />}
              iconePergunta1={<EscudoAzul property1="fechado" />}
            />
            <PerguntaFaq
              property1="fechado"
              aJurikiSubstituiUmAdvogado="Preciso pagar para usar?"
              materialSymbolsplayArrowRounded="/material-symbols-play-arrow-rounded1@2x.png"
              noAJurikiTeAjudaAEntenderS={`Você pode começar de graça.
Algumas funcionalidades mais avançadas fazem parte dos planos pagos.`}
              iconeAmarelo={<CartoAzul property1="fechado" />}
              iconePergunta={null}
            />
          </section>
          <section className={styles.aindaDvidas}>
            <img
              className={styles.imagemETexto}
              loading="lazy"
              alt=""
              src="/imagem-e-texto@2x.png"
            />
            <div className={styles.botoESeguro}>
              <div
                className={styles.botoDvidas}
                onClick={onBotoDvidasContainerClick}
              >
                <img
                  className={styles.hugeiconschat01}
                  alt=""
                  src="/hugeicons-chat-01.svg"
                />
                <div className={styles.perguntarParaA}>Perguntar para a IA</div>
              </div>
              <div className={styles.seguro}>
                <img
                  className={styles.materialSymbolslockOutlineIcon}
                  loading="lazy"
                  alt=""
                  src="/material-symbols-lock-outline.svg"
                />
                <div className={styles.rpidoSeguroE}>
                  Rápido, seguro e gratuito
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

FaqBody.propTypes = {
  className: PropTypes.string,
};

export default FaqBody;
