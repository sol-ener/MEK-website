import { useState } from "react";
import BackArrow from "/src/assets/back-arrow.svg?react";
import RecordIcon from "/src/assets/record-icon.svg?react";
import RecordRedIcon from "/src/assets/record-red-icon.svg?react";
import SelectExportQuality from "../components/SelectExportQuality";
import ModalOverlay from "../../../components/ModalOverlay";
import ShareVideo from "../components/ShareVideo";

const RecordVideo = ({handleUIUpdate}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showExportUI, setShowExportUI] = useState(false);
  const [exportQuality, setExportQuality] = useState("");

  const handleRecording = () => {
    setIsRecording(true);
    setShowExportUI(true);
  }

  const hideExportUIModal = () => {
    setShowExportUI(false);
  }

  const handleGoBack = () => {
    setExportQuality("");
    handleUIUpdate("edit");
  }

  const handleExportQualitySelect = (quality) => {
    setExportQuality(quality);
  }

  if(exportQuality){
    return(
      <ShareVideo handleGoBack={handleGoBack} />
    )
  }

  return (
    <div className="w-full h-full bg-black">
      <div className="w-full px-4 py-5 absolute top-0 flex justify-center items-center">
        <button
          onClick={handleGoBack}
          className="absolute top-3 left-4 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] cursor-pointer rounded-full sm:hidden z-10"
        >
          <BackArrow />
        </button>
        <h2 className="text-white text-[20px] font-semibold text-center sm:text-left sm:text-2xl">
          Grandma
        </h2>
      </div>
      <div className="w-full h-full">
            <video className="w-full h-full">
                <source src=""/>
            </video>
      </div>
      <div className="w-fit absolute left-1/2 -translate-x-1/2 bottom-[34.5px]">
      <button onClick={handleRecording} className={`p-3 flex items-center gap-3 font-semibold rounded-full whitespace-nowrap ${isRecording? "bg-[#FFEEEE] text-[#EB5757]":"bg-[#EB5757] text-white"}`}>
            <span>
              {
                isRecording?
                <RecordRedIcon/>:
                <RecordIcon />
              }
            </span>
            <span>
              {isRecording?"Stop Recording":"Start Record"}</span>
          </button>
      </div>
      { showExportUI && 
        <ModalOverlay hideModal={hideExportUIModal}>
        <SelectExportQuality handleExportQualitySelect={handleExportQualitySelect} hideModal={hideExportUIModal}/>
      </ModalOverlay>
      }
    </div>
  );
};

export default RecordVideo;
