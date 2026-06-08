import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/ui/FormField";
import PasswordInput from "../../components/ui/PasswordInput";
import emailIcon from "../../assets/icons/ic-outline-email.svg";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";
import bgImage from "../../assets/images/Pag-Login@3x.png";

const LoginCliente = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const saved = localStorage.getItem("juriki_usuarios");
    const usuarios = saved ? JSON.parse(saved) : [];
    const user = usuarios.find((u) => u.email === email && u.tipoUsuario === "CLIENTE");

    if (user) {
      login({ nome: user.nome, email: user.email, tipoUsuario: "CLIENTE" });
    } else {
      login({ nome: email.split("@")[0] || "Usuário", email, tipoUsuario: "CLIENTE" });
    }
    navigate("/inicio");
  }, [email, senha, login, navigate]);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        padding: "clamp(16px, 5vw, 84px)",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-100 overflow-hidden flex-shrink-0"
        autoComplete="off"
        style={{
          maxWidth: "520px",
          borderRadius: "var(--br-20)",
          background: "rgba(244,234,216,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(12, 24, 34, 0.15)",
          boxShadow: "var(--shadow-drop-3)",
          padding: "clamp(24px, 4vw, 48px)",
          gap: "clamp(20px, 3vw, 28px)",
        }}
      >
        <div className="d-flex flex-column align-items-center gap-1 w-100">
          <h1 className="m-0 fw-bold text-center"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(28px, 5vw, 36px)", color: "var(--azul-escuro)", letterSpacing: "-0.02em" }}>
            Bem-Vindo
          </h1>
          <h3 className="m-0 text-center"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px, 2.2vw, 17px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.65)", lineHeight: 1.5 }}>
            Faça login na sua conta para continuar.
          </h3>
        </div>

        <FormField label="Email">
          <div className={`d-flex align-items-center w-100`}
            style={{
              height: "clamp(50px, 7vw, 56px)",
              borderRadius: "var(--br-8)",
              background: "var(--branco-no-absoluto)",
              border: focusedField === "email" ? "2px solid var(--azul-sereno)" : "1px solid rgba(12, 24, 34, 0.25)",
              padding: "0 clamp(14px, 2.5vw, 18px)",
              gap: "clamp(8px, 1.5vw, 12px)",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxShadow: focusedField === "email" ? "0 0 0 3px rgba(61, 106, 138, 0.12)" : "none",
            }}>
            <img style={{ height: "clamp(20px, 2.5vw, 24px)", width: "clamp(20px, 2.5vw, 24px)", flexShrink: 0, opacity: 0.6 }} alt="" src={emailIcon} />
            <input
              className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
              style={{ height: "clamp(22px, 3vw, 26px)", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px, 2.2vw, 17px)", background: "transparent" }}
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </FormField>

        <FormField label="Senha" gap="gap-2">
          <PasswordInput
            value={senha}
            onChange={setSenha}
            placeholder="Digite sua senha"
          />
        </FormField>

        <div className="d-flex align-items-center justify-content-end w-100">
          <button className="border-0 p-0 bg-transparent"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(13px, 1.8vw, 14px)", fontWeight: 600, color: "var(--azul-sereno)", cursor: "pointer", transition: "color 0.2s ease" }}
            type="button"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--azul-escuro)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--azul-sereno)"}>
            Esqueceu a senha?
          </button>
        </div>

        <button className="border-0 w-100" type="submit"
          style={{
            borderRadius: "var(--br-12)",
            background: "var(--amarelo)",
            padding: "clamp(12px, 1.8vw, 16px) 24px",
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
            boxShadow: "0 2px 8px rgba(250, 184, 76, 0.3)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#e8a83a"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(250, 184, 76, 0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--amarelo)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(250, 184, 76, 0.3)"; }}>
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: "var(--azul-escuro)" }}>Entrar</b>
        </button>

        <div className="d-flex align-items-center w-100 gap-3">
          <div className="flex-grow-1" style={{ borderTop: "1px solid rgba(12, 24, 34, 0.12)" }} />
          <span className="text-nowrap" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(13px, 1.8vw, 14px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.45)" }}>Ou continuar com</span>
          <div className="flex-grow-1" style={{ borderTop: "1px solid rgba(12, 24, 34, 0.12)" }} />
        </div>

        <button className="border-0 w-100 d-flex align-items-center justify-content-center gap-2" type="button"
          style={{
            borderRadius: "var(--br-12)",
            background: "var(--branco)",
            border: "1px solid rgba(12, 24, 34, 0.2)",
            padding: "clamp(12px, 1.8vw, 16px) 24px",
            cursor: "pointer",
            transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--branco-no-absoluto)"; e.currentTarget.style.borderColor = "var(--azul-escuro)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--branco)"; e.currentTarget.style.borderColor = "rgba(12, 24, 34, 0.2)"; }}>
          <img style={{ height: "clamp(20px, 2.5vw, 24px)", width: "clamp(20px, 2.5vw, 24px)" }} alt="" src={googleIcon} />
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 2vw, 17px)", color: "var(--azul-escuro)" }}>Continue com Google</b>
        </button>

        <div className="d-flex align-items-center justify-content-center gap-1 w-100" style={{ marginTop: "4px" }}>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 15px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.6)" }}>
            Não tem uma conta?
          </span>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 15px)", fontWeight: 600, color: "var(--amarelo)", cursor: "pointer", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#e8a83a"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--amarelo)"}
            onClick={() => navigate("/cadastro/cliente")}>
            Cadastre-se
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginCliente;
