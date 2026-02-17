import Button from "./Button";
import styles from "./TooltipMain.module.css";

function TooltipMain({ className }) {


    return (
        <>
            <div className={`${styles.tooltip} default-box-shadow ${className || ''}`}>
                <ul>
                    <li><Button>Settings</Button></li>
                    <li><Button>About</Button></li>
                </ul>
            </div>
        </>
    )
}

export default TooltipMain;