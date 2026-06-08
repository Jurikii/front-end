import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/ui/InputField";
import PasswordInput from "../../components/ui/PasswordInput";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import emailIcon from "../../assets/icons/ic-outline-email.svg";
import googleIcon from "../../assets/icons/mynaui-google-solid.svg";
import bgCadastro from "../../assets/images/Pag-Cadastro@3x.png";

const ESPECIALIDADES = [
  "Direito Civil", "Direito Penal", "Direito Trabalhista", "Direito Tributário",
  "Direito Empresarial", "Direito de Família", "Direito Imobiliário",
  "Direito Previdenciário", "Direito do Consumidor", "Direito Administrativo",
  "Direito Digital", "Direito Ambiental", "Direito Eleitoral",
  "Direito Internacional", "Direito Militar",
];

const CadastroAdvogado = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nome: "", cpf: "", email: "", telefone: "", dataNascimento: "",
    oab: "", ufOab: "SP", especialidade: "", descricao: "",
    senha: "", confirmarSenha: "",
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
      tipoUsuario: "ADVOGADO",
      oab: form.oab.trim(),
      ufOab: form.ufOab,
      especialidade: form.especialidade,
      descricao: form.descricao,
      aprovado: false,
      criadoEm: new Date().toISOString(),
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("juriki_usuarios", JSON.stringify(usuarios));

    register({ nome: form.nome, email: form.email, tipoUsuario: "ADVOGADO" });
    navigate("/homeadvogado");
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
            Cadastro de Advogado
          </h1>
          <h3 className="m-0 text-center"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px, 2.2vw, 17px)", fontWeight: 500, color: "rgba(12, 24, 34, 0.65)", lineHeight: 1.5 }}>
            Preencha os dados para criar sua conta profissional.
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
          label="Email profissional"
          placeholder="advogado@example.com"
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

        <div className="w-100 d-flex gap-3 flex-wrap">
          <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
            <InputField
              label="Número OAB"
              placeholder="Ex: 123456"
              value={form.oab}
              onChange={(v) => updateField("oab", v)}
            />
          </div>
          <div style={{ flex: "1 1 120px", minWidth: "80px" }}>
            <SelectField
              label="UF OAB"
              value={form.ufOab}
              onChange={(v) => updateField("ufOab", v)}
              options={[
                "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
                "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
              ]}
            />
          </div>
        </div>

        <SelectField
          label="Especialidade (opcional)"
          value={form.especialidade}
          onChange={(v) => updateField("especialidade", v)}
          options={ESPECIALIDADES}
          placeholder="Selecione uma especialidade"
        />

        <TextAreaField
          label="Descrição profissional (opcional)"
          placeholder="Conte um pouco sobre sua trajetória e áreas de atuação..."
          value={form.descricao}
          onChange={(v) => updateField("descricao", v)}
          rows={3}
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
          <b style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: "var(--azul-escuro)" }}>Criar conta de advogado</b>
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
            onClick={() => navigate("/login/advogado")}>
            Faça Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default CadastroAdvogado;
