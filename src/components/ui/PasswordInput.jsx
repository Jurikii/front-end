import { useState } from "react";
import lockIcon from "../../assets/icons/f7-lock.svg";

function PasswordInput({
  className = "",
  label,
  placeholder = "Digite sua senha",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`w-100 d-flex flex-column align-items-start ${className}`}
      style={{ gap: "clamp(12px, 2vw, 16px)", maxWidth: "550px" }}
    >
      {label && (
        <h3
          className="align-self-stretch fw-semibold m-0"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "var(--azul-escuro)",
          }}
        >
          {label}
        </h3>
      )}
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
          style={{
            height: "clamp(28px, 3.5vw, 35px)",
            width: "clamp(28px, 3.5vw, 35px)",
            flexShrink: 0,
          }}
          alt=""
          src={lockIcon}
        />
        <input
          className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
          style={{
            height: "clamp(28px, 3.5vw, 35px)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            background: "transparent",
          }}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          value=""
          onChange={() => {}}
        />
        <button
          className="btn p-0 border-0 bg-transparent flex-shrink-0 d-flex align-items-center justify-content-center"
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
          style={{ cursor: "pointer", width: "clamp(28px, 3.5vw, 35px)", height: "clamp(28px, 3.5vw, 35px)" }}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--azul-escuro)" }}>
              <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--azul-escuro)" }}>
              <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
