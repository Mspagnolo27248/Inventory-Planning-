import React, { ChangeEvent, MouseEventHandler } from 'react'
import styles from '../modals.module.css'


interface DateRangeModelProps{
  isOpen:boolean, 
  startDate:string, 
  endDate:string, 
  startDateChangeHandler:(e:React.ChangeEvent<HTMLInputElement>) => void, 
  endDateChangeHandler:(e:React.ChangeEvent<HTMLInputElement>) => void, 
  proceedHandler:()=>void, 
  cancelHandler:()=>void,
  title:string,
  message:string 
}

const DateRangeModal:React.FC<DateRangeModelProps>=({ isOpen, startDate, endDate, startDateChangeHandler, endDateChangeHandler, proceedHandler, cancelHandler,title,message })=> {
  if (!isOpen) {
    return null
  }
  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <div className={styles['modal-header']}>
        <p className={styles['title']}>{title}</p>
        <span onClick={cancelHandler}>
        &times;
        </span>
        </div>
        <div className={styles['modal-body']}>
          <p>{message}</p>
          <div className='flex-row'>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={startDateChangeHandler} />
          </div>
          <div className='flex-row'>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={endDateChangeHandler} />
          </div>
          <div className={styles['btn-group']}>
            <button className="btn-green" onClick={proceedHandler}>Submit</button>
            <button className = "btn-red" onClick={cancelHandler}>Cancel</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DateRangeModal