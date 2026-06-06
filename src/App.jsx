import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsurioIA from "./pages/UsuarioIA/UsurioIA";
import IADocumentos from "./pages/IADocumentos/IADocumentos";
import PerfilUsurio from "./pages/PerfilUsurio/PerfilUsurio";
import PlanosSemLogin from "./pages/PlanosSemLogin/PlanosSemLogin";
import PlanosComLogin from "./pages/PlanosComLogin/PlanosComLogin";
import MeusProcessos from "./pages/MeusProcessos/MeusProcessos";
import ComoFunciona from "./pages/ComoFunciona/ComoFunciona";
import SobreNos from "./pages/SobreNos/SobreNos";
import DetalhesProcesso from "./pages/DetalhesProcesso/DetalhesProcesso";
import HomeUsuario from "./pages/HomeUsuario/HomeUsuario";
import BuscarAdvogado from "./pages/BuscarAdvogado/BuscarAdvogado";
import AgendarConsulta from "./pages/AgendarConsulta/AgendarConsulta";
import TrocarDeAdvogado from "./pages/TrocarDeAdvogado/TrocarDeAdvogado";
import FAQTeste from "./pages/FAQTeste/FAQTeste";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import IADocumentosMaisDocumentos from "./pages/IADocumentosMaisDocumentos/IADocumentosMaisDocumentos";
import IADocumentosTrabalhista from "./pages/IADocumentosTrabalhista/IADocumentosTrabalhista";
import PerfilAdvogado from "./pages/PerfilAdvogado/PerfilAdvogado";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    if (pathname === "/") {
      document.title = "JURIKI - Inteligência Artificial Jurídica";
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      <Route path="/ia" element={<UsurioIA />} />
      <Route path="/documentos" element={<IADocumentos />} />
      <Route path="/perfil" element={<PerfilUsurio />} />
      <Route path="/planossemlogin" element={<PlanosSemLogin />} />
      <Route path="/planoscomlogin" element={<PlanosComLogin />} />
      <Route path="/processos" element={<MeusProcessos />} />
      <Route path="/processos/:id" element={<DetalhesProcesso />} />
      <Route path="/home-usuario" element={<HomeUsuario />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/sobre-nos" element={<SobreNos />} />
      <Route path="/inicio" element={<HomeUsuario />} />
      <Route path="/advogados" element={<BuscarAdvogado />} />
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
      <Route path="/trocar-advogado" element={<TrocarDeAdvogado />} />
      <Route path="/faq" element={<FAQTeste />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/documentos/mais" element={<IADocumentosMaisDocumentos />} />
      <Route path="/documentos/trabalhista" element={<IADocumentosTrabalhista />} />
      <Route path="/advogados/:id" element={<PerfilAdvogado />} />
    </Routes>
  );
}

export default App;
