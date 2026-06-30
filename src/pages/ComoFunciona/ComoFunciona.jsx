import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TtuloESubttulo from "./components/TtuloESubttulo";
import P1ELinha from "./components/P1ELinha";
import Rodap from "./components/Rodap";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./ComoFunciona.module.css";

const items = [
  {
    passo1FlexWrap: "wrap",
    passo1AlignContent: "center",
    iconeBaloFala: "/icone-bal-o-fala2@2x.png",
    conteASuaDvida: "Conte a sua dúvida",
    descrevaSuaSituaoOuEnvieSua:
      "Descreva sua situação ou envie sua pergunta em linguagem simples, como se estivesse conversando com alguém.",
  },
  {
    passo1FlexWrap: "wrap",
    passo1AlignContent: "center",
    iconeBaloFala: "/icone-bal-o-fala@2x.png",
    conteASuaDvida: "IA traduz ao seu estilo",
    descrevaSuaSituaoOuEnvieSua:
      "Nossa inteligência artificial analisa sua dúvida e transforma o juridiquês em explicações claras e acessíveis.",
  },
  {
    passo1FlexWrap: "unset",
    passo1AlignContent: "unset",
    iconeBaloFala: "/icone-bal-o-fala1@2x.png",
    conteASuaDvida: "Envie documentos",
    descrevaSuaSituaoOuEnvieSua:
      "Se precisar, você pode anexar contratos, notificações ou arquivos jurídicos para análise.",
  },
  {
    passo1FlexWrap: "wrap",
    passo1AlignContent: "center",
    iconeBaloFala: "/icone-bal-o-fala3@2x.png",
    conteASuaDvida: "Apoio profissional",
    descrevaSuaSituaoOuEnvieSua:
      "Quando necessário, conectamos você a profissionais parceiros para orientação especializada.",
  },
];

const ComoFunciona = () => {
  const { containerRef, visible } = useScrollReveal(items.length, {
    staggerDelay: 80,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1,
  });

  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <div className={styles.comoFuncionaTeste}>
      <div style={{ position: "relative", zIndex: 5, width: "100%" }}>
        <Navbar activeItem="Como funciona" />
      </div>
      <TtuloESubttulo />
      <main className={styles.passoAPasso} ref={containerRef}>
        <div className={`${styles.dashedLine} ${visible.some(Boolean) ? styles.dashedRevealed : ""}`} />
        {items.map((item, index) => {
          const isHidden = ready && !visible[index];
          return (
            <div
              className={`${styles.stepRow} ${isHidden ? styles.stepRowHidden : ""} ${visible[index] ? styles.stepRowVisible : ""}`}
              key={index}
              data-reveal={index}
            >
              <div className={styles.numeroBox}>
                <div className={styles.circle}>
                  <h2 className={styles.numero}>{index + 1}</h2>
                </div>
              </div>
              <P1ELinha
                passo1FlexWrap={item.passo1FlexWrap}
                passo1AlignContent={item.passo1AlignContent}
                iconeBaloFala={item.iconeBaloFala}
                conteASuaDvida={item.conteASuaDvida}
                descrevaSuaSituaoOuEnvieSua={item.descrevaSuaSituaoOuEnvieSua}
              />
            </div>
          );
        })}
      </main>
      <Rodap />
    </div>
  );
};

export default ComoFunciona;
