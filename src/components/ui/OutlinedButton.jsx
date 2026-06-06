const OutlinedButton = ({
  className = "",
  children,
}) => {
  return (
    <div
      className={`rounded-15 border-amarelo d-flex align-items-center justify-content-center font-inter text-amarelo fw-bold ${className}`}
      style={{
        border: "1px solid #fab84c",
        padding: "10px",
      }}
    >
      <h3 className="mb-0 fw-bold" style={{ fontSize: "24px" }}>{children}</h3>
    </div>
  );
};

export default OutlinedButton;
