import { createContext, useEffect, useState } from "react";

export const TextToSpeechContext = createContext();

function TextToSpeechProvider({ children }) {
    const [synth] = useState(() => window.speechSynthesis);
    const [voices, setVoices] = useState([]);

    // Load voices correctly (important!)
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();

        // Some browsers (Chrome) load voices asynchronously
        synth.onvoiceschanged = loadVoices;

        return () => {
            synth.onvoiceschanged = null;
        };
    }, [synth]);

    let isStopped = false;
    const playText = (selectedVoice, contentsArray, onEndCallback) => {
        if (!Array.isArray(contentsArray) || contentsArray.length === 0) return;

        synth.cancel(); // stop previous speech

        const queue = [];

        contentsArray.forEach(section => {
            // Add title
            if (section.title?.trim()) {
                queue.push(section.title);
            }

            // Add content
            if (Array.isArray(section.content)) {
                section.content.forEach(item => {
                    if (item?.trim()) queue.push(item);
                });
            } else if (section.content?.trim()) {
                queue.push(section.content);
            }
        });

        if (queue.length === 0) return;

        let index = 0;

        const speakNext = () => {
            if (isStopped) return;

            if (index >= queue.length) {
                onEndCallback?.();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(queue[index]);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.onend = () => {
                index++;
                speakNext();
            };

            utterance.onerror = (e) => {
                console.error("Speech error:", e);
                onEndCallback?.();
            };

            synth.speak(utterance);
        };

        speakNext();
    };

    const stop = () => {
        synth.cancel();
        isStopped = true;
    };

    const unStop = () => {
        isStopped = false;
    }

    return (
        <TextToSpeechContext.Provider
            value={{
                voices,
                synth,
                playText,
                stop,
                unStop
            }}
        >
            {children}
        </TextToSpeechContext.Provider>
    );
}

export default TextToSpeechProvider;