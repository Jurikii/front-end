import PropTypes from "prop-types";
import styles from "./ProcessItem.module.css";

const STATUS_STYLES = {
  "Em andamento": styles.statusActive,
  "Docs pendentes": styles.statusPending,
};

const ProcessItem = ({ icon, number, subject, status, onClick, onArrowClick }) => {
  const statusClass = STATUS_STYLES[status] || "";

  const handleArrowClick = (e) => {
    e.stopPropagation();
    onArrowClick?.();
  };

  return (
    <div className={styles.item} onClick={onClick}>
      <img className={styles.icon} alt="" src={icon} />
      <div className={styles.info}>
        <span className={styles.number}>{number}</span>
        <span className={styles.subject}>{subject}</span>
      </div>
      <div className={[styles.statusBadge, statusClass].join(" ")}>
        <span>{status}</span>
      </div>
      <img
        className={styles.arrow}
        alt="Ver processo"
        src="/setinha-1.svg"
        onClick={handleArrowClick}
      />
    </div>
  );
};

ProcessItem.propTypes = {
  icon: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onArrowClick: PropTypes.func,
};

export default ProcessItem;
