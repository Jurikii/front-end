import { useCallback, useState } from "react";
import InputField from "../ui/InputField";
import PasswordInput from "../ui/PasswordInput";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";
import { useAuthModal } from "../../context/AuthModalContext";

const SignUpCard = ({ className = "" }) => {
  const { openTipoModal } = useAuthModal();
  const [termosChecked, setTermosChecked] = useState(false);

  const onRegisterClick = useCallback(() => {
    navigate("/inicio");
  }, [navigate]);

  const onGoogleClick = useCallback(() => {}, []);

  const onLoginClick = useCallback(() => {
    openTipoModal("login");
  }, [openTipoModal]);

  return (
    <div
      className={`w-100 d-flex flex-column align-items-center overflow-hidden font-montserrat text-preto ${className}`}
      style={{
        maxWidth: "560px",
        borderRadius: "20px",
        background: "rgba(244,234,216,0.84)",
        border: "1px solid #0c1822",
        padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 30px)",
        gap: "clamp(24px, 3vw, 35px)",
      }}
    >
      <h1 className="align-self-stretch position-relative fw-bold text-azul text-center mb-0 fs-40">
        Criar
      </h1>
      <h3 className="align-self-stretch position-relative fw-semibold text-center d-flex align-items-center justify-content-center mb-0"
        style={{ color: "#362323", fontSize: "clamp(14px, 2vw, 16px)" }}
      >
        Preencha os dados abaixo para criar sua conta.
      </h3>

      <InputField label="Nome completo" placeholder="Digite seu nome completo" />

      <InputField
        label="Email"
        placeholder="name@example.com"
        minWidth="129px"
      />

      <PasswordInput label="Senha" />

      <PasswordInput label="Confirmar senha" />

      <div className="align-self-stretch d-flex align-items-center text-amarelo"
        style={{ gap: "10px", fontSize: "17px" }}
      >
        <label className="d-flex align-items-center justify-content-center cursor-pointer flex-shrink-0"
          style={{ height: "40px", width: "40px" }}
        >
          <input
            className="visually-hidden"
            type="checkbox"
            checked={termosChecked}
            onChange={(e) => setTermosChecked(e.target.checked)}
          />
          <span
            className={`d-flex align-items-center justify-content-center`}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "4px",
              backgroundColor: termosChecked ? "#fab84c" : "#f4ead8",
              transition: "colors 0.15s",
            }}
          >
            {termosChecked && (
              <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24" fill="none" stroke="#0c1822" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </span>
        </label>
        <div className="fw-semibold text-shadow-1px text-preto">
          <span className="text-azul-escuro">{`Eu aceito os `}</span>
          <span className="text-amarelo cursor-pointer hover-text-azul">{`Termos de Uso `}</span>
          <span style={{ color: "#020202" }}>{`e a `}</span>
          <span className="text-amarelo cursor-pointer hover-text-azul">Politicas de Privacidade</span>
        </div>
      </div>

      <button
        className="btn border-0 w-100 bg-amarelo d-flex align-items-center justify-content-center fw-bold font-montserrat text-azul-escuro cursor-pointer hover-bg-azul group"
        onClick={onRegisterClick}
        style={{
          height: "clamp(56px, 7vw, 70px)",
          borderRadius: "5px",
          padding: "clamp(8px, 1.5vw, 10px)",
          maxWidth: "550px",
          fontSize: "clamp(18px, 3vw, 24px)",
        }}
      >
        <b className="group-hover:text-white">Cadastrar</b>
      </button>

      <div className="align-self-stretch d-flex align-items-center justify-content-center text-center"
        style={{ gap: "clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ width: "101px", borderTop: "1px solid #000", height: "0" }} />
        <h3 className="mb-0 fw-semibold flex-shrink-0" style={{ width: "189px", fontSize: "inherit" }}>
          Ou cadastrar com
        </h3>
        <div style={{ width: "101px", borderTop: "1px solid #000", height: "0" }} />
      </div>

      <button
        className="btn border-0 w-100 bg-branco-no-absoluto d-flex align-items-center justify-content-center font-montserrat cursor-pointer group hover-bg-azul hover-border-azul"
        onClick={onGoogleClick}
        style={{
          height: "clamp(56px, 7vw, 70px)",
          borderRadius: "5px",
          border: "1px solid #0c1822",
          maxWidth: "550px",
          gap: "clamp(8px, 2vw, 15px)",
        }}
      >
        <img style={{ height: "40px", width: "40px" }} alt="" src={googleIcon} />
        <b className="fw-bold text-azul-escuro text-center group-hover:text-white"
          style={{ fontSize: "24px" }}
        >
          Continue com Google
        </b>
      </button>

      <div className="align-self-stretch d-flex align-items-start justify-content-center text-azul-escuro"
        style={{ gap: "6px" }}
      >
        <h3 className="mb-0 fw-semibold" style={{ fontSize: "inherit" }}>
          Já tem uma conta?
        </h3>
        <h3 className="mb-0 fw-semibold text-amarelo text-shadow-azul cursor-pointer hover-text-azul"
          style={{ fontSize: "inherit" }}
          onClick={onLoginClick}
        >
          Faça Login
        </h3>
      </div>
    </div>
  );
};

export default SignUpCard;
