import VoiceRadioButton from "./VoiceRadioButton";
import CloseIcon from "/src/assets/close-icon.svg?react";
import SearchIcon from "/src/assets/search-icon.svg?react";
import BackArrow from "/src/assets/back-arrow.svg?react";
import UsaFlag from "../../../assets/usa-flag.png"
import { useState } from "react";

const voices = [
  {
    flagImage: UsaFlag,
    title: "USA - Original",
    detail: "Original USA male Voice",
    state: "paused",
    id: "usa-male-voice-1",
    audio: "/src/assets/upbeat-audio.mp3"
  },
  {
    flagImage: UsaFlag,
    title: "USA - Original",
    detail: "Original USA male Voice",
    state: "paused",
    id: "usa-male-voice-2",
    audio: "/src/assets/upbeat-audio.mp3"
  },
  {
    flagImage: UsaFlag,
    title: "USA - Original",
    detail: "Original USA male Voice",
    state: "paused",
    id: "usa-male-voice-3",
    audio: "/src/assets/upbeat-audio.mp3"
  },
];

const SelectVoice = ({ hideModal, handleGoBack }) => {
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = () => {
    console.log(selectedOption)
    hideModal();
  }

  return (
      <div className="bg-white sm:w-[90%] sm:max-w-[600px] h-[calc(100%_-_80px)] overflow-auto sm:rounded-xl sm:h-fit">
        <div className="px-4 sm:p-6">
          <div className="py-5 relative sm:flex sm:justify-between sm:items-center sm:mb-5 sm:py-0">
            <button onClick={handleGoBack} className="absolute top-5 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden">
              <BackArrow />
            </button>
            <h2 className="text-[20px] font-semibold text-center sm:text-left sm:text-2xl">Select Voice</h2>
            <CloseIcon className="hidden cursor-pointer sm:inline" onClick={hideModal} />
          </div>
          <div className="relative w-full">
            <input
              type="text"
              id="search-voice"
              placeholder="Search"
              className="p-4 w-full h-full border border-[#E3E9EE] rounded-lg bg-[#F4F5F9]"
            />
            <SearchIcon className="absolute top-4 right-4" />
          </div>
          <ul className="my-5 list-none flex flex-col gap-3">
            {voices.map((voice) => (
              <VoiceRadioButton key={voice.id} handleChange={handleChange} value={voice.id} {...voice} />
            ))}
          </ul>
        </div>

        <div className="w-full absolute bottom-0 p-4 shadow-[0_0_16px_0_rgba(0,0,0,0.14)] bg-white sm:bg-inherit sm:p-6 sm:static">
          <button onClick={handleSubmit} className="w-full py-3 bg-primary text-white rounded-lg">
            Ok
          </button>
        </div>
      </div>
  );
};



export default SelectVoice;
