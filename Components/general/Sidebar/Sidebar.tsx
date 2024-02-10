import React, { Fragment, ReactNode, useRef } from "react";
import styles from './Sidebar.module.css'

type SidebarProps = {
    children: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ children, isOpen, onClose }) => {
    const sideBarRef = useRef<HTMLDivElement>(null);
    const clickEventHandler = (e: React.MouseEvent) => {
        if (e.target !== sideBarRef.current) {
            onClose(false);
        }
    };

    const closeEventHandler = () => {
        onClose(false);
    }

    if (!isOpen) {
        return null;
    }
    return (
        <Fragment>
            <div className={styles["backdrop"]} onClick={clickEventHandler}></div>
            <div className={styles["side-bar"]} ref={sideBarRef}>
                <button className={styles["close-button"]} onClick={closeEventHandler}>
                X
                </button>
                {children}
            </div>
        </Fragment>
    );
};

export default Sidebar;
