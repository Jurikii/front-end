import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/ui/InputField";
import PasswordInput from "../../components/ui/PasswordInput";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";
import bgCadastro from "../../assets/images/Pag-Cadastro@3x.png";

const PLANOS = [
  { id: "broto", nome: "Broto", preco: "Grátis", desc: "Ideal para começar" },
  { id: "flor", nome: "Flor", preco: "R$ 29,90/mês", desc: "Para uso frequente" },
];

const CadastroCliente = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nome: "", cpf: "", email: "", telefone: "", dataNascimento: "",
    senha: "", confirmarSenha: "", plano: "broto",
  });
  const [termos, setTermos] = useState(false);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const saved = localStorage.getItem("juriki_usuarios");
    const usuarios = saved ? JSON.parse(saved) : [];

    const novoUsuario = {
      nome: form.nome,
      cpf: form.cpf,
      email: form.email,
      telefone: form.telefone,
      dataNascimento: form.dataNascimento,
      senha: form.senha,
      tipoUsuario: "CLIENTE",
      plano: form.plano,
      criadoEm: new Date().toISOString(),
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("juriki_usuarios", JSON.stringify(usuarios));

    register({ nome: form.nome, email: form.email, tipoUsuario: "CLIENTE" });
    navigate("/inicio");
  }, [form, register, navigate]);

  return (
    <div
      className="w-100 position-relative overflow-x-auto d-flex align-items-center justify-content-center min-vh-100"
      style={{
        padding: "45px 20px",
        backgroundImage: `url(${bgCadastro})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
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
          Criar Conta
        </h1>
        <h3 className="m-0 fw-semibold text-center"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
          Preencha os dados abaixo para criar sua conta.
        </h3>


        <InputField
          label="Nome completo"
          placeholder="Digite seu nome completo"
          value={form.nome}
          onChange={(v) => updateField("nome", v)}
        />

        <InputField
          label="CPF"
          placeholder="000.000.000-00"
          value={form.cpf}
          onChange={(v) => updateField("cpf", v)}
        />

        <InputField
          label="Email"
          placeholder="name@example.com"
          value={form.email}
          onChange={(v) => updateField("email", v)}
        />

        <InputField
          label="Telefone"
          placeholder="(11) 99999-9999"
          value={form.telefone}
          onChange={(v) => updateField("telefone", v)}
        />

        <InputField
          label="Data de nascimento"
          placeholder=""
          type="date"
          value={form.dataNascimento}
          onChange={(v) => updateField("dataNascimento", v)}
        />

        <PasswordInput
          label="Senha"
          placeholder="Mínimo 8 caracteres"
          value={form.senha}
          onChange={(v) => updateField("senha", v)}
        />

        <PasswordInput
          label="Confirmar senha"
          placeholder="Repita a senha"
          value={form.confirmarSenha}
          onChange={(v) => updateField("confirmarSenha", v)}
        />

        <div className="w-100 d-flex flex-column align-items-start" style={{ gap: "clamp(12px, 2vw, 16px)", maxWidth: "550px" }}>
          <h3 className="m-0 align-self-stretch fw-semibold text-start"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
            Escolher plano
          </h3>
          <div className="d-flex w-100 gap-3 flex-wrap">
            {PLANOS.map((plano) => (
              <div key={plano.id}
                className="flex-grow-1 d-flex flex-column align-items-center"
                style={{
                  padding: "clamp(12px, 2vw, 20px)",
                  borderRadius: "10px",
                  border: `2px solid ${form.plano === plano.id ? "#fab84c" : "rgba(16,46,68,0.2)"}`,
                  background: form.plano === plano.id ? "rgba(250,184,76,0.1)" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  minWidth: "140px",
                }}
                onClick={() => updateField("plano", plano.id)}>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#102e44" }}>{plano.nome}</span>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "#fab84c" }}>{plano.preco}</span>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(12px, 1.5vw, 14px)", color: "rgba(16,46,68,0.6)" }}>{plano.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="align-self-stretch d-flex align-items-center gap-2">
          <label className="d-flex align-items-center position-relative" style={{ cursor: "pointer" }}>
            <input type="checkbox" className="position-absolute" style={{ width: 0, height: 0, opacity: 0 }}
              checked={termos} onChange={() => setTermos(!termos)} />
            <div className={`d-flex align-items-center justify-content-center flex-shrink-0 rounded border-2`}
              style={{
                width: "clamp(32px, 4vw, 40px)", height: "clamp(32px, 4vw, 40px)",
                backgroundColor: termos ? "#fab84c" : "#f4ead8",
                borderColor: termos ? "#000" : "var(--azul-escuro)",
                transition: "all 0.2s",
              }}>
              {termos && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polyline points="20 6 9 17 4 12" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </label>
          <div className="fw-semibold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 16px)" }}>
            <span style={{ color: "#102e44" }}>Eu aceito os </span>
            <span className="cursor-pointer" style={{ color: "#fab84c", textDecoration: "underline" }}>Termos de Uso </span>
            <span style={{ color: "#020202" }}>e a </span>
            <span className="cursor-pointer" style={{ color: "#fab84c", textDecoration: "underline" }}>Política de Privacidade</span>
          </div>
        </div>

        <button className="border-0 w-100" type="submit"
          style={{ borderRadius: "15px", background: "#fab84c", padding: "clamp(10px, 1.5vw, 16px) 24px", cursor: "pointer" }}
          onMouseOver={(e) => e.currentTarget.style.filter = "brightness(0.92)"}
          onMouseOut={(e) => e.currentTarget.style.filter = ""}>
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "#000" }}>Criar conta</b>
        </button>

        <div className="align-self-stretch d-flex align-items-center gap-2">
          <div style={{ flex: 1, borderTop: "1px solid #000" }} />
          <h3 className="mb-0 fw-semibold text-nowrap" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 16px)" }}>Ou cadastrar com</h3>
          <div style={{ flex: 1, borderTop: "1px solid #000" }} />
        </div>

        <button className="border-0 w-100 d-flex align-items-center justify-content-center gap-2" type="button"
          style={{ borderRadius: "15px", background: "#fff", border: "1px solid var(--azul-escuro)", padding: "clamp(10px, 1.5vw, 16px) 24px", cursor: "pointer" }}>
          <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)" }} alt="" src={googleIcon} />
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(16px, 2vw, 20px)", color: "#000" }}>Continue com Google</b>
        </button>

        <div className="align-self-stretch d-flex align-items-center justify-content-center gap-1 flex-wrap">
          <h3 className="mb-0 fw-semibold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
            Já tem uma conta?
          </h3>
          <h3 className="mb-0 fw-semibold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#fab84c", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login/cliente")}>
            Faça Login
          </h3>
        </div>
      </form>
    </div>
  );
};

export default CadastroCliente;
