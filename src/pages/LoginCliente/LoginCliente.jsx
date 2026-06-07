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
          Bem-Vindo
        </h1>
        <h3 className="m-0 fw-semibold text-center"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
          Faça login na sua conta para continuar.
        </h3>


        <FormField label="Email">
          <div className="d-flex align-items-center w-100"
            style={{ height: "clamp(56px, 8vw, 70px)", borderRadius: "5px", background: "var(--branco-no-absoluto)", border: "1px solid var(--azul-escuro)", padding: "0 clamp(12px, 2.5vw, 20px)", gap: "clamp(6px, 1.5vw, 10px)" }}>
            <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)", flexShrink: 0 }} alt="" src={emailIcon} />
            <input
              className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
              style={{ height: "clamp(28px, 3.5vw, 35px)", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", background: "transparent" }}
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </FormField>

        <FormField label="Senha" gap="gap-4">
          <PasswordInput
            value={senha}
            onChange={setSenha}
            placeholder="Digite sua senha"
          />
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
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "#000" }}>Entrar</b>
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
            onClick={() => navigate("/cadastro/cliente")}>
            Cadastre-se
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginCliente;
