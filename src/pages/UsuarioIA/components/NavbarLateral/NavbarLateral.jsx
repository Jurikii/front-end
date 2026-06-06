import { useState, useCallback } from "react";
import NovoChat from "./NovoChat";
import Documentos from "./Documentos";
import Planos from "./Planos";
import ConversasRecentes from "./ConversasRecentes";
import PropTypes from "prop-types";
import styles from "./NavbarLateral.module.css";

const CONVERSAS = [
  {
    id: 1,
    titulo: "Direitos trabalhistas",
    mensagens: [
      { tipo: "usuario", conteudo: "Quais são meus direitos se eu for demitido sem justa causa?", horario: "14:30" },
      { tipo: "ia", conteudo: "Você tem direito a: aviso prévio (30 a 90 dias), multa de 40% sobre o FGTS, saque do FGTS, seguro-desemprego (3 a 5 parcelas) e férias proporcionais + 1/3. Recomendo não assinar nada sem antes consultar um advogado trabalhista.", horario: "14:31" },
    ],
  },
  {
    id: 2,
    titulo: "Contrato de aluguel",
    mensagens: [
      { tipo: "usuario", conteudo: "O proprietário pode pedir o imóvel antes do fim do contrato de aluguel?", horario: "10:15" },
      { tipo: "ia", conteudo: "Sim, mas com algumas condições. Se for contrato por prazo determinado, o locador pode retomar o imóvel após o término do prazo. Em caso de necessidade antes do prazo, deve pagar multa proporcional ao tempo que falta. Já o inquilino pode devolver o imóvel a qualquer momento, pagando multa proporcional se prevista em contrato.", horario: "10:16" },
      { tipo: "usuario", conteudo: "E a multa é de quanto geralmente?", horario: "10:17" },
      { tipo: "ia", conteudo: "Geralmente a multa é de 3 aluguéis para contratos de 30 meses, mas proporcional ao tempo que falta. Exemplo: se faltam 10 meses para acabar, a multa seria (10/30) × 3 = 1 aluguel. Sempre vale conferir a cláusula específica do seu contrato.", horario: "10:18" },
    ],
  },
  {
    id: 3,
    titulo: "Dúvida societária",
    mensagens: [
      { tipo: "usuario", conteudo: "Qual a diferença entre LTDA e S.A. para abrir uma empresa?", horario: "09:00" },
      { tipo: "ia", conteudo: "A LTDA (Sociedade Limitada) é mais simples e indicada para pequenos e médios negócios. A responsabilidade é limitada ao capital social. Já a S.A. (Sociedade Anônima) é mais complexa, exige maior capital mínimo e é geralmente usada por grandes empresas que pretendem abrir capital na bolsa. Para a maioria dos casos, a LTDA é a escolha mais prática.", horario: "09:02" },
    ],
  },
  {
    id: 4,
    titulo: "Aposentadoria INSS",
    mensagens: [
      { tipo: "usuario", conteudo: "Quantos anos de contribuição preciso para me aposentar?", horario: "16:45" },
      { tipo: "ia", conteudo: "Depende da regra aplicável. Pela regra geral pós-Reforma (2019): homem precisa de 65 anos e 20 de contribuição; mulher 62 anos e 15 de contribuição. Existem regras de transição que podem ser mais vantajosas, como a regra dos pontos (soma idade + tempo). Recomendo fazer um planejamento previdenciário personalizado.", horario: "16:46" },
      { tipo: "usuario", conteudo: "E o pedágio de 50% como funciona?", horario: "16:47" },
      { tipo: "ia", conteudo: "O pedágio de 50% se aplica a quem estava a menos de 2 anos de se aposentar quando a Reforma entrou em vigor (13/11/2019). Nessa regra, você precisa cumprir o tempo que faltava + 50% desse tempo como pedágio. É uma das regras mais benéficas de transição.", horario: "16:48" },
    ],
  },
  {
    id: 5,
    titulo: "Consumidor e aviação",
    mensagens: [
      { tipo: "usuario", conteudo: "Meu voo atrasou 6 horas, tenho direito a compensação?", horario: "20:10" },
      { tipo: "ia", conteudo: "Sim! Para atrasos superiores a 4 horas, a companhia aérea deve fornecer assistência material (alimentação, hospedagem se necessário) e indenização por danos morais. O valor varia de R$ 5.000 a R$ 10.000 em média, dependendo do caso. Guarde todos os comprovantes do atraso.", horario: "20:11" },
    ],
  },
  {
    id: 6,
    titulo: "Revisão de contrato",
    mensagens: [
      { tipo: "usuario", conteudo: "Assinei um contrato de prestação de serviços mas não estou satisfeito. Posso cancelar?", horario: "11:30" },
      { tipo: "ia", conteudo: "Sim, você pode rescindir o contrato. Pelo CDC, o consumidor tem direito de arrependimento em 7 dias para contratos feitos fora do estabelecimento comercial. Para contratos com prazo determinado, pode haver multa por rescisão antecipada, mas ela não pode ser abusiva. Analise as cláusulas de rescisão do seu contrato.", horario: "11:31" },
      { tipo: "usuario", conteudo: "E se a multa for muito alta, o que fazer?", horario: "11:32" },
      { tipo: "ia", conteudo: "Multas consideradas abusivas podem ser questionadas judicialmente. O entendimento do STJ é que a multa rescisória não pode ultrapassar 10% do valor total do contrato. Se for superior, um advogado pode ingressar com ação revisionista para reduzir o valor.", horario: "11:33" },
    ],
  },
];

const NavbarLateral = ({ className = "", onSelectConversa }) => {
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
        <Documentos onClick={() => console.log("Acessou Documentos")} />
        <Planos onClick={() => console.log("Acessou Planos")} />
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

NavbarLateral.propTypes = {
  className: PropTypes.string,
  onSelectConversa: PropTypes.func,
};

export default NavbarLateral;