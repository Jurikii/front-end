import ButtonPrimary from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";
import logoImg from "../../assets/images/Logo@2x.png";

function Header() {
  return (
    <section
      className="d-flex align-items-start justify-content-center pt-0 px-0 pb-0 flex-shrink-0 text-left text-branco font-montserrat"
      style={{
        flex: "1.0715",
        minWidth: "2070px",
        maxWidth: "328%",
        fontSize: "25px",
      }}
    >
      <div
        className="flex-grow-1 d-flex align-items-start justify-content-end"
        style={{ maxWidth: "2070px" }}
      >
        <div
          className="flex-grow-1 d-flex align-items-start"
          style={{ maxWidth: "1440px" }}
        >
          <div
            className="flex-grow-1 bg-azul d-flex align-items-center justify-content-center"
            style={{
              height: "107px",
              paddingTop: "9px",
              paddingLeft: "49px",
              paddingRight: "27px",
              gap: "127px",
            }}
          >
            <img
              className="object-fit-cover flex-shrink-0"
              style={{ height: "87.8px", width: "90px" }}
              loading="lazy"
              alt=""
              src={logoImg}
            />
            <div
              className="d-flex align-items-center justify-content-end flex-shrink-0"
              style={{ gap: "130px" }}
            >
              <h2 className="m-0 fw-bold text-amarelo" style={{ fontSize: "inherit", fontFamily: "inherit" }}>
                Início
              </h2>
              <h2 className="m-0 fw-bold" style={{ fontSize: "inherit", fontFamily: "inherit" }}>
                Planos
              </h2>
              <h2 className="m-0 fw-bold" style={{ fontSize: "inherit", fontFamily: "inherit" }}>
                Sobre nós
              </h2>
              <h2 className="m-0 fw-bold text-center" style={{ fontSize: "inherit", fontFamily: "inherit" }}>
                FAQ
              </h2>
            </div>
            <div
              className="d-flex align-items-end flex-shrink-0 font-inter"
              style={{ gap: "30px", fontSize: "24px", color: "#000" }}
            >
              <ButtonPrimary />
              <ButtonSecondary />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
