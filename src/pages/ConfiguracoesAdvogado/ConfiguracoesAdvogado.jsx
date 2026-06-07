import { useState, useCallback } from "react";
import Navbar from "../../components/NavbarAdvogado";
import Opcoes from "../../components/Configuracoes/Opcoes";
import Aparencia from "../../components/Configuracoes/Aparencia";
import Notificacoes from "../../components/Configuracoes/Notificacoes";
import Privacidade from "../../components/Configuracoes/Privacidade";
import Acessibilidade from "../../components/Configuracoes/Acessibilidade";
import styles from "./ConfiguracoesAdvogado.module.css";

const SIDEBAR_ITEMS = [
  { id: "fonte", label: "Fonte", icon: "/glyphs-font-bold.svg" },
  { id: "aparencia", label: "Aparência", icon: "/mdi-palette-outline.svg" },
  { id: "notificacoes", label: "Notificações", icon: "/sininho.svg" },
  { id: "privacidade", label: "Privacidade e Segurança", icon: "/icon-park-protect.svg" },
  { id: "acessibilidade", label: "Acessibilidade", icon: "/cuida-search-outline.svg" },
];

const ConfiguracoesAdvogado = () => {
  const [abaAtiva, setAbaAtiva] = useState("fonte");

  const renderAba = useCallback(() => {
    switch (abaAtiva) {
      case "fonte": return <Opcoes />;
      case "aparencia": return <Aparencia />;
      case "notificacoes": return <Notificacoes />;
      case "privacidade": return <Privacidade />;
      case "acessibilidade": return <Acessibilidade />;
      default: return <Opcoes />;
    }
  }, [abaAtiva]);

  return (
    <div className={styles.configuracoesAdvogado}>
      <Navbar />
      <main className={styles.conteudo}>
        <section className={styles.navbarLateral}>
          <div className={styles.navBarLateral}>
            <div className={styles.configuracoesOpes}>
              <div className={styles.configuracoes2}>
                <h2 className={styles.configuracoes3}>Configurações</h2>
                <div className={styles.personalizeSuaExperincia}>
                  Personalize sua experiência na Juriki
                </div>
              </div>
              <div className={styles.opes}>
                {SIDEBAR_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.sidebarItem} ${abaAtiva === item.id ? styles.sidebarItemAtivo : ""}`}
                    onClick={() => setAbaAtiva(item.id)}
                    role="tab"
                    aria-selected={abaAtiva === item.id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setAbaAtiva(item.id);
                      }
                    }}
                  >
                    <img className={styles.glyphsfontBoldIcon} alt="" src={item.icon} />
                    <h3 className={styles.temas}>{item.label}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.helpdesk}>
              <div className={styles.precisaDeAjuda}>
                <h3 className={styles.precisaDeAjuda2}>Precisa de ajuda?</h3>
                <div className={styles.faleComNosso}>
                  Fale com nosso suporte ou acesse o FAQ
                </div>
              </div>
              <div className={styles.btnhelp}>
                <div className={styles.acessarAjuda}>Acessar ajuda</div>
              </div>
            </div>
          </div>
          <img
            className={styles.image148Icon}
            loading="lazy"
            alt=""
            src="/image-148@2x.png"
          />
        </section>
        <section className={styles.opcoesSection}>
          {renderAba()}
        </section>
      </main>
    </div>
  );
};

export default ConfiguracoesAdvogado;
