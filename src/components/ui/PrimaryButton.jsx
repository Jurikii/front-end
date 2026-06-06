const PrimaryButton = ({
  className = "",
  children,
}) => {
  return (
    <div
      className={`rounded-15 bg-amarelo d-flex align-items-center justify-content-center font-inter text-preto fw-bold ${className}`}
      style={{
        width: "163px",
        border: "1px solid #000",
        padding: "10px",
      }}
    >
      <h3 className="mb-0 fw-bold" style={{ fontSize: "24px" }}>{children}</h3>
    </div>
  );
};

export default PrimaryButton;
