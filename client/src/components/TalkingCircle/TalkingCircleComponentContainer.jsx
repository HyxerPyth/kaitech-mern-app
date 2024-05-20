import React, { useState } from "react"
import style from './TalkingCircle.module.css'
import { motion } from 'framer-motion'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'

const TalkingCircleComponentContainer = (props) => {
    const [isPulsing, setIsPulsing] = useState(false)

    const options = [
        { name: "Oleh Krainyk", language: "ru", voice_id: "e9vdovKhaVvQkqj8VRgD" , internal_name: "olehKrainyk" },
        { name: "Andrew Tate", language: "en-US", voice_id: "ZCcavn038oJeGX5Y627R" , internal_name: "andrewTate" }
    ]

    const [selectedOption, setSelectedOption] = useState(options[0])
    
    const [callData, setCallData] = useState([])

    const [answer, setAnswer] = useState('')

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    const startListening = (language) => SpeechRecognition.startListening({ continuous: true, language })

    const handleTogglePulse = () => {
        setIsPulsing(!isPulsing)
        // console.log(selectedOption)
        
        if (!isPulsing) {
            startListening(selectedOption.language)
        } else {
            SpeechRecognition.abortListening()
            setCallData([...callData, {name: 'user', message: transcript }])
            getResponse()
            resetTranscript()
        }
    }

    const handleSelectChange = (event) => {
        setCallData([])
        const selectedName = event.target.value
        const newSelectedOption = options.find(option => option.name === selectedName)
        setSelectedOption(newSelectedOption)
    }

    const getResponse = async () => {

        // get asnwer from server
        try {
            const res = await fetch('http://127.0.0.1:3002/get-response?message='+transcript+'&person_name='+selectedOption.internal_name+'&calldata='+[]);
            const data = await res.text()
            // console.log(data)
            setCallData([...callData, {name: selectedOption.name, message: data }])

            // get audio from server
            try {
                const response = await axios.get('http://127.0.0.1:3002/get-response-audio', {
                    params: {
                        answer: data,
                        voice_id: selectedOption.voice_id
                    },
                    responseType: 'blob'
                })

                playAudio(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }

        
    }

    const playAudio = async (data) => {
      
        const audio = new Audio(URL.createObjectURL(data));
        audio.play();
      
        await new Promise(resolve => {
          audio.addEventListener('ended', () => {
            resolve();
          });
        });
      };

    return (
        <div>
            <div className={style.selectPerson}>
                <label htmlFor="options">Choose an option: </label>
                <select id="options" value={selectedOption.name} onChange={handleSelectChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.circleWrapper}>
                <motion.svg height="300" width="300" animate={isPulsing ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : { scale: [1, 1], opacity: 1 }}
                    transition={isPulsing ? { repeat: Infinity, duration: 0.7, ease: "easeInOut" } : {}}
                    onClick={() => handleTogglePulse()} className={style.circleSVG}>
                    <circle r="135" cx="150" cy="150" fill="white" />
                </motion.svg>
            </div>
        </div>
    );
}

export default TalkingCircleComponentContainer;
