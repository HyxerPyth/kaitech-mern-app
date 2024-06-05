import React, { useState } from "react"
import style from './TalkingCircle.module.css'
import { motion } from 'framer-motion'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'

const TalkingCircleComponentContainer = (props) => {
    const [isPulsing, setIsPulsing] = useState(false)
    const [isThinking, setIsThinking] = useState(false)

    const options = [
        { name: "Andrew Tate", language: "en-US", language_display: "english (us)" , voice_id: "ZCcavn038oJeGX5Y627R" , internal_name: "andrewTate" },
        { name: "Oleh Krainyk", language: "ru", language_display: "russian", voice_id: "e9vdovKhaVvQkqj8VRgD" , internal_name: "olehKrainyk" }
    ]

    const [selectedOption, setSelectedOption] = useState(options[0])
    const [callData, setCallData] = useState([])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    const startListening = (language) => SpeechRecognition.startListening({ continuous: true, language })

    const addToArray = (newElement) => {
        const newArray = [...callData, newElement]
        setCallData(newArray)
      }

    const handleTogglePulse = () => {
        setIsPulsing(!isPulsing)

        if (!isPulsing) {
            startListening(selectedOption.language)
        } else {
            SpeechRecognition.abortListening()
            addToArray({name: 'USER', message: transcript })
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

        setIsThinking(true)

        // get asnwer from server
        const request_data = {
            message: transcript,
            person_name: selectedOption.internal_name,
            call_data: callData,
        }

        try {
            const res = await axios.post('/getresponse', request_data, {
                headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Content-Type': 'application/json; charset=UTF-8'
                },
            })
            console.log(res.data)

            addToArray({name: selectedOption.internal_name, message: res.data })

            const request_data_audio = {
                answer: res.data,
                voice_id: selectedOption.voice_id
            }
            // get audio from server
            try {
                const response = await axios.post('/getaudioresponse', request_data_audio, {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'ngrok-skip-browser-warning': 'skip-browser-warning',
                    }
                })
                
                setIsThinking(false)
                const blob = new Blob([response.data], { type: 'audio/mpeg' });
                playAudio(blob)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const playAudio = async (data) => {
      
        const audio = new Audio(URL.createObjectURL(data))
        audio.play()
      
        await new Promise(resolve => {
          audio.addEventListener('ended', () => {
            resolve()
          })
        })
      }

    const handleTEST = () => {
        axios.get('https://b83f-162-245-68-145.ngrok-free.app/test').then((res) => {
            console.log(res)
        })
    }


    return (
        <div className={style.personSelectionRow}>
            <div className={style.selectPerson}>
                <label htmlFor="options">Choose an option: </label>
                <select id="options" value={selectedOption.name} onChange={handleSelectChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <div className={style.language_display}>
                    {selectedOption.language_display}
                </div>
            </div>

            <div onClick={handleTEST}>TEST</div>

            <div className={style.circleWrapper}>
                <svg height='100%' width='100%' viewBox="0 0 450 450" className={style.svgcircle}>

                    <motion.circle
                        r="100" 
                        cx="225" 
                        cy="225" 
                        fill="white"
                        height="450" 
                        width="450" 
                        animate={
                            isPulsing 
                            ? { scale: [1, 1.05, 1], opacity: [1, 0.7, 1] } 
                            : isThinking 
                            ? { y: [15, -15, 15], opacity: [1, 1], rotate: [0, 360]} 
                            : { scale: [1], opacity: [1, 1], y: 0 }
                        }
                        transition={isPulsing || isThinking ? { repeat: Infinity, duration: 0.7, ease: "easeInOut" } : {}}
                        onClick={() => handleTogglePulse()} 
                        className={style.circleSVG}
                />

                
                </svg>
            </div>
        </div>
    );
}

export default TalkingCircleComponentContainer;
