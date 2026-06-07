import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/ui/FormField";
import emailIcon from "../../assets/icons/ic-outline-email.svg";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";
import bgImage from "../../assets/images/Pag-Login@3x.png";

const LoginAdvogado = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const saved = localStorage.getItem("juriki_usuarios");
    const usuarios = saved ? JSON.parse(saved) : [];
    const user = usuarios.find((u) => u.email === email && u.tipoUsuario === "ADVOGADO");

    if (user) {
      login({ nome: user.nome, email: user.email, tipoUsuario: "ADVOGADO" });
    } else {
      login({ nome: email.split("@")[0] || "Advogado", email, tipoUsuario: "ADVOGADO" });
    }
    navigate("/homeadvogado");
  }, [email, senha, login, navigate]);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        padding: "clamp(16px, 5vw, 84px)",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit}
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
        <h1 className="m-0 fw-bold text-center"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(28px, 5vw, 40px)", color: "#000" }}>
          Área do Advogado
        </h1>
        <h3 className="m-0 fw-semibold text-center"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
          Faça login na sua conta profissional.
        </h3>


        <FormField label="E-mail profissional">
          <div className="d-flex align-items-center w-100"
            style={{ height: "clamp(56px, 8vw, 70px)", borderRadius: "5px", background: "var(--branco-no-absoluto)", border: "1px solid var(--azul-escuro)", padding: "0 clamp(12px, 2.5vw, 20px)", gap: "clamp(6px, 1.5vw, 10px)" }}>
            <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)", flexShrink: 0 }} alt="" src={emailIcon} />
            <input
              className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
              style={{ height: "clamp(28px, 3.5vw, 35px)", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", background: "transparent" }}
              placeholder="Digite seu e-mail profissional"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </FormField>

        <FormField label="Senha" gap="gap-4">
          <div className="d-flex align-items-center w-100"
            style={{ height: "clamp(56px, 8vw, 70px)", borderRadius: "5px", background: "var(--branco-no-absoluto)", border: "1px solid var(--azul-escuro)", padding: "0 clamp(12px, 2.5vw, 20px)", gap: "clamp(6px, 1.5vw, 10px)" }}>
            <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)", flexShrink: 0 }} alt="" src="/assets/icons/f7-lock.svg" />
            <input
              className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
              style={{ height: "clamp(28px, 3.5vw, 35px)", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", background: "transparent" }}
              placeholder="Digite sua senha"
              type={showSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
            <button className="btn p-0 border-0 bg-transparent d-flex align-items-center justify-content-center" type="button"
              onClick={() => setShowSenha((prev) => !prev)} aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
              style={{ width: "clamp(28px, 3.5vw, 35px)", height: "clamp(28px, 3.5vw, 35px)", flexShrink: 0 }}>
              {showSenha ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1l22 22" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#102e44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </FormField>

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 gap-2">
          <button className="border-0 p-0 bg-transparent fw-semibold text-azul-escuro"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 16px)", textDecoration: "underline", cursor: "pointer" }}
            type="button">
            Esqueceu a senha?
          </button>
        </div>

        <button className="border-0 w-100" type="submit"
          style={{ borderRadius: "15px", background: "#fab84c", padding: "clamp(10px, 1.5vw, 16px) 24px", cursor: "pointer", transition: "filter 0.2s" }}
          onMouseOver={(e) => e.currentTarget.style.filter = "brightness(0.92)"}
          onMouseOut={(e) => e.currentTarget.style.filter = ""}>
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "#000" }}>Entrar como advogado</b>
        </button>

        <div className="d-flex align-items-center w-100 gap-2">
          <div className="flex-grow-1" style={{ borderTop: "1px solid #000" }} />
          <span className="fw-semibold text-nowrap" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 16px)" }}>Ou continuar com</span>
          <div className="flex-grow-1" style={{ borderTop: "1px solid #000" }} />
        </div>

        <button className="border-0 w-100 d-flex align-items-center justify-content-center gap-2" type="button"
          style={{ borderRadius: "15px", background: "#fff", border: "1px solid var(--azul-escuro)", padding: "clamp(10px, 1.5vw, 16px) 24px", cursor: "pointer" }}>
          <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)" }} alt="" src={googleIcon} />
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(16px, 2vw, 20px)", color: "#000" }}>Continue com Google</b>
        </button>

        <div className="d-flex flex-column flex-sm-row align-items-center gap-1">
          <span className="fw-semibold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
            Não tem uma conta?
          </span>
          <span className="fw-semibold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#fab84c", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/cadastro/advogado")}>
            Criar conta de advogado
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginAdvogado;
