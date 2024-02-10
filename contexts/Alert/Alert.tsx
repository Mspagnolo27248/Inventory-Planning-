import styles from './Alert.module.css'

interface AlertProps {
    message: string;
    type:AlertTypes
    dissmisable?:boolean;
    onClose?:()=>void;
  }

export type AlertTypes =  'danger'|'success'|'warning';

const Alert: React.FC<AlertProps> = ({ message,type,onClose}) => {
    return (
        <div className={`${styles.alert} ${styles[type]}`}>
        {message}
        <span className={styles.close} aria-hidden="true" onClick={onClose}>X</span>
      </div>
    );
  };
  
  export default Alert;