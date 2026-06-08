import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import OrdenarPor from "./OrdenarPor";
import FiltrosDocumentos from "./FiltrosDocumentos";
import styles from "./HeaderSuperior.module.css";

const FORMATOS_ACEITOS = ["PDF", "PNG", "JPG", "JPEG", "DOCX", "XLSX"];
const EXTENSAO_ICONE = {
  PDF:  "/icone-tipo-arquivo.svg",
  PNG:  "/icone-png.svg",
  JPG:  "/ant-design-file-jpg-outlined.svg",
  JPEG: "/ant-design-file-jpg-outlined.svg",
  DOCX: "/bi-filetype-docx.svg",
  XLSX: "/icone-xlsx.svg",
};

function formatarTamanho(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1).replace(".", ",") + " KB";
  return (bytes / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
}

function agora() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const aa = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return { data: `${dd}/${mm}/${aa}`, hora: `${hh}:${mi}` };
}

// Card individual de categoria de documentos
const CardCategoria = ({ label, quantidade, icone, selecionado, onClick }) => (
  <div
    className={[styles.card, selecionado ? styles.cardSelecionado : ""].join(" ")}
    onClick={() => onClick(label)}
  >
    <div className={styles.cardConteudo}>
      <span className={styles.cardLabel}>{label}</span>
      <div className={styles.cardRodape}>
        <div className={styles.cardNumero}>
          <h2 className={styles.quantidade}>{quantidade}</h2>
          <span className={styles.textoDocumentos}>documentos</span>
        </div>
        <img className={styles.cardIcone} alt="" src={icone} />
      </div>
    </div>
  </div>
);

CardCategoria.propTypes = {
  label: PropTypes.string.isRequired,
  quantidade: PropTypes.number.isRequired,
  icone: PropTypes.string.isRequired,
};

