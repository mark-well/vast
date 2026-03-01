
import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'default');

    useEffect(() => {
        const root = window.document.documentElement;
        if (currentTheme !== 'default') {
            root.setAttribute('data-theme', currentTheme)
        }

        localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{
            currentTheme,
            setCurrentTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider