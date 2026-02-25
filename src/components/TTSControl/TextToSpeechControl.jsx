import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function TextToSpeechControl() {
    return (
        <div className="fixed bg-(--secondary-color) max-w-80 w-4/5 flex justify-center px-4 py-5 gap-x-6 rounded-sm bottom-4 left-1/2 -translate-x-1/2">
            <FontAwesomeIcon icon="fa-solid fa-play" size="xl" />
            <FontAwesomeIcon icon="fa-solid fa-x" size="xl" />
        </div>
    )
}

export default TextToSpeechControl