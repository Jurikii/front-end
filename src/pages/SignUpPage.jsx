import SignUpCard from "../components/sections/SignUpCard";
import bgCadastro from "../assets/images/Pag-Cadastro@3x.png";

const SignUpPage = () => {
  return (
    <div
      className="w-100 position-relative overflow-x-auto d-flex align-items-center justify-content-center min-vh-100"
      style={{
        padding: "45px 20px",
        backgroundImage: `url(${bgCadastro})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
