import PropTypes from "prop-types";
import styles from "./AppointmentItem.module.css";

const AppointmentItem = ({ time, day, initials, name, subject, type, isPresential = false }) => {
  return (
    <div className={styles.item}>
      {/* Hora e dia */}
      <div className={styles.timeBlock}>
        <span className={styles.time}>{time}</span>
        <span className={styles.day}>{day}</span>
      </div>

      <div className={styles.divider} />

      {/* Info do cliente */}
      <div className={styles.clientBlock}>
        <div className={styles.clientInfo}>
          <div className={styles.avatar}>
            <span className={styles.initials}>{initials}</span>
          </div>
          <div className={styles.nameBlock}>
            <span className={styles.name}>{name}</span>
            <span className={styles.subject}>{subject}</span>
          </div>
        </div>

        <div className={[styles.typeBadge, isPresential ? styles.typeBadgePresential : ""].join(" ")}>
          {!isPresential && (
            <img
              className={styles.dot}
              src="/tabler-point-filled.svg"
              alt=""
              loading="lazy"
            />
          )}
          <span>{isPresential ? "Presencial" : "Online"}</span>
        </div>
      </div>
    </div>
  );
};

AppointmentItem.propTypes = {
  time: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["online", "presencial"]),
  isPresential: PropTypes.bool,
};

export default AppointmentItem;
