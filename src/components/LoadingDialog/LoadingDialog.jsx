import Spinner from "../Spinner/Spinner";
import styles from "./LoadingDialog.module.css"

function LoadingDialog({ className, show = true, style, message }) {
    return (
        <div className={`default-box-shadow ${styles.dialog} ${show ? 'flex' : 'hidden'} ${className || ''}`} style={style}>
            <Spinner />
            <p className="w-full font-primary font-semibold">{message}</p>
        </div>
    )
}

export default LoadingDialog;
