import EditPen from "/src/assets/edit-pen.svg?react";
import ScreenMirror from "/src/assets/screenmirroring.svg?react";
import MicroPhone from "/src/assets/microphone.svg?react";
import MusicSquare from "/src/assets/music-square.svg?react";
import BgIcon from "/src/assets/bg-icon.svg?react";
import SelectVoice from "../components/SelectVoice";
import UploadedImage from "../../../assets/uploaded-image.jpg";
import { useState } from "react";

const EditVideo = ({ handleUIUpdate }) => {
  const [editUI, setEditUI] = useState("");

  const handleEditUIUpdate = (UIToUpdate) => {
    setEditUI(UIToUpdate);
  }

  const handleSynchronize = () => {
    handleUIUpdate("record");
  }

  if(editUI === "voice"){
    return <SelectVoice handleGoBack={() => handleEditUIUpdate("")}/>
  }

  return (
    <div className="h-[calc(100%_-_60px)] overflow-auto">
      <div className="px-4 py-5 flex justify-between items-center">
        <div className="flex ">
          <span className="mr-2 font-semibold">Grandma_1</span>
          <span>
            <EditPen />
          </span>
        </div>
        <button className="px-6 py-[10px] text-white bg-primary rounded-lg">
          Start Call
        </button>
      </div>
      <div className="p-4">
        <div className="w-full aspect-[1.48]">
          <img
            src={UploadedImage}
            className="w-full h-full object-cover rounded-xl"
            alt="uploaded"
          />
        </div>
        <div className="flex border-b border-[#ECECEC]">
          <button className="py-4 basis-[25%] w-[25%] aspect-[1.8] flex flex-col justify-center items-center gap-2 text-[#5D6E7E] border-none">
            <span>
              <ScreenMirror />
            </span>
            <span className="w-[90%] inline-block text-xs overflow-hidden  whitespace-nowrap text-ellipsis">
              Aspect Ratio
            </span>
          </button>
          <button onClick={() => handleEditUIUpdate("voice")} className="py-4 basis-[25%] w-[25%] flex flex-col justify-center items-center gap-2 text-[#5D6E7E] text-sm font-medium bg-white border-none">
            <span>
              <MicroPhone />
            </span>
            <span className="text-xs">Voice</span>
          </button>
          <button className="py-4 basis-[25%] w-[25%] flex flex-col justify-center items-center gap-2 text-[#5D6E7E] text-sm font-medium bg-white border-none">
            <span>
              <BgIcon />
            </span>
            <span className="w-[90%] inline-block text-xs overflow-hidden  whitespace-nowrap text-ellipsis">
              Background
            </span>
          </button>
          <button className="py-4 basis-[25%] w-[25%] flex flex-col justify-center items-center gap-2 text-[#5D6E7E] text-sm font-medium bg-white border-none">
            <span>
              <MusicSquare />
            </span>
            <span className="text-xs">Music</span>
          </button>
        </div>
        <div className="mb-4 py-4 border-b border-[#ECECEC] flex justify-between">
          <div className="flex flex-col items-start">
            <span className="text-sm text-[#5D6E7E] text-semibold">
              Emotions
            </span>
            <span className="px-2 py-1 text-xs text-primary rounded-lg bg-[#235DFF]/[0.08]">
              Happy
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm text-[#5D6E7E] text-semibold">
              Facial expressions
            </span>
            <span className="px-2 py-1 text-xs text-primary rounded-lg bg-[#235DFF]/[0.08]">
              Normal
            </span>
          </div>
        </div>
        <div className="py-4 border-t border-[#ECECEC]">
          <div className="mb-2 flex justify-between text-sm font-semibold">
            <h3 className="text-[#5D6E7E]">Questions</h3>
          </div>
          <ol className="flex flex-col gap-3 list-none min-w-[240px] w-full">
            <li className="p-3 bg-[#F4F5F9] rounded-lg text-xs">
              <h4 className="mb-2 font-medium text-[#5D6E7E]">
                1. What did they worked?
              </h4>
              <p className="pl-[15px] text-[#21283C] font-bold">
                Happy, serious
              </p>
            </li>
            <li className="p-3 bg-[#F4F5F9] rounded-lg text-xs">
              <h4 className="mb-2 font-medium text-[#5D6E7E]">
                2. How they spent their time
              </h4>
              <p className="pl-[15px] text-[#21283C] font-bold">
                Happy, serious
              </p>
            </li>
            <li className="p-3 bg-[#F4F5F9] rounded-lg text-xs">
              <h4 className="mb-2 font-medium text-[#5D6E7E]">
                3. What are their hobbies
              </h4>
              <p className="pl-[15px] text-[#21283C] font-bold">
                Happy, serious
              </p>
            </li>
          </ol>
        </div>
      </div>
      <div className="px-4 pt-4 w-full absolute bottom-0 bg-white ">
        <button onClick={handleSynchronize} className="inline-block py-3 w-full bg-primary text-sm font-semibold text-white rounded-lg">
          Synchronise Video
        </button>
      </div>
    </div>
  );
};


export default EditVideo;
