import React from "react";
import Button from "./Button";
import styles from "../styles/Header.module.css";

const Header = ({ showForm, changeTextAndColor, refTask }) => {
  return (
    <header className={styles.header}>
      <h2 className={`${styles.appHeader}`}>Students Directory</h2>
      <div className={styles.refBtn}>
        <i
          className={`${styles.ref} fa-solid fa-arrows-rotate`}
          onClick={refTask}
        ></i>
        <Button
          onClick={showForm}
          color={changeTextAndColor ? "red" : "green"}
          text={changeTextAndColor ? "Close" : "Add"}
          
        />
      </div>
    </header>
  );
};
export default Header;
