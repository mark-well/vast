
import styles from "./Button.module.css"
import { Link } from 'react-router-dom'

function Button({ children, icon, to, onClick, className }) {

    if (to && children && icon) {
        return (
            <>
                <Link to={to} className={`${styles.buttonDefault} ${className || ""}`}>{children}{icon}</Link>
            </>
        )
    }

    if (to && icon) {
        return (
            <>
                <Link to={to} className={`${styles.buttonDefault} ${className || ""}`}>{icon}</Link>
            </>
        )
    }

    // Render a button for navigation (uses link instead of button)
    if (to && children) {
        return (
            <>
                <Link to={to} className={`${styles.buttonNavigation} ${className || ""}`}>{children}</Link>
            </>
        )
    }

    // Render a button with text and icon
    if (children && icon) {
        return (
            <>
                <button className={`${styles.buttonDefault} ${styles.buttonTextIcon} ${className || ""}`} onClick={onClick}>
                    {children}
                    {icon}
                </button>
            </>
        )
    }

    // Render a button with only icon
    if (icon) {
        return (
            <>
                <button className={`${styles.buttonDefault} ${styles.buttonIcon} ${className || ""}`} onClick={onClick}>
                    {icon}
                </button>
            </>
        )
    }


    //Default button
    return (
        <>
            <button className={`${styles.buttonDefault} ${className || ""}`} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button;