import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { TextToSpeechContext } from "./TextToSpeechContext";

function TextToSpeechControl({ contents, hide }) {
    const { voices, synth, playText, stop, unStop } = useContext(TextToSpeechContext);

    const [playing, setPlaying] = useState(false);
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

    const selectedVoice = voices?.[selectedVoiceIndex];

    const onPlayPause = () => {
        if (!synth) return;

        // If currently speaking and NOT paused → pause it
        if (synth.speaking && !synth.paused) {
            synth.pause();
            setPlaying(false);
            return;
        }

        // If paused → resume
        if (synth.paused) {
            synth.resume();
            setPlaying(true);
            return;
        }

        unStop()
        // Otherwise → start fresh
        setPlaying(true);
        playText(selectedVoice, contents, () => {
            setPlaying(false);
        });
    };

    const onStop = () => {
        stop();
        setPlaying(false);
    };

    const handleSelectChange = (e) => {
        setSelectedVoiceIndex(Number(e.target.value));
    };

    return (
        <div className={`${hide && "hidden"} fixed bg-(--secondary-color) max-w-80 w-4/5 flex justify-center items-center px-4 py-5 gap-x-6 rounded-sm bottom-8 left-1/2 -translate-x-1/2 default-box-shadow`}>

            {/* Play / Pause */}
            <FontAwesomeIcon
                icon={playing ? "fa-solid fa-pause" : "fa-solid fa-play"}
                size="xl"
                onClick={onPlayPause}
                className="cursor-pointer"
            />

            {/* Stop */}
            <FontAwesomeIcon
                icon="fa-solid fa-x"
                size="xl"
                onClick={onStop}
                className="cursor-pointer"
            />

            {/* Voice Selector */}
            <select
                name="voices"
                id="voice-options"
                value={selectedVoiceIndex}
                onChange={handleSelectChange}
                className="overflow-auto px-2 py-1 rounded"
            >
                {voices?.map((voice, index) => (
                    <option key={voice.name + index} value={index}>
                        {voice.name} ({voice.lang})
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TextToSpeechControl;