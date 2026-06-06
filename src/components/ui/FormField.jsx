function FormField({ label, gap = "gap-3", children }) {
  return (
    <div className={`d-flex flex-column align-items-start w-100 ${gap}`}
      style={{ maxWidth: "550px" }}
    >
      <h3 className="m-0 align-self-stretch fw-semibold text-start"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "#000",
        }}
      >
        {label}
      </h3>
      {children}
    </div>
  );
}

export default FormField;
