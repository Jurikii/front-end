import { useId } from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, options = [], value, onChange, placeholder = "Selecione...", icon, required = false }) => {
  const inputId = useId();

  return (
    <div className="w-100 d-flex flex-column align-items-start" style={{ gap: "clamp(12px, 2vw, 16px)", maxWidth: "550px" }}>
      {label && (
        <h3 className="m-0 align-self-stretch fw-semibold text-start"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
          {label}{required && <span style={{ color: "#dc2626" }}> *</span>}
        </h3>
      )}
      <div className="d-flex align-items-center w-100 position-relative"
        style={{ height: "clamp(56px, 8vw, 70px)", borderRadius: "5px", background: "var(--branco-no-absoluto)", border: "1px solid var(--azul-escuro)", padding: "0 clamp(12px, 2.5vw, 20px)", gap: "clamp(6px, 1.5vw, 10px)" }}>
        {icon && (
          <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)", flexShrink: 0 }} alt="" src={icon} />
        )}
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="border-0 outline-0 text-azul-escuro flex-grow-1"
          style={{ height: "100%", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", background: "transparent", cursor: "pointer", appearance: "auto", minWidth: 0 }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={typeof opt === "string" ? opt : opt.value} value={typeof opt === "string" ? opt : opt.value}>
              {typeof opt === "string" ? opt : opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  required: PropTypes.bool,
};

export default SelectField;
