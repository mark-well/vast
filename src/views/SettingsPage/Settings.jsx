import { useContext } from "react";
import Header from "../../components/Header";
import ColorTheme from "./ColorTheme";
import styles from "./Settings.module.css"
import { ThemeContext } from "../../context/ThemeContext";

function Settings() {

    const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
    const selectTheme = (e) => {
        setCurrentTheme(e.target.getAttribute("data-color"))
    }

    return (
        <>
            <Header type="navigation" />
            <div className={styles.themeContainer}>
                <h2>Theme</h2>
                <div className={styles.themes}>
                    <ColorTheme className={`${styles.theme}`} onClick={selectTheme} color={'red'} />
                    <ColorTheme className={`${styles.theme}`} onClick={selectTheme} color={'orange'} />
                    <ColorTheme className={`${styles.theme}`} onClick={selectTheme} color={'yellow'} />
                    <ColorTheme className={`${styles.theme}`} onClick={selectTheme} color={'green'} />
                    <ColorTheme className={`${styles.theme}`} onClick={selectTheme} color={'blue'} />
                    <ColorTheme className={`${styles.theme}`} onClick={selectTheme} color={'purple'} />
                </div>
            </div>
        </>
    )
}

export default Settings;