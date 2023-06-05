import react from "react";
import styles from '../styles/Button.module.css'

const Button = ({ color, text, onClick }) => {
    return <button onClick={onClick} style={{ backgroundColor: color }} className={styles.btn}>{text}</button>
  }
  export default Button