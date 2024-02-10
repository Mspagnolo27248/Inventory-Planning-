import React, { MouseEventHandler } from 'react'
import styles from "../modals.module.css"

interface BackdropProps {
  closeModalHandler: MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<BackdropProps> = ({ closeModalHandler}) => { 

  return (
    <div className={styles.backdrop} onClick={closeModalHandler}></div>
  );
};

export default Backdrop;
