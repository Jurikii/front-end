import { useMemo } from "react";
import emailIcon from "../../assets/icons/ic-outline-email.svg";

const InputField = ({
  className = "",
  label,
  placeholder,
  minWidth,
  icon,
}) => {
  const inputStyle = useMemo(() => {
    return {
      minWidth: minWidth,
    };
  }, [minWidth]);

  const srcIcon = icon || emailIcon;

  return (
    <div
      className={`w-100 d-flex flex-column align-items-start ${className}`}
      style={{ gap: "clamp(12px, 2vw, 16px)", maxWidth: "550px" }}
    >
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
          src={srcIcon}
        />
        <input
          className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
          style={{
            height: "clamp(28px, 3.5vw, 35px)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            background: "transparent",
            minWidth: minWidth || "0",
          }}
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  );
};

export default InputField;
