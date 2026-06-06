import { useState } from "react";

function RememberMe() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="d-flex align-items-center gap-2 text-azul-escuro fw-semibold"
      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)" }}
    >
      <label className="d-flex align-items-center position-relative" style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          className="position-absolute"
          style={{ width: 0, height: 0, opacity: 0, margin: 0, padding: 0 }}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div
          className={`d-flex align-items-center justify-content-center flex-shrink-0 rounded border-2 ${
            checked
              ? "bg-amarelo"
              : "bg-branco-no-absoluto"
          }`}
          style={{
            width: "clamp(32px, 4vw, 40px)",
            height: "clamp(32px, 4vw, 40px)",
            borderColor: checked ? "#000" : "var(--azul-escuro)",
            transition: "background-color 0.15s, border-color 0.15s",
          }}
        >
          {checked && (
            <svg
              style={{
                width: "clamp(20px, 2.5vw, 24px)",
                height: "clamp(20px, 2.5vw, 24px)",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </label>
      <span className="text-nowrap">Lembre-me</span>
    </div>
  );
}

export default RememberMe;
