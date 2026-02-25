import React from 'react'

function ColorTheme({ className, color, onClick }) {
    return (
        <div className={`${className || ''}`} data-color={color} onClick={onClick}></div>
    )
}

export default ColorTheme