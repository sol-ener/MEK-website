import { useRef, useState } from "react";
import PlayIcon from "/src/assets/play-icon.svg?react";
import Waveform from "/src/assets/waveform.svg?react";

const VoiceRadioButton = ({ id, flagImage, title, detail, audio, handleChange, value }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
 
  const handleAudioPlay = () => {
    setIsPlaying(!isPlaying);
    const audioElem = audioRef.current;
    if(audioElem){
      if(audioElem.paused){
        audioElem.play();
      }
      else{
        audioElem.pause();
      }
    }
  };

  return (
    <li>
      <input id={id} type="radio" name="voice" className="peer hidden" value={value} onChange={handleChange} />
      <label
        htmlFor={id}
        className="p-2 flex justify-between items-center text-[#21283C] border-2 border-[#E3E9EE] cursor-pointer rounded-2xl peer-checked:border-primary"
      >
        <div className="grow flex gap-4 items-stretch">
          <div className="w-[50px] h-[44px] rounded-lg overflow-hidden">
            <img
              src={flagImage}
              className="w-full h-full object-cover"
              alt="flag"
            />
          </div>
          <div className="relative grow">
            {/* {isPlaying?<div className="flex items-center h-full">
              <Waveform/>
            </div>:
            <div className="text-left">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-xs text-[#5D6E7E]">{detail}</p>
            </div>} */}
            <div className="text-left">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-xs text-[#5D6E7E]">{detail}</p>
            </div>
          </div>
           
        </div>
        <audio ref={audioRef}>
          <source src={audio} type="audio/mp3"/>
        </audio>
        <button className="cursor-pointer" onClick={handleAudioPlay}>
          <PlayIcon />
        </button>
      </label>
    </li>
  );
};
export default VoiceRadioButton;
