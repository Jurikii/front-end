import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/ui/InputField";
import PasswordInput from "../../components/ui/PasswordInput";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";
import bgCadastro from "../../assets/images/Pag-Cadastro@3x.png";
import { PLANOS_PARA_VOCE } from "../PlanosSemLogin/data/planos";

const PLANOS_CADASTRO = PLANOS_PARA_VOCE.filter(
  (p) => p.id === "petala" || p.id === "broto"
);

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
        backgroundPosition: "center",
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
            Criar Conta
          </h1>
          <h3 className="m-0 text-center"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px, 2.2vw, 17px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.65)", lineHeight: 1.5 }}>
            Preencha os dados abaixo para criar sua conta.
          </h3>
        </div>

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

        <div className="w-100 d-flex flex-column align-items-start" style={{ gap: "clamp(8px, 1.5vw, 12px)", maxWidth: "100%" }}>
          <label className="m-0 align-self-stretch fw-semibold text-start"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 16px)", color: "var(--azul-escuro)", letterSpacing: "0.02em" }}>
            Escolher plano
          </label>
          <div className="d-flex w-100 gap-3 flex-wrap">
            {PLANOS_CADASTRO.map((plano) => {
              const selected = form.plano === plano.id;
              return (
                <div key={plano.id}
                  className="d-flex flex-column"
                  style={{
                    flex: 1,
                    minWidth: "180px",
                    padding: "clamp(16px, 2.2vw, 24px)",
                    borderRadius: "var(--br-12)",
                    border: selected ? "2px solid var(--amarelo)" : "1px solid rgba(12,24,34,0.15)",
                    background: selected ? "rgba(250,184,76,0.08)" : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    gap: "12px",
                  }}
                  onClick={() => updateField("plano", plano.id)}
                  onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.boxShadow = "var(--shadow-drop-3)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; } }}>
                  <div className="d-flex align-items-start gap-3" style={{ minWidth: 0 }}>
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "60px", height: "60px",
                        borderRadius: "var(--br-30)",
                        background: "var(--areia)",
                      }}>
                      <img style={{ width: "34px", maxHeight: "100%", objectFit: "contain" }} alt={plano.nome} src={plano.icone} />
                    </div>
                    <div className="d-flex flex-column" style={{ minWidth: 0, gap: "2px" }}>
                      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700, color: "var(--azul)", lineHeight: 1.2 }}>
                        {plano.nome}
                      </span>
                      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(12px, 1.4vw, 13px)", fontWeight: 500, color: "rgba(12,24,34,0.55)", lineHeight: 1.3 }}>
                        {plano.descricao}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline gap-1">
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--azul-escuro)" }}>R$</span>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--amarelo)", lineHeight: 1 }}>
                      {plano.preco}
                    </span>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", fontWeight: 500, color: "rgba(12,24,34,0.45)" }}>/mês</span>
                  </div>
                  <ul className="d-flex flex-column m-0 p-0" style={{ gap: "6px", listStyle: "none" }}>
                    {plano.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" stroke="var(--amarelo)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(11px, 1.2vw, 12px)", color: "rgba(12,24,34,0.65)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="align-self-stretch d-flex align-items-center gap-3">
          <label className="d-flex align-items-center position-relative" style={{ cursor: "pointer" }}>
            <input type="checkbox" className="position-absolute" style={{ width: 0, height: 0, opacity: 0 }}
              checked={termos} onChange={() => setTermos(!termos)} />
            <div className={`d-flex align-items-center justify-content-center flex-shrink-0 rounded`}
              style={{
                width: "clamp(24px, 3vw, 28px)", height: "clamp(24px, 3vw, 28px)",
                borderRadius: "var(--br-4, 4px)",
                backgroundColor: termos ? "var(--amarelo)" : "var(--branco-no-absoluto)",
                border: `2px solid ${termos ? "var(--amarelo)" : "rgba(12, 24, 34, 0.25)"}`,
                transition: "all 0.2s ease",
              }}>
              {termos && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <polyline points="20 6 9 17 4 12" stroke="var(--azul-escuro)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </label>
          <div className="fw-semibold" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(13px, 1.8vw, 14px)", lineHeight: 1.4 }}>
            <span style={{ color: "var(--azul)" }}>Eu aceito os </span>
            <span className="cursor-pointer" style={{ color: "var(--amarelo)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#e8a83a"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--amarelo)"}>Termos de Uso </span>
            <span style={{ color: "rgba(2, 2, 2, 0.7)" }}>e a </span>
            <span className="cursor-pointer" style={{ color: "var(--amarelo)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#e8a83a"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--amarelo)"}>Política de Privacidade</span>
          </div>
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
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: "var(--azul-escuro)" }}>Criar conta</b>
        </button>

        <div className="align-self-stretch d-flex align-items-center gap-3">
          <div style={{ flex: 1, borderTop: "1px solid rgba(12, 24, 34, 0.12)" }} />
          <span className="mb-0 text-nowrap" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(13px, 1.8vw, 14px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.45)" }}>Ou cadastrar com</span>
          <div style={{ flex: 1, borderTop: "1px solid rgba(12, 24, 34, 0.12)" }} />
        </div>

        <button className="border-0 w-100 d-flex align-items-center justify-content-center gap-2" type="button"
          style={{
            borderRadius: "var(--br-12)",
            background: "var(--branco)",
            border: "1px solid rgba(12, 24, 34, 0.2)",
            padding: "clamp(12px, 1.8vw, 16px) 24px",
            cursor: "pointer",
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--branco-no-absoluto)"; e.currentTarget.style.borderColor = "var(--azul-escuro)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--branco)"; e.currentTarget.style.borderColor = "rgba(12, 24, 34, 0.2)"; }}>
          <img style={{ height: "clamp(20px, 2.5vw, 24px)", width: "clamp(20px, 2.5vw, 24px)" }} alt="" src={googleIcon} />
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 2vw, 17px)", color: "var(--azul-escuro)" }}>Continue com Google</b>
        </button>

        <div className="align-self-stretch d-flex align-items-center justify-content-center gap-1 flex-wrap">
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 15px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.6)" }}>
            Já tem uma conta?
          </span>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 15px)", fontWeight: 600, color: "var(--amarelo)", cursor: "pointer", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#e8a83a"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--amarelo)"}
            onClick={() => navigate("/login/cliente")}>
            Faça Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default CadastroCliente;
