import { WiDaySunny, WiCloud } from "react-icons/wi";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.iconContainer}>
        <WiDaySunny className={styles.sunIcon} />
        <WiCloud className={styles.cloudIcon} />
      </div>
    </div>
  );
};

export default Logo;
