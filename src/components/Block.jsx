
import styles from "./Block.module.css"
import LoadingDialog from "./LoadingDialog/LoadingDialog";

function Block({ children, type, title, items }) {
    switch (type) {
        case "paragraph":
            return (
                <>
                    <div className={`${styles.block} ${styles.paragraphBlock}`}>
                        {title ? <h2 className={`${styles.title}`}>{title}</h2> : null}
                        {children}
                    </div>
                </>
            )

        case "orderedList":
            return (
                <>
                    <div className={`${styles.block} ${styles.listBlock}`}>
                        {title ? <h2 className={`${styles.title}`}>{title}</h2> : null}
                        <ol>
                            {
                                items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))
                            }
                        </ol>
                    </div >
                </>
            )
        case "unorderedList":
            return (
                <>
                    <div className={`${styles.block} ${styles.listBlock}`}>
                        {title ? <h2 className={`${styles.title}`}>{title}</h2> : null}
                        <ul>
                            {
                                items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))
                            }
                        </ul>
                    </div >
                </>
            )

        case "loading":
            return (
                <>
                    <LoadingDialog className={`${styles.block}`} style={{ 'width': '100%', 'maxWidth': 'none' }} message="More content is being generated, please be patient."></LoadingDialog>
                </>
            )

        case "loading_flashcards":
            return (
                <>
                    <LoadingDialog className={`${styles.block}`} style={{ 'width': '100%', 'maxWidth': 'none', 'minHeight': '184px', 'backgroundColor': 'hsla(50 100% 64.3% / 0.5)' }} message="Your flashcards is being generated, please be patient."></LoadingDialog>
                </>
            )

        default:
            return (
                <>
                    <div className={`${styles.block}`}>
                        Content
                    </div>
                </>
            )
    }
}

export default Block;