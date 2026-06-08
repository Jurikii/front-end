import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigationType, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import ModalEscolhaTipo from "./components/ModalEscolhaTipo";
import HomePage from "./pages/HomePage";
import LoginCliente from "./pages/LoginCliente/LoginCliente";
import LoginAdvogado from "./pages/LoginAdvogado/LoginAdvogado";
import CadastroCliente from "./pages/CadastroCliente/CadastroCliente";
import CadastroAdvogado from "./pages/CadastroAdvogado/CadastroAdvogado";
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

// ── Páginas do Advogado ──
import HomeAdvogado from "./pages/HomeAdvogado/HomeAdvogado";
import AgendaMinhasConsultas from "./pages/AgendaMinhasConsultas/AgendaMinhasConsultas";
import AgendaCalendario from "./pages/AgendaCalendario/AgendaCalendario";
import MeusProcessosAdvogado from "./pages/MeusProcessosAdvogado/MeusProcessosAdvogado";
import DetalhesDaConsultaAdvogado from "./pages/DetalhesDaConsultaAdvogado/DetalhesDaConsultaAdvogado";
import DocumentosDoProcesso from "./pages/DocumentosProcessoAdvogado/DocumentosDoProcesso";
import ChatAdvogado from "./pages/ChatAdvogado/ChatAdvogado";
import PlanosAdvogado from "./pages/PlanosAdvogado/PlanosAdvogado";
import PerfilAdvogadoAdv from "./pages/PerfilAdvogadoAdv/PerfilAdvogadoAdv";
import ConfiguracoesAdvogado from "./pages/ConfiguracoesAdvogado/ConfiguracoesAdvogado";

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
    <AuthProvider>
      <AuthModalProvider>
        <ModalEscolhaTipo />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/cadastro" element={<Navigate to="/" replace />} />
          <Route path="/login/cliente" element={<LoginCliente />} />
          <Route path="/login/advogado" element={<LoginAdvogado />} />
          <Route path="/cadastro/cliente" element={<CadastroCliente />} />
          <Route path="/cadastro/advogado" element={<CadastroAdvogado />} />
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

      {/* ── Rotas do Advogado ── */}
      <Route path="/homeadvogado" element={<HomeAdvogado />} />
      <Route path="/agendaadvogado" element={<AgendaMinhasConsultas />} />
      <Route path="/calendarioadvogado" element={<AgendaCalendario />} />
      <Route path="/meus-processosadvogado" element={<MeusProcessosAdvogado />} />
      <Route path="/detalhes-processoadvogado" element={<DetalhesDaConsultaAdvogado />} />
      <Route path="/documentos-processoadvogado" element={<DocumentosDoProcesso />} />
      
      <Route path="/chatadvogado" element={<ChatAdvogado />} />
      <Route path="/planosadvogado" element={<PlanosAdvogado />} />
      <Route path="/perfiladvogado" element={<PerfilAdvogadoAdv />} />
      <Route path="/configuracoesadvogado" element={<ConfiguracoesAdvogado />} />
        </Routes>
      </AuthModalProvider>
    </AuthProvider>
  );
}

export default App;
