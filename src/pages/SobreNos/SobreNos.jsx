import { motion } from "framer-motion";
import ComoFunciona from "../../components/SobreNos/ComoFunciona";
import Misso from "../../components/SobreNos/Misso";
import Milhes from "../../components/SobreNos/Milhes";
import Navbar from "../../components/Navbar";
import Rodap from "../../components/SobreNos/Rodap";
import Reveal from "../../components/Reveal";
import styles from "./SobreNos.module.css";

const SobreNos = () => {
  return (
    <div className={styles.sobreNsTeste}>
      <Navbar activeItem="Sobre nós" />

      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <img className={styles.heroBg} alt="" src="/merged-asset-2@2x.png" />
        <div className={styles.chatFrame}>
          <div className={styles.chatText}>
            Oi! Sou a Sofia, assistente da Juriki. 😃
          </div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Sobre nós</div>
          <h1 className={styles.heroTitle}>
            <span>Existimos para </span>
            <span className={styles.heroTitleHighlight}>traduzir</span>
            <span> a justiça.</span>
          </h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroDescription}>
            Acreditamos que entender seus direitos não deveria ser um privilégio.
            <br /><br />
            Por isso, usamos tecnologia e empatia para tornar o universo jurídico
            simples, acessível e humano para todos.
          </p>
        </div>
      </section>

      {/* ============ MILHÕES ============ */}
      <Reveal threshold={0.2}>
        <Milhes />
      </Reveal>

      {/* ============ CONTEÚDO (com fundo decorativo) ============ */}
      <div className={styles.contentBg}>
        <img className={styles.contentBgImg} alt="" src="/merged-asset-11@2x.png" />

        {/* ===== ESSÊNCIA ===== */}
        <Reveal as="section" className={styles.essencia} threshold={0.2}>
          <div className={styles.essenciaTitle}>
            <img className={styles.decorIcon} alt="" src="/Group2.svg" />
            <h1>
              <span>Nossa </span>
              <span className={styles.essenciaHighlight}>essência</span>
            </h1>
            <img className={styles.decorIcon} alt="" src="/Group2.svg" />
          </div>
          <p className={styles.essenciaDescription}>
            A Juriki nasceu para simplificar o universo jurídico, tornando-o mais
            acessível e humano. <br />
            Unimos tecnologia, inteligência artificial e apoio profissional para
            aproximar as pessoas da justiça.
          </p>
        </Reveal>

        {/* ===== MISSÃO & VISÃO ===== */}
        <Reveal as="section" className={styles.missoes} threshold={0.2}>
          <Misso
            mditargetArrow="/mdi-target-arrow@2x.png"
            nossaMisso="Nossa missão"
            contribuirComTecnologiasQue="Contribuir com tecnologias que ampliem o alcance das informações jurídicas, facilitando sua compreensão a todos."
          />
          <Misso
            missoPadding="27px 30px"
            mditargetArrow="/boxicons-eye-filled@2x.png"
            mditargetArrowIconWidth="126px"
            nossaMisso="Nossa visão"
            contribuirComTecnologiasQue="Associar-se aos veículos jurídicos já existentes, ampliando o público alvo."
          />
        </Reveal>

        {/* ===== VALORES ===== */}
        <section className={styles.valoresSection}>
          <Reveal threshold={0.2}>
            <div className={styles.valoresTitle}>
              <img className={styles.decorSmall} alt="" src="/Group.svg" />
              <h2>Nossos valores</h2>
              <img className={styles.decorSmall} alt="" src="/Group.svg" />
            </div>
          </Reveal>

          <motion.div
            className={styles.valorGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.div
              className={styles.valorCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIcon} loading="lazy" alt="" src="/Idea5@2x.png" />
              <h3>Transparência</h3>
              <p>Comunicação clara e honesta em tudo o que fazemos.</p>
            </motion.div>
            <motion.div
              className={styles.valorCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIcon} alt="" src="/Idea3@2x.png" />
              <h3>Diversidade</h3>
              <p>Valorizamos todas as vozes e perspectivas.</p>
            </motion.div>
            <motion.div
              className={`${styles.valorCard} ${styles.valorCardTall}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIconLarge} alt="" src="/Idea@2x.png" />
              <h3>Inclusão social</h3>
              <p>Justiça é um direito de todos, sem exceção.</p>
            </motion.div>
            <motion.div
              className={styles.valorCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIcon} alt="" src="/Idea6@2x.png" />
              <h3>Inovação</h3>
              <p>Tecnologia e criatividade para transformar.</p>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.valorGrid2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.div
              className={styles.valorCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIcon} alt="" src="/Idea4@2x.png" />
              <h3>Acessibilidade</h3>
              <p>Informação jurídica simples, acessível e compreensível.</p>
            </motion.div>
            <motion.div
              className={styles.valorCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIcon} alt="" src="/Idea1@2x.png" />
              <h3>Confiança</h3>
              <p>Segurança e responsabilidade em cada resposta.</p>
            </motion.div>
            <motion.div
              className={`${styles.valorCard} ${styles.valorCardTall}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <img className={styles.valorIconWide} alt="" src="/Idea2@2x.png" />
              <h3>Integração</h3>
              <p>Conectamos pessoas, conhecimento e soluções.</p>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* ============ COMO FUNCIONA ============ */}
      <Reveal threshold={0.2}>
        <ComoFunciona />
      </Reveal>

      {/* ============ FOOTER ============ */}
      <Reveal threshold={0.1}>
        <Rodap />
      </Reveal>
    </div>
  );
};

export default SobreNos;
