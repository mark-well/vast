
import styles from "./FlashcardItem.module.css"

function FlashcardItem({ isFlipped, front, back }) {
    return (
        <div className={`${styles.card} ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'} default-box-shadow`}>
            <div className={`${styles.frontCard}`}>
                <h2 className="text-center">{front}</h2>
            </div>
            <div className={`${styles.backCard}`}>
                <h2 className="text-center">{back}</h2>
            </div>
        </div>
    )
}

export default FlashcardItem;