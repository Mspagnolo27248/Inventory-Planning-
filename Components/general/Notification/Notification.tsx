import React, { useEffect, useState } from 'react'
import styles from './Notification.module.css'

export type NotificationType = {
    title: string,
    message: string,
    type: 'danger'|'success'|'warning'
    time: number
}


interface  NotificationProps{
    title:string, 
    message:string,
     type:string,
      isVisible:boolean,
      setIsVisible:(state:boolean)=>void,
      time:number
}

const  Notification: React.FC<NotificationProps>=({ title, message, type, isVisible,setIsVisible,time })=> {
    const [visible, setVisible] = useState(isVisible);
    const defaultTime = 3000;
    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    useEffect(() => {
        const duration = time || defaultTime;
        if (visible) {
            const timeout = setTimeout(() => {
                setVisible(false);
                setIsVisible(false);
            }, duration);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [visible]);


    if (!visible) {
        return null; // Return null to hide the component
    }
    return (
        <div className={`${styles['notification']} ${styles[type]}`}>
            <span style={{ fontWeight: '500' }}>{title}:&nbsp;</span>{message}
        </div>


    )
}

export default Notification