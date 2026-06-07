import { useState, useCallback } from "react";
import NovoChat from "./NovoChat";
import Planos from "./Planos";
import ConversasRecentes from "./ConversasRecentes";
import PropTypes from "prop-types";
import styles from "./NavbarLateralChat.module.css";

const CONVERSAS = [
  {
    id: 1,
    titulo: "Prazo processual",
    mensagens: [
      { tipo: "usuario", conteudo: "Qual o prazo para contestação em ação trabalhista?", horario: "14:30" },
      { tipo: "ia", conteudo: "O prazo para contestação em ação trabalhista é de 5 dias úteis a partir da data da audiência ou da notificação inicial, conforme art. 841 da CLT. Em casos de justiça comum, o prazo é de 15 dias úteis (art. 335 do CPC).", horario: "14:31" },
    ],
  },
  {
    id: 2,
    titulo: "Petição inicial",
    mensagens: [
      { tipo: "usuario", conteudo: "Tem um modelo de petição inicial para divórcio consensual?", horario: "10:15" },
      { tipo: "ia", conteudo: "Sim! Uma petição inicial de divórcio consensual deve conter: qualificação das partes, data do casamento, regime de bens, partilha acordada, pensão alimentícia se houver, guarda dos filhos e visitação. Posso gerar uma minuta personalizada para você.", horario: "10:16" },
      { tipo: "usuario", conteudo: "Gere a minuta então", horario: "10:17" },
      { tipo: "ia", conteudo: "Claro! Preciso de algumas informações: nome completo das partes, data do casamento, regime de bens, se há filhos menores, e os termos da partilha. Pode me fornecer esses dados?", horario: "10:18" },
    ],
  },
  {
    id: 3,
    titulo: "Custas processuais",
    mensagens: [
      { tipo: "usuario", conteudo: "Como calcular as custas para apelação?", horario: "09:00" },
      { tipo: "ia", conteudo: "As custas para apelação variam por estado. Em São Paulo, por exemplo, a taxa de preparo é de aproximadamente 1% do valor da causa (mínimo de 5 UFESP). Para apelação, adicionalmente há o porte de remessa e retorno. Recomendo verificar o site do TJ respectivo para valores atualizados.", horario: "09:02" },
    ],
  },
  {
    id: 4,
    titulo: "Jurisprudência",
    mensagens: [
      { tipo: "usuario", conteudo: "Tem jurisprudência recente sobre dano moral por negativação indevida?", horario: "16:45" },
      { tipo: "ia", conteudo: "Sim! O STJ tem entendimento consolidado (Súmula 385) de que a negativação indevida gera dano moral in re ipsa, ou seja, independe de comprovação. Os valores atuais giram entre R$ 5.000 e R$ 15.000. Posso pesquisar julgados recentes do seu estado.", horario: "16:46" },
      { tipo: "usuario", conteudo: "Pesquise para o TJSP", horario: "16:47" },
      { tipo: "ia", conteudo: "No TJSP, os valores para negativação indevida variam entre R$ 8.000 e R$ 12.000 em média, podendo chegar a R$ 20.000 em casos de reincidência ou quando a dívida já estava prescrita. Em 2024, houve um aumento nos valores arbitrados.", horario: "16:48" },
    ],
  },
  {
    id: 5,
    titulo: "Recurso especial",
    mensagens: [
      { tipo: "usuario", conteudo: "Quero fazer um parecer sobre recurso especial", horario: "20:10" },
      { tipo: "ia", conteudo: "Para elaborar um parecer sobre recurso especial, preciso analisar: a questão federal controvertida, se houve prequestionamento, a existência de divergência jurisprudencial e a demonstração do cabimento pelas alíneas do art. 105, III, da CF. Pode me enviar o acórdão recorrido?", horario: "20:11" },
    ],
  },
  {
    id: 6,
    titulo: "Acordo extrajudicial",
    mensagens: [
      { tipo: "usuario", conteudo: "Preciso de uma minuta de acordo extrajudicial trabalhista", horario: "11:30" },
      { tipo: "ia", conteudo: "Uma minuta de acordo extrajudicial trabalhista deve conter: qualificação das partes, verbas rescisórias sendo pagas, parcela de multa do 477 se for o caso, e a quitação ampla e geral. Importante lembrar que a homologação pode ser feita no sindicato ou na Justiça do Trabalho.", horario: "11:31" },
      { tipo: "usuario", conteudo: "Qual a vantagem de homologar no sindicato vs. Justiça?", horario: "11:32" },
      { tipo: "ia", conteudo: "No sindicato o processo é mais rápido, mas a quitação é apenas das verbas discriminadas. Na Justiça do Trabalho, a homologação judicial dá maior segurança jurídica e a quitação abrange todo o contrato de trabalho, desde que o empregado esteja assistido por advogado.", horario: "11:33" },
    ],
  },
];

const NavbarLateralChat = ({ className = "", onSelectConversa }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleNovoChat = useCallback(() => {
    setSelectedId(null);
    if (onSelectConversa) onSelectConversa(null);
  }, [onSelectConversa]);

  const handleSelect = useCallback((chat) => {
    setSelectedId(chat.id);
    if (onSelectConversa) onSelectConversa(chat);
  }, [onSelectConversa]);

  return (
    <aside className={`${styles.navbarLateral} ${className}`}>
      <div className={styles.containerLargura}>
        <NovoChat onClick={handleNovoChat} />
      </div>

      <div className={styles.abasIa}>
        <Planos />
      </div>

      <div className={styles.histricoDeChat}>
        <div className={styles.textoConversasRecentes}>
          <span className={styles.conversasRecentesTitulo}>CONVERSAS RECENTES</span>
        </div>

        <div className={styles.listaConversas}>
          {CONVERSAS.map((chat) => (
            <ConversasRecentes
              key={chat.id}
              titulo={chat.titulo}
              selecionado={chat.id === selectedId}
              onClick={() => handleSelect(chat)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

NavbarLateralChat.propTypes = {
  className: PropTypes.string,
  onSelectConversa: PropTypes.func,
};

export default NavbarLateralChat;
