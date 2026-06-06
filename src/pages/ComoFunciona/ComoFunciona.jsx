import { useState } from "react";
import Navbar from "../../components/Rodape e navbar/Navbar";
import TtuloESubttulo from "./components/TtuloESubttulo";
import P1ELinha from "./components/P1ELinha";
import Rodap from "./components/Rodap";
import styles from "./ComoFunciona.module.css";

const ComoFunciona = () => {
  const [p1ELinhaItems] = useState([
    {
      line61: "/Line-611@2x.png",
      passo1FlexWrap: "wrap",
      passo1AlignContent: "center",
      iconeBaloFala: "/icone-bal-o-fala2@2x.png",
      conteASuaDvida: "Conte a sua dúvida",
      descrevaSuaSituaoOuEnvieSua:
        "Descreva sua situação ou envie sua pergunta em linguagem simples, como se estivesse conversando com alguém.",
    },
    {
      line61: "/Line-611@2x.png",
      passo1FlexWrap: "wrap",
      passo1AlignContent: "center",
      iconeBaloFala: "/icone-bal-o-fala@2x.png",
      conteASuaDvida: "IA traduz ao seu estilo",
      descrevaSuaSituaoOuEnvieSua:
        "Nossa inteligência artificial analisa sua dúvida e transforma o juridiquês em explicações claras e acessíveis.",
    },
    {
      line61: "/Line-611@2x.png",
      passo1FlexWrap: "unset",
      passo1AlignContent: "unset",
      iconeBaloFala: "/icone-bal-o-fala1@2x.png",
      conteASuaDvida: "Envie documentos",
      descrevaSuaSituaoOuEnvieSua:
        "Se precisar, você pode anexar contratos, notificações ou arquivos jurídicos para análise.",
    },
    {
      line61: "/Line-611@2x.png",
      passo1FlexWrap: "wrap",
      passo1AlignContent: "center",
      iconeBaloFala: "/icone-bal-o-fala3@2x.png",
      conteASuaDvida: "Apoio profissional",
      descrevaSuaSituaoOuEnvieSua:
        "Quando necessário, conectamos você a profissionais parceiros para orientação especializada.",
    },
  ]);
  return (
    <div className={styles.comoFuncionaTeste}>
      <div style={{ position: "relative", zIndex: 5, width: "100%" }}>
        <Navbar activeItem="Como funciona" />
      </div>
      <TtuloESubttulo />
      <main className={styles.passoAPasso}>
        <div className={styles.dashedLine} />
        {p1ELinhaItems.map((item, index) => (
          <div className={styles.stepRow} key={index}>
            <div className={styles.numeroBox}>
              <div className={styles.circle}>
                <h2 className={styles.numero}>{index + 1}</h2>
              </div>
            </div>
            <P1ELinha
              line61={item.line61}
              passo1FlexWrap={item.passo1FlexWrap}
              passo1AlignContent={item.passo1AlignContent}
              iconeBaloFala={item.iconeBaloFala}
              conteASuaDvida={item.conteASuaDvida}
              descrevaSuaSituaoOuEnvieSua={item.descrevaSuaSituaoOuEnvieSua}
            />
          </div>
        ))}
      </main>
      <img
        className={styles.jurikii21}
        loading="lazy"
        alt=""
        src="/jurikii-2-1.svg"
      />
      <Rodap />
    </div>
  );
};

export default ComoFunciona;
