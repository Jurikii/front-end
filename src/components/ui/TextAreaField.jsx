import PropTypes from "prop-types";

const TextAreaField = ({ label, value, onChange, placeholder = "", icon, required = false, rows = 4 }) => {
  return (
    <div className="w-100 d-flex flex-column align-items-start" style={{ gap: "clamp(12px, 2vw, 16px)", maxWidth: "550px" }}>
      {label && (
        <h3 className="m-0 align-self-stretch fw-semibold text-start"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#000" }}>
          {label}{required && <span style={{ color: "#dc2626" }}> *</span>}
        </h3>
      )}
      <div className="d-flex align-items-start w-100"
        style={{ borderRadius: "5px", background: "var(--branco-no-absoluto)", border: "1px solid var(--azul-escuro)", padding: "clamp(12px, 2.5vw, 20px)", gap: "clamp(6px, 1.5vw, 10px)" }}>
        {icon && (
          <img style={{ height: "clamp(28px, 3.5vw, 35px)", width: "clamp(28px, 3.5vw, 35px)", flexShrink: 0, marginTop: "4px" }} alt="" src={icon} />
        )}
        <textarea
          className="border-0 outline-0 text-azul-escuro flex-grow-1 input-placeholder"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", background: "transparent", resize: "vertical", minHeight: "100px" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={rows}
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
