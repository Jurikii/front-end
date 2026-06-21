import PropTypes from "prop-types";
import styles from "./StatCard.module.css";

const StatCard = ({ icon, value, label, subtitle, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.icon} loading="lazy" alt="" src={icon} />
      <div className={styles.info}>
        <h2 className={styles.value}>{value}</h2>
        <span className={styles.label}>{label}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default StatCard;
