import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PerguntaFaq from "./PerguntaFaq";
import TernoAmarelo from "./TernoAmarelo";
import EscudoAzul from "./EscudoAzul";
import CartoAzul from "./CartoAzul";
import PropTypes from "prop-types";
import styles from "./FaqBody.module.css";

const categorias = [
  { id: "mais-buscadas", label: "Mais buscadas", icone: "/streamline-star-1-solid.svg" },
  { id: "sobre-ia", label: "Sobre a IA", icone: "/mage-robot-happy.svg" },
  { id: "sobre-uso", label: "Sobre o uso", icone: "/hugeicons-chat.svg" },
  { id: "privacidade", label: "Privacidade e segurança", icone: "/icon-park-protect.svg" },
  { id: "advogados", label: "Para advogados", icone: "/entypo-briefcase.svg" },
  { id: "plataforma", label: "Sobre a plataforma", icone: "/fluent-emoji-high-contrast-sunflower.svg" },
];

const todasPerguntas = [
  { categoria: "mais-buscadas", pergunta: "A Juriki substitui um advogado?", resposta: "Não. A Juriki te ajuda a entender sua situação de forma simples e rápida.\nSe o seu caso precisar de um advogado, a gente te orienta e te conecta com um profissional.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, material: "/material-symbols-play-arrow-rounded@2x.png", aberto: true },
  { categoria: "mais-buscadas", pergunta: "Posso confiar nas respostas?", resposta: "Sim — usamos fontes jurídicas confiáveis pra te orientar.\nMas é importante lembrar: nossas respostas são um ponto de partida.\nPara decisões importantes, o ideal é contar com um advogado.", iconeAmarelo: "escudo", iconePergunta: "escudo", iconePergunta1: "escudo", material: "/material-symbols-play-arrow-rounded1@2x.png", aberto: false },
  { categoria: "mais-buscadas", pergunta: "Preciso pagar para usar?", resposta: "A IA da Juriki é gratuita para tirar dúvidas jurídicas. Já as consultas com advogados parceiros e o suporte especializado estão disponíveis nos planos pagos.", iconeAmarelo: "carto", iconePergunta: null, iconePergunta1: null, material: "/material-symbols-play-arrow-rounded1@2x.png", aberto: false },
  { categoria: "sobre-ia", pergunta: "Como a IA da Juriki funciona?", resposta: "A IA da Juriki utiliza inteligência artificial para analisar sua pergunta e encontrar respostas com base em fontes jurídicas confiáveis. O processo é rápido, simples e pensado para quem não entende de leis.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "sobre-ia", pergunta: "A IA da Juriki substitui uma consulta com advogado?", resposta: "Não. A IA da Juriki é uma ferramenta de orientação inicial. Ela te ajuda a entender sua situação, mas para questões mais complexas ou documentos específicos, é recomendado buscar um advogado parceiro.", iconeAmarelo: "escudo", iconePergunta: "escudo", iconePergunta1: "escudo", aberto: false },
  { categoria: "sobre-ia", pergunta: "As respostas da IA são personalizadas para o meu caso?", resposta: "Sim! A IA considera as informações que você compartilha para oferecer uma resposta mais alinhada à sua situação. Quanto mais detalhes você fornecer, mais precisa será a orientação.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "sobre-uso", pergunta: "Como faço para usar a Juriki?", resposta: "É simples! Basta acessar o chat e fazer sua pergunta sobre uma situação jurídica. A IA vai te orientar de forma clara e sem juridiquês.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "sobre-uso", pergunta: "Preciso criar uma conta para usar?", resposta: "Sim, você pode criar uma conta gratuita para acessar a IA e salvar seu histórico de consultas. O processo é rápido e seguro.", iconeAmarelo: "escudo", iconePergunta: "escudo", iconePergunta1: "escudo", aberto: false },
  { categoria: "sobre-uso", pergunta: "Posso usar a Juriki pelo celular?", resposta: "Sim! A Juriki é totalmente responsiva e funciona perfeitamente no navegador do seu celular, tablet ou computador.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "privacidade", pergunta: "Meus dados estão seguros na Juriki?", resposta: "Sim. A Juriki segue as melhores práticas de segurança e proteção de dados, em conformidade com a LGPD. Suas informações são tratadas com sigilo.", iconeAmarelo: "escudo", iconePergunta: "escudo", iconePergunta1: "escudo", aberto: false },
  { categoria: "privacidade", pergunta: "A Juriki compartilha minhas informações com terceiros?", resposta: "Não. Suas informações são usadas exclusivamente para melhorar sua experiência e gerar respostas mais precisas. Não compartilhamos seus dados sem seu consentimento.", iconeAmarelo: "escudo", iconePergunta: "escudo", iconePergunta1: "escudo", aberto: false },
  { categoria: "privacidade", pergunta: "Posso excluir meu histórico de consultas?", resposta: "Sim! Você pode solicitar a exclusão do seu histórico a qualquer momento. Basta acessar as configurações da sua conta.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "advogados", pergunta: "Advogados podem usar a Juriki?", resposta: "Sim! A Juriki também é uma ferramenta útil para advogados que querem agilizar o atendimento inicial ou explicar conceitos jurídicos de forma mais clara para seus clientes.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "advogados", pergunta: "Como posso me tornar um advogado parceiro?", resposta: "Entre em contato conosco através do formulário disponível no site. Avaliamos seu perfil e, se houver compatibilidade, você pode fazer parte da nossa rede de parceiros.", iconeAmarelo: "carto", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "advogados", pergunta: "A Juriki pode ajudar na minha rotina jurídica?", resposta: "Com certeza! A IA pode auxiliar na triagem de dúvidas recorrentes, liberando mais tempo para você focar em questões estratégicas dos seus casos.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "plataforma", pergunta: "O que é a Juriki?", resposta: "A Juriki é uma plataforma que usa inteligência artificial para tornar o jurídico simples e acessível para todos. Nosso objetivo é ajudar você a entender seus direitos sem precisar de juridiquês.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "plataforma", pergunta: "A Juriki tem aplicativo?", resposta: "Ainda não temos um aplicativo nativo, mas a plataforma é totalmente responsiva e funciona perfeitamente pelo navegador de qualquer dispositivo.", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
  { categoria: "plataforma", pergunta: "Como posso entrar em contato com a Juriki?", resposta: "Você pode entrar em contato conosco através do formulário disponível no site ou enviar um e-mail para nosso suporte. Estamos sempre prontos para ajudar!", iconeAmarelo: "terno", iconePergunta: null, iconePergunta1: null, aberto: false },
];

const mapaIcone = {
  terno: (props) => <TernoAmarelo {...props} />,
  escudo: (props) => <EscudoAzul {...props} />,
  carto: (props) => <CartoAzul {...props} />,
};

const FaqBody = ({ className = "", searchTerm = "", onSearchEmpty }) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("mais-buscadas");
  const navigate = useNavigate();

  const onBotoDvidasContainerClick = useCallback(() => {
    navigate("/#chat-demo");
  }, [navigate]);

  const termoBusca = (searchTerm || "").toLowerCase().trim();

  const perguntasFiltradas = useMemo(() => {
    if (!termoBusca) return null;
    return todasPerguntas.filter(
      (q) =>
        q.pergunta.toLowerCase().includes(termoBusca) ||
        q.resposta.toLowerCase().includes(termoBusca)
    );
  }, [termoBusca]);

  useEffect(() => {
    if (onSearchEmpty && termoBusca) {
      onSearchEmpty(perguntasFiltradas !== null && perguntasFiltradas.length === 0);
    }
    if (onSearchEmpty && !termoBusca) {
      onSearchEmpty(false);
    }
  }, [perguntasFiltradas, termoBusca, onSearchEmpty]);

  const renderPergunta = (q, idx) => {
    const IconeAberto = mapaIcone[q.iconeAmarelo];
    const IconeFechado = q.iconePergunta ? mapaIcone[q.iconePergunta] : null;
    const IconeFechado1 = q.iconePergunta1 ? mapaIcone[q.iconePergunta1] : null;
    return (
      <PerguntaFaq
        key={idx}
        property1={q.aberto ? "aberto" : "fechado"}
        aJurikiSubstituiUmAdvogado={q.pergunta}
        materialSymbolsplayArrowRounded={q.material || "/material-symbols-play-arrow-rounded1@2x.png"}
        noAJurikiTeAjudaAEntenderS={q.resposta}
        iconeAmarelo={<IconeAberto property1={q.aberto ? "aberto" : "fechado"} />}
        iconePergunta={IconeFechado ? <IconeFechado property1="fechado" /> : null}
        iconePergunta1={IconeFechado1 ? <IconeFechado1 property1="fechado" /> : null}
      />
    );
  };

  const renderCategoria = (catId) => {
    const perguntas = todasPerguntas.filter((q) => q.categoria === catId);
    const cat = categorias.find((c) => c.id === catId);
    if (!cat) return null;
    return (
      <div key={catId}>
        <div className={styles.ttuloSeo}>
          <div className={styles.iconeEPergunta}>
            <img className={styles.robIcon} loading="lazy" alt="" src={cat.icone} />
            <div className={styles.texto2}>
              <h2 className={styles.maisBuscadas3}>{cat.label}</h2>
              <h3 className={styles.asDvidasMais}>
                {catId === "mais-buscadas" ? "As dúvidas mais comuns de quem está começando." :
                 catId === "sobre-ia" ? "Tire dúvidas sobre o funcionamento da nossa inteligência artificial." :
                 catId === "sobre-uso" ? "Entenda como usar a Juriki no seu dia a dia." :
                 catId === "privacidade" ? "Saiba como protegemos seus dados." :
                 catId === "advogados" ? "Saiba como a Juriki pode ajudar na sua rotina." :
                 "Conheça mais sobre a Juriki."}
              </h3>
            </div>
          </div>
        </div>
        <section className={styles.peguntas}>
          {perguntas.map((q, idx) => renderPergunta(q, idx))}
        </section>
      </div>
    );
  };

  return (
    <section className={[styles.faqBody, className].join(" ")}>
      <section className={styles.categorias}>
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className={
              categoriaAtiva === cat.id
                ? styles.categoriaAtiva
                : styles.categoriaInativa
            }
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            <img
              className={styles.streamlinestar1SolidIcon}
              loading="lazy"
              alt=""
              src={categoriaAtiva === cat.id ? cat.icone.replace('.svg', '-amarelo.svg') : cat.icone}
            />
            <h3 className={styles.sobreAIa}>{cat.label}</h3>
          </div>
        ))}
        <div className={styles.mensagem}>
          <div className={styles.noAchouEBoto}>
            <div className={styles.iconeBaloETexto}>
              <img className={styles.groupIcon3} alt="" src="/Group6.svg" />
              <h3 className={styles.noAchouO}>
                Não achou o que procura? Pergunte direto pra nossa IA.
              </h3>
            </div>
            <div
              className={styles.botoDvidas}
              onClick={onBotoDvidasContainerClick}
            >
              <img
                className={styles.hugeiconschat01}
                alt=""
                src="/hugeicons-chat-01.svg"
              />
              <div className={styles.aquiAJustia}>Perguntar para a IA</div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.perguntasMaisBuscadas}>
        <div className={styles.perguntasMaisBuscadas2}>

          {perguntasFiltradas !== null ? (
            perguntasFiltradas.length > 0 ? (
              [...new Set(perguntasFiltradas.map((q) => q.categoria))].map(
                (catId) => renderCategoria(catId)
              )
            ) : null
          ) : (
            renderCategoria(categoriaAtiva)
          )}

        </div>
      </div>
    </section>
  );
};

FaqBody.propTypes = {
  className: PropTypes.string,
  searchTerm: PropTypes.string,
  onSearchEmpty: PropTypes.func,
};

export default FaqBody;
