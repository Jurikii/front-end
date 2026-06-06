import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../ui/FormField";
import PasswordInput from "../ui/PasswordInput";
import RememberMe from "../ui/RememberMe";
import emailIcon from "../../assets/icons/ic-outline-email.svg";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";

function LoginCard() {
  const navigate = useNavigate();

  const onEntrarClick = useCallback(() => {
    navigate("/inicio");
  }, [navigate]);

  const onCadastrarClick = useCallback(() => {
    navigate("/cadastro");
  }, [navigate]);

  return (
    <form
      className="d-flex flex-column align-items-center w-100 overflow-hidden flex-shrink-0"
      autoComplete="off"
      style={{
        maxWidth: "630px",
        borderRadius: "20px",
        background: "rgba(244,234,216,0.84)",
        border: "1px solid var(--azul-escuro)",
        padding: "clamp(24px, 4vw, 48px)",
        gap: "clamp(20px, 3vw, 32px)",
      }}
    >
      <h1
        className="align-self-stretch text-center fw-bold text-azul m-0"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(24px, 5vw, 40px)",
        }}
      >
        Bem-Vindo
      </h1>
      <h3
        className="align-self-stretch text-center fw-semibold m-0"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "#362323",
        }}
      >
        Faça login na sua conta para continuar.
      </h3>

      <FormField label="Email">
        <div
          className="d-flex align-items-center w-100"
          style={{
            height: "clamp(56px, 8vw, 70px)",
            borderRadius: "5px",
            background: "var(--branco-no-absoluto)",
            border: "1px solid var(--azul-escuro)",
            padding: "0 clamp(12px, 2.5vw, 20px)",
            gap: "clamp(6px, 1.5vw, 10px)",
          }}
        >
          <img
            style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)", flexShrink: 0 }}
            alt=""
            src={emailIcon}
          />
          <input
            className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
            style={{
              height: "clamp(28px, 3.5vw, 35px)",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              background: "transparent",
            }}
            placeholder="Digite seu email"
            type="email"
            name="email"
            autoComplete="off"
            value=""
            onChange={() => {}}
          />
        </div>
      </FormField>

      <FormField label="Senha" gap="gap-4">
        <PasswordInput />
      </FormField>

      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between w-100 gap-3 gap-sm-0">
        <RememberMe />
        <button
          className="border-0 p-0 bg-transparent text-azul-escuro fw-semibold text-center text-sm-start"
          type="submit"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#fab84c"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
        >
          Esqueceu a senha?
        </button>
      </div>

      <button
        className="border-0 w-100 bg-amarelo d-flex align-items-center justify-content-center group"
        type="submit"
        onClick={onEntrarClick}
        style={{
          padding: "clamp(8px, 1.5vw, 10px)",
          borderRadius: "5px",
          maxWidth: "550px",
          cursor: "pointer",
          minHeight: "clamp(50px, 7vw, 70px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#102e44";
          e.currentTarget.querySelector("b").style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fab84c";
          e.currentTarget.querySelector("b").style.color = "#0c1822";
        }}
      >
        <b
          className="fw-bold text-azul-escuro text-center"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(18px, 3vw, 24px)",
          }}
        >
          Entrar
        </b>
      </button>

      <div className="d-flex align-items-center w-100 gap-2">
        <div className="flex-grow-1" style={{ borderTop: "1px solid #000" }} />
        <span
          className="fw-semibold flex-shrink-0 text-nowrap"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(14px, 2.5vw, 20px)",
            color: "#000",
          }}
        >
          Ou continuar com
        </span>
        <div className="flex-grow-1" style={{ borderTop: "1px solid #000" }} />
      </div>

      <button
        className="bg-branco-no-absoluto w-100 d-flex align-items-center justify-content-center group"
        type="submit"
        onClick={onEntrarClick}
        style={{
          padding: "clamp(12px, 2vw, 16px)",
          borderRadius: "5px",
          border: "1px solid var(--azul-escuro)",
          maxWidth: "550px",
          minHeight: "clamp(50px, 7vw, 70px)",
          gap: "clamp(8px, 2vw, 15px)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#102e44";
          e.currentTarget.style.borderColor = "#102e44";
          e.currentTarget.querySelector("b").style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#f4ead8";
          e.currentTarget.style.borderColor = "#0c1822";
          e.currentTarget.querySelector("b").style.color = "#0c1822";
        }}
      >
        <img
          style={{
            height: "clamp(32px, 4vw, 40px)",
            width: "clamp(32px, 4vw, 40px)",
            flexShrink: 0,
          }}
          alt=""
          src={googleIcon}
        />
        <b
          className="fw-bold text-azul-escuro text-center"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(18px, 3vw, 24px)",
          }}
        >
          Continue com Google
        </b>
      </button>

      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-center w-100 gap-1 gap-sm-2"
        style={{ gap: "clamp(4px, 1vw, 6px)" }}
      >
        <span
          className="fw-semibold text-azul-escuro text-center text-sm-start"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          Não tem uma conta?
        </span>
        <span
          className="fw-semibold text-amarelo text-center text-sm-start"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            textShadow: "0.5px 0 0 #102e44, 0 0.5px 0 #102e44, -0.5px 0 0 #102e44, 0 -0.5px 0 #102e44",
            cursor: "pointer",
          }}
          onClick={onCadastrarClick}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#102e44"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#fab84c"; }}
        >
          Cadastre-se
        </span>
      </div>
    </form>
  );
}

export default LoginCard;
