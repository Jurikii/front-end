import { useState } from "react";
import lockIcon from "../../assets/icons/f7-lock.svg";

function PasswordInput({
  className = "",
  label,
  placeholder = "Digite sua senha",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`w-100 d-flex flex-column align-items-start ${className}`}
      style={{ gap: "clamp(8px, 1.5vw, 12px)", maxWidth: "100%" }}
    >
      {label && (
        <label
          className="align-self-stretch fw-semibold m-0"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(14px, 2vw, 16px)",
            color: "var(--azul-escuro)",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </label>
      )}
      <div
        className="d-flex align-items-center w-100"
        style={{
          height: "clamp(52px, 7vw, 60px)",
          borderRadius: "var(--br-8)",
          background: "var(--branco-no-absoluto)",
          border: focused ? "2px solid var(--azul-sereno)" : "1px solid rgba(12, 24, 34, 0.25)",
          padding: "0 clamp(14px, 2.5vw, 20px)",
          gap: "clamp(8px, 1.5vw, 12px)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(61, 106, 138, 0.12)" : "none",
        }}
      >
        <img
          style={{
            height: "clamp(22px, 3vw, 28px)",
            width: "clamp(22px, 3vw, 28px)",
            flexShrink: 0,
            opacity: 0.7,
          }}
          alt=""
          src={lockIcon}
        />
        <input
          className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
          style={{
            height: "clamp(24px, 3vw, 28px)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(15px, 2.2vw, 18px)",
            background: "transparent",
          }}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value=""
          onChange={() => {}}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button
          className="btn p-0 border-0 bg-transparent flex-shrink-0 d-flex align-items-center justify-content-center"
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
          style={{
            cursor: "pointer",
            width: "clamp(24px, 3vw, 32px)",
            height: "clamp(24px, 3vw, 32px)",
            opacity: 0.7,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--azul-escuro)" }}>
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--azul-escuro)" }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
