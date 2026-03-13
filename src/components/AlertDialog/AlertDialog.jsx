import React from 'react'
import styles from "./AlertDialog.module.css";
import Button from '../Button';

function AlertDialog({ type, icon, message, onAction }) {
    return (
        <>
            <div className={`${styles.bg}`}></div>
            <div className={`${styles.container} default-box-shadow`}>
                <span className={`${styles.icon} ${styles[type]}`}>{icon}</span>
                <div className={`${styles.actionContainer}`}>
                    <h2 className='font-bold text-xl'>
                        {
                            type == "success" ? "Success" : ""
                        }
                        {
                            type == "error" ? "Oops..." : ""
                        }
                    </h2>
                    <p className='overflow-auto text-(--text-secondary)'>{message}</p>
                    <Button className={`${styles.actionButton} default-box-shadow`} onClick={onAction}>Okay</Button>
                </div>
            </div>
        </>
    )
}

export default AlertDialog