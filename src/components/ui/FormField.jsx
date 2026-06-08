function FormField({ label, gap = "gap-2", children }) {
  return (
    <div className={`d-flex flex-column align-items-start w-100 ${gap}`}
      style={{ maxWidth: "100%" }}
    >
      <label className="m-0 align-self-stretch fw-semibold text-start"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(14px, 2vw, 16px)",
          color: "var(--azul-escuro)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormField;
