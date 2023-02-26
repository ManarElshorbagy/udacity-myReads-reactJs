import React from "react";
import styles from "./Loader.module.css";


const Loader = () => {
    return (
        <div className={styles.loader}>
          <div className={styles.loaderSpinner}>
          </div>
        </div>
      );
};
export default Loader;