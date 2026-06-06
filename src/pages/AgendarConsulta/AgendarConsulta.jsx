import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Menu1 from "../../components/Menu1";
import styles from "./AgendarConsulta.module.css";

const AgendarConsulta = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const advogado = state?.advogado;

  const nome = advogado?.nome ?? "Dra. Beatriz Oliveira";
  const areas = advogado?.areas ?? ["Consumidor", "Cível", "Trabalhista"];
  const oab = advogado?.oab ?? "OAB/SP 123.456";
  const foto = advogado?.foto ?? "/Foto-Adv@2x.png";
  const tratamento = nome.startsWith("Dr.") ? "do Dr." : "da Dra.";

  const onVoltar = useCallback(() => {
    navigate("/advogados");
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Menu1 />
      <main className={styles.content}>
        <div className={styles.topSection}>
          <button className={styles.backBtn} onClick={onVoltar}>
            <img className={styles.backIcon} alt="" src="/arrow-back.svg" />
            <span>Voltar para o perfil</span>
          </button>
          <h1 className={styles.title}>Agendar consulta</h1>
        </div>

        <section className={styles.lawyerCard}>
          <img className={styles.lawyerPhoto} alt="" src={foto} />
          <div className={styles.lawyerInfo}>
            <p className={styles.label}>Você está agendando com</p>
            <h2 className={styles.lawyerName}>{nome}</h2>
            <div className={styles.lawyerDetails}>
              <div className={styles.areasRow}>
                <img className={styles.scaleIcon} alt="" src="/cone-balan-a.svg" />
                <div className={styles.areasList}>
                  {areas.map((area, i) => (
                    <span key={area} className={styles.areaTag}>
                      {area}
                      {i < areas.length - 1 && <span className={styles.areaDot} />}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.oabRow}>
                <img className={styles.oabIcon} alt="" src="/oab-icon.svg" />
                <span>{oab}</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.howItWorks}>
          <h2 className={styles.howTitle}>Como funciona?</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <img className={styles.stepIcon} alt="" src="/cone1@2x.png" />
              <p className={styles.stepText}>
                Ao confirmar, você será direcionado para o WhatsApp {tratamento} {nome.replace(/^(Dra?\.\s*)/, "")}
              </p>
            </div>
            <img className={styles.stepDivider} alt="" src="/Div@2x.png" />
            <div className={styles.step}>
              <img className={styles.stepIcon} alt="" src="/cone2@2x.png" />
              <p className={styles.stepText}>
                Explique sua situação e escolha o melhor horário.
              </p>
            </div>
            <img className={styles.stepDivider} alt="" src="/Div@2x.png" />
            <div className={styles.step}>
              <img className={styles.stepIcon} alt="" src="/cone@2x.png" />
              <p className={styles.stepText}>
                A consulta será combinada diretamente com {tratamento} {nome.replace(/^(Dra?\.\s*)/, "")}.
              </p>
            </div>
          </div>
        </section>

        <a
          className={styles.whatsappBtn}
          href={`https://wa.me/5511999999999?text=Olá ${encodeURIComponent(nome)}, gostaria de agendar uma consulta.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.whatsappIcon} alt="" src="/whatsapp.svg" />
          <strong>Agendar via WhatsApp</strong>
        </a>

        <footer className={styles.footer}>
          <img className={styles.footerIcon} alt="" src="/shield.svg" />
          <span>Você será redirecionado para o WhatsApp</span>
        </footer>
      </main>
    </div>
  );
};

export default AgendarConsulta;
