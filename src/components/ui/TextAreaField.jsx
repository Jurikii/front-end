import { useState } from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, value, onChange, placeholder = "", icon, required = false, rows = 4 }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-100 d-flex flex-column align-items-start" style={{ gap: "clamp(8px, 1.5vw, 12px)", maxWidth: "100%" }}>
      {label && (
        <label className="m-0 align-self-stretch fw-semibold text-start"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(14px, 2vw, 16px)", color: "var(--azul-escuro)", letterSpacing: "0.02em" }}>
          {label}{required && <span style={{ color: "#dc2626" }}> *</span>}
        </label>
      )}
      <div className="d-flex align-items-start w-100"
        style={{
          borderRadius: "var(--br-8)",
          background: "var(--branco-no-absoluto)",
          border: focused ? "2px solid var(--azul-sereno)" : "1px solid rgba(12, 24, 34, 0.25)",
          padding: "clamp(12px, 2.5vw, 18px)",
          gap: "clamp(8px, 1.5vw, 12px)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(61, 106, 138, 0.12)" : "none",
        }}>
        {icon && (
          <img style={{ height: "clamp(20px, 2.5vw, 24px)", width: "clamp(20px, 2.5vw, 24px)", flexShrink: 0, opacity: 0.6, marginTop: "4px" }} alt="" src={icon} />
        )}
        <textarea
          className="border-0 text-azul-escuro flex-grow-1 input-placeholder"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px, 2.2vw, 17px)", background: "transparent", resize: "vertical", minHeight: "100px", outline: "none" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextAreaField;
