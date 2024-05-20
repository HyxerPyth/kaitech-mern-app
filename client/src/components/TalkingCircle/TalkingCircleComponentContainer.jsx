import React, { useState } from "react"
import style from './TalkingCircle.module.css'
import { motion } from 'framer-motion'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'

const TalkingCircleComponentContainer = (props) => {
    const [isPulsing, setIsPulsing] = useState(false)
    const [isThinking, setIsThinking] = useState(false)

    const options = [
        { name: "Oleh Krainyk", language: "ru", voice_id: "e9vdovKhaVvQkqj8VRgD" , internal_name: "olehKrainyk" },
        { name: "Andrew Tate", language: "en-US", voice_id: "ZCcavn038oJeGX5Y627R" , internal_name: "andrewTate" }
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
        const newArray = [...callData, newElement];
    
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
            const res = await axios.post('http://127.0.0.1:3002/get-response', request_data, {
                headers: {
                'Content-Type': 'application/json',
                },
            })

            addToArray({name: selectedOption.internal_name, message: res.data })

            // get audio from server
            try {
                const response = await axios.get('http://127.0.0.1:3002/get-response-audio', {
                    params: {
                        answer: res.data,
                        voice_id: selectedOption.voice_id
                    },
                    responseType: 'blob'
                })
                
                setIsThinking(false)
                playAudio(response.data)
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
                <svg height='300px' width='300px'>
                    <motion.circle r="135" cx="150" cy="150" fill="white" height="300" width="300" animate={isPulsing ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] } : isThinking ? {transform: ['translateY(10px)', 'translateY(-10px)', 'translateY(10px)'] , opacity: [1, 1]} : { scale: [1, 1], opacity: [1, 1], transform: 'translateY(0px)' }}
                    transition={isPulsing || isThinking ? { repeat: Infinity, duration: 0.7, ease: "easeInOut" } : {}}
                    onClick={() => handleTogglePulse()} className={style.circleSVG}/>
                </svg>
            </div>
        </div>
    );
}

export default TalkingCircleComponentContainer;
