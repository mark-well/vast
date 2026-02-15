
import styles from "./Block.module.css"

function getRandomNumber(min, max, isInteger) {
    if (isInteger) {
        return Math.floor(Math.random() * (max - min) + min);
    } else {
        return Math.random() * (max - min) + min;
    }
}

function Block({ children, type, title, items }) {

    let randomColor = {
        h: getRandomNumber(0, 100, true),
        s: getRandomNumber(0, 100, true),
        l: getRandomNumber(0, 100, true),
    }

    const randomBgColor = {
        border: `1.5px solid hsla(${randomColor.h}, ${randomColor.s}%, ${randomColor.l}%, 100%)`,
        backgroundColor: `hsla(${randomColor.h}, ${randomColor.s}%, ${randomColor.l}%, 25%)`
    }

    switch (type) {
        case "paragraph":
            return (
                <>
                    <div className={`${styles.block} ${styles.paragraphBlock}`} style={randomBgColor}>
                        {title ? <h2 className={`${styles.title}`}>{title}</h2> : null}
                        {children}
                    </div>
                </>
            )

        case "orderedList":
            return (
                <>
                    <div className={`${styles.block} ${styles.listBlock}`} style={randomBgColor}>
                        {title ? <h2 className={`${styles.title}`}>{title}</h2> : null}                        <ol>
                            {
                                items.map((item) => (
                                    <li>{item}</li>
                                ))
                            }
                        </ol>
                    </div >
                </>
            )
        case "unorderedList":
            return (
                <>
                    <div className={`${styles.block} ${styles.listBlock}`} style={randomBgColor}>
                        {title ? <h2 className={`${styles.title}`}>{title}</h2> : null}
                        <ul>
                            {
                                items.map((item) => (
                                    <li>{item}</li>
                                ))
                            }
                        </ul>
                    </div >
                </>
            )
        default:
            return (
                <>
                    <div className={`${styles.block}`} style={randomBgColor}>
                        Content
                    </div>
                </>
            )
    }
}

export default Block;