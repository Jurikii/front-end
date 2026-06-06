import LoginCard from "../components/sections/LoginCard";
import bgImage from "../assets/images/Pag-Login@3x.png";

function LoginPage() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        padding: "clamp(16px, 5vw, 84px)",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LoginCard />
    </div>
  );
}

export default LoginPage;
