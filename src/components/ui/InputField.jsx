import { useState } from "react";
import emailIcon from "../../assets/icons/ic-outline-email.svg";

const InputField = ({
  className = "",
  label,
  placeholder,
  minWidth,
  icon,
  type = "text",
}) => {
  const [focused, setFocused] = useState(false);
  const srcIcon = icon || emailIcon;

  return (
    <div
      className={`w-100 d-flex flex-column align-items-start ${className}`}
      style={{ gap: "clamp(8px, 1.5vw, 12px)", maxWidth: "100%" }}
    >
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
      <div
        className="d-flex align-items-center w-100"
        style={{
          height: "clamp(50px, 7vw, 56px)",
          borderRadius: "var(--br-8)",
          background: "var(--branco-no-absoluto)",
          border: focused ? "2px solid var(--azul-sereno)" : "1px solid rgba(12, 24, 34, 0.25)",
          padding: "0 clamp(14px, 2.5vw, 18px)",
          gap: "clamp(8px, 1.5vw, 12px)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(61, 106, 138, 0.12)" : "none",
        }}
      >
        <img
          style={{
            height: "clamp(20px, 2.5vw, 24px)",
            width: "clamp(20px, 2.5vw, 24px)",
            flexShrink: 0,
            opacity: 0.6,
          }}
          alt=""
          src={srcIcon}
        />
        <input
          className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
          style={{
            height: "clamp(22px, 3vw, 26px)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(15px, 2.2vw, 17px)",
            background: "transparent",
            color: "var(--azul-escuro)",
            minWidth: minWidth || "0",
          }}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
};

export default InputField;