// Cabeçalho superior da página de documentos do processo
const HeaderSuperior = ({ className = "", onVoltar, ordenarPor, onChangeOrdenarPor, onAplicarFiltros, onLimparFiltros, filtrosAtuais, categoriaSelecionada, onChangeCategoria, onFileDetected, opcoesFormatos, opcoesTipos, opcoesAreas, opcoesUrgencias, categorias }) => {
  const [ordenarAberto, setOrdenarAberto] = useState(false);
  const [filtrosAberto, setFiltrosAberto] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [erroFormato, setErroFormato] = useState(null);
  const [toastSaindo, setToastSaindo] = useState(false);
  const inputRef = useRef(null);
  const dragCounter = useRef(0);
  const toastTimerRef = useRef(null);

  const mostrarErro = useCallback((msg) => {
    setErroFormato(msg);
    setToastSaindo(false);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastSaindo(true);
      setTimeout(() => {
        setErroFormato(null);
        setToastSaindo(false);
      }, 300);
    }, 5000);
  }, []);

  const processarArquivo = useCallback((file) => {
    const nome = file.name;
    const ext = nome.split(".").pop().toUpperCase();
    if (!FORMATOS_ACEITOS.includes(ext)) {
      mostrarErro(`Formato .${ext.toLowerCase()} não é aceito. Formatos aceitos: PDF, PNG, JPG, DOCX e XLSX.`);
      return;
    }
    const { data, hora } = agora();
    onFileDetected({
      nome,
      tamanho: formatarTamanho(file.size),
      icone: EXTENSAO_ICONE[ext] || "/icone-tipo-arquivo.svg",
      data,
      hora,
    });
  }, [onFileDetected, mostrarErro]);

  const handleClickUpload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) processarArquivo(file);
    e.target.value = "";
  }, [processarArquivo]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processarArquivo(file);
  }, [processarArquivo]);

  const toggleOrdenar = useCallback(() => {
    setOrdenarAberto((v) => !v);
    setFiltrosAberto(false);
  }, []);

  const toggleFiltros = useCallback(() => {
    setFiltrosAberto((v) => !v);
    setOrdenarAberto(false);
  }, []);

  const fecharTudo = useCallback(() => {
    setOrdenarAberto(false);
    setFiltrosAberto(false);
  }, []);

  return (
    <section className={[styles.headerSuperior, className].join(" ")}>
      {/* Navegação de retorno */}
      <button className={styles.botaoVoltar} onClick={onVoltar}>
        <img className={styles.setaVoltar} alt="" src="/Icone-Seta-Voltar.svg" />
        <span>Voltar para meus processos</span>
      </button>

      {/* Título e área de upload */}
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Documentos do processo</h1>

        <div
          className={[styles.areaUpload, isDragging ? styles.areaUploadDragging : ""].join(" ")}
          onClick={handleClickUpload}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.areaUploadConteudo}>
            <div className={styles.areaUploadTitulo}>
              <img className={styles.uploadIcone} alt="" src="/Icone-Nuvem-Enviar.svg" />
              <h3 className={styles.uploadTexto}>Enviar novo documento</h3>
            </div>
            <div className={styles.uploadConteudoDinamico}>
              <span className={[styles.uploadDica, isDragging ? styles.uploadDicaOculto : ""].join(" ")}>
                Arraste e solte ou clique para selecionar
              </span>
              <span className={[styles.uploadDica, !isDragging ? styles.uploadDicaOculto : ""].join(" ")}>
                Solte o arquivo aqui
              </span>
              <span className={[styles.formatosAceitos, isDragging ? styles.formatosAceitosVisivel : ""].join(" ")}>
                Formatos aceitos: PDF, PNG, JPG, DOCX e XLSX
              </span>
            </div>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.docx,.xlsx"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Filtros */}
      <div className={styles.filtros}>
        <div className={styles.grupoFiltro}>
          <button className={styles.botaoFiltro} onClick={toggleOrdenar}>
            <img className={styles.filtroIcone} alt="" src="/Icone-Ordenar-Por.svg" />
            <span className={styles.filtroTexto}>Ordenar por</span>
          </button>
          <OrdenarPor aberto={ordenarAberto} onFechar={fecharTudo} selecionado={ordenarPor} onChange={onChangeOrdenarPor} />
        </div>
        <div className={styles.grupoFiltro}>
          <button className={styles.botaoFiltro} onClick={toggleFiltros}>
            <img className={styles.filtroIcone} alt="" src="/Vector13.svg" />
            <span className={styles.filtroTexto}>Filtros</span>
          </button>
          <FiltrosDocumentos aberto={filtrosAberto} onFechar={fecharTudo} onAplicar={onAplicarFiltros} onLimpar={onLimparFiltros} opcoesFormatos={opcoesFormatos} opcoesTipos={opcoesTipos} opcoesAreas={opcoesAreas} opcoesUrgencias={opcoesUrgencias} filtrosAtuais={filtrosAtuais} />
        </div>
      </div>

      <div
        className={[styles.backdrop, ordenarAberto || filtrosAberto ? styles.backdropVisivel : ""].join(" ")}
        onClick={fecharTudo}
      />

      {/* Cards de categorias */}
        <div className={styles.linhaCards}>
          {(categorias || []).map((cat) => (
            <CardCategoria
              key={cat.label}
              label={cat.label}
              quantidade={cat.quantidade}
              icone={cat.icone}
              selecionado={categoriaSelecionada === cat.label}
              onClick={onChangeCategoria}
            />
          ))}
        </div>

      {erroFormato && <div className={`${styles.erroToast}${toastSaindo ? ` ${styles.erroToastSaindo}` : ''}`}>{erroFormato}</div>}
    </section>
  );
};

HeaderSuperior.propTypes = {
  className: PropTypes.string,
  onVoltar: PropTypes.func,
  ordenarPor: PropTypes.string,
  onChangeOrdenarPor: PropTypes.func,
  onAplicarFiltros: PropTypes.func,
  onLimparFiltros: PropTypes.func,
  categoriaSelecionada: PropTypes.string,
  onChangeCategoria: PropTypes.func,
  onFileDetected: PropTypes.func,
  opcoesFormatos: PropTypes.array,
  opcoesTipos: PropTypes.array,
  opcoesAreas: PropTypes.array,
  categorias: PropTypes.array,
};

export default HeaderSuperior;
