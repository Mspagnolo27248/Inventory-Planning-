import React from 'react'
import styles from '../modals.module.css'

interface YesNoModalProps{
  title:string,
  message:string,
  isOpen:boolean,
  closeHandler:()=>void,
  submitYesHandler:()=>void,
  submitNoHandler:()=>void
}
const YesNoModal:React.FC<YesNoModalProps>=({title,message,isOpen,closeHandler,submitYesHandler,submitNoHandler}) =>{
    if(!isOpen){
        return null
    }
  return (
    <div className={styles["modal"]}>
    <div className={styles["modal-content"]}>
        <div className={styles['modal-header']}>
        <p className={styles['title']}>{title}</p>
        <span onClick={closeHandler}>
        &times;
        </span>
        </div>
    <div className={styles["modal-body"]}>
      <p>{message}</p>
     <div className={styles['btn-group']}>
      <button className='btn-green'onClick={submitYesHandler}>Yes</button>
      <button className='btn-red' onClick={submitNoHandler}>No</button>
      </div>
    </div>
    </div>
  </div>
  )
}

export default YesNoModal