import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const ITEMS = [
  { id: "calendario", label: "Calendário", icon: "/Vector4.svg", path: "/calendarioadvogado" },
  { id: "minhas-consultas", label: "Minhas consultas", icon: "/Vector5.svg", path: "/agendaadvogado" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        {ITEMS.map(({ id, label, icon, path }) => (
          <button
            key={id}
            className={pathname === path ? styles.itemAtivo : styles.item}
            onClick={() => navigate(path)}
          >
            <img className={styles.icone} alt="" src={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
