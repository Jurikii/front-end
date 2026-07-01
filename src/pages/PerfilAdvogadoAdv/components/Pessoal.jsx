import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Pessoal.module.css";

const Pessoal = ({ className = "", editando = false, email, onEmailChange, onSalvar }) => {
  const [nome, setNome] = useState("Rosana Silva");
  const [oab, setOab] = useState("OAB/SP 123.456");
  const [telefone, setTelefone] = useState("(11) 91234-5678");

  const handleSalvar = () => {
    if (onSalvar) onSalvar();
  };

  return (
    <section className={[styles.pessoal, className].join(" ")}>
      <img
        className={styles.fotoIcon}
        loading="lazy"
        alt=""
        src="/Foto@2x.png"
      />
      <div className={styles.informacoesGerais}>
        {editando ? (
          <div className={styles.informaes}>
            <input
              type="text"
              className={styles.inputCampo}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
            />
            <input
              type="text"
              className={styles.inputCampo}
              value={oab}
              onChange={(e) => setOab(e.target.value)}
              placeholder="OAB"
            />
            <input
              type="email"
              className={styles.inputCampo}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Email"
            />
            <div className={styles.linhaTelefone}>
              <img
                className={styles.solarphoneOutlineIcon}
                alt=""
                src="/solar-phone-outline.svg"
              />
              <input
                type="text"
                className={styles.inputCampo}
                style={{ flex: 1 }}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Telefone"
              />
            </div>
            <div className={styles.calendarioMembro}>
              <img
                className={styles.solarphoneOutlineIcon}
                alt=""
                src="/mdi-light-calendar.svg"
              />
              <div className={styles.memberInfo}>Membro desde de julho de 2026</div>
            </div>
            <button className={styles.botaoSalvar} onClick={handleSalvar}>Salvar</button>
          </div>
        ) : (
          <>
            <h2 className={styles.aliceSilva}>{nome}</h2>
            <div className={styles.oab}>{oab}</div>
            <div className={styles.informaes}>
              <div className={styles.alicesilvagmailcom}>{email}</div>
              <div className={styles.telefoneUsuario}>
                <img
                  className={styles.solarphoneOutlineIcon}
                  alt=""
                  src="/solar-phone-outline.svg"
                />
                <div className={styles.memberInfo}>{telefone}</div>
              </div>
              <div className={styles.calendarioMembro}>
                <img
                  className={styles.solarphoneOutlineIcon}
                  alt=""
                  src="/mdi-light-calendar.svg"
                />
                <div className={styles.memberInfo}>
                  Membro desde de julho de 2026
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

Pessoal.propTypes = {
  className: PropTypes.string,
  editando: PropTypes.bool,
  email: PropTypes.string,
  onEmailChange: PropTypes.func,
  onSalvar: PropTypes.func,
};

export default Pessoal;
