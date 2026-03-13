import Button from "../Button";
import styles from "./ConfirmationDialog.module.css";

function ConfirmationDialog({ title, message, positive, negative, onPositive, onNegative }) {
    return (
        <>
            <div className={`${styles.container} default-box-shadow`}>
                <div className={`${styles.messageContainer}`}>
                    <h2>{title || ""}</h2>
                    <p>{message || ""}</p>
                </div>

                <div className={`${styles.buttonsContainer}`}>
                    <Button className={`${styles.buttonPositive}`} onClick={onPositive}>{positive || "Yes"}</Button>
                    <Button className={`${styles.buttonNegative}`} onClick={onNegative}>{negative || "No"}</Button>
                </div>
            </div>
        </>
    )
}

export default ConfirmationDialog;