import EditPen from "/src/assets/edit-pen.svg?react";
import RecordIcon from "/src/assets/record-icon.svg?react";
import ScreenMirror from "/src/assets/screenmirroring.svg?react";
import MicroPhone from "/src/assets/microphone.svg?react";
import MusicSquare from "/src/assets/music-square.svg?react";
import BgIcon from "/src/assets/bg-icon.svg?react";
import ExportIcon from "/src/assets/export.svg?react";
import BackArrow from "/src/assets/back-arrow.svg?react";
import SelectVoice from "../components/SelectVoice";
import { useState } from "react";
import RecordRedIcon from "/src/assets/record-red-icon.svg?react";
import ShareVideo from "../components/ShareVideo";
import { createPortal } from "react-dom";
import ModalOverlay from "../../../components/ModalOverlay";
import SelectExportQuality from "../components/SelectExportQuality";
import UploadedImage from "../../../assets/uploaded-image.jpg"
import { useNavigate } from "react-router-dom";

const TestVideo = () => {
  const [showModal, setShowModal] = useState("");
  const navigate = useNavigate();

  const handleDisplayModal = (modalName) => {
    setShowModal(modalName);
  };

  const hideModal = () => {
    setShowModal("");
  };

  const handleBackButton = () => {
    navigate("/dashboard/create?ui=generate")
  };

  const handleExportQualitySelect = (selectedQuality) => {
    console.log(selectedQuality);
    handleDisplayModal("share");
  };

  return (
    <div className="relative grow sm:p-8">
      <div className="flex gap-8 flex-wrap-reverse lg:flex-nowrap">
        <div className="basis-full flex flex-col gap-6 lg:basis-[25%] flex-nowrap">
          <div className="text-left hidden sm:block">
            <button
              onClick={handleBackButton}
              className="px-8 py-[11.5px] flex gap-[15px] items-center rounded-lg bg-white text-sm font-semibold"
            >
              <BackArrow />
              <span>Back</span>
            </button>
          </div>
          <div className="text-left bg-white rounded-xl border border-[#ECECEC]">
            <div className="px-6 py-4 flex">
              <span className="mr-2 font-semibold">Grandma Paul</span>
              <span>
                <EditPen />
              </span>
            </div>
            <div className="w-full px-6 py-4 flex justify-between border-y border-[#ECECEC]">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Emotions
              </span>
              <span className="px-2 py-1 inline-block text-xs text-primary rounded-lg bg-[#235DFF]/[0.08]">
                Happy
              </span>
            </div>
            <div className="w-full px-6 py-4 flex justify-between">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Facial expressions
              </span>
              <span className="px-2 py-1 inline-block text-xs text-primary rounded-lg bg-[#235DFF]/[0.08]">
                Normal
              </span>
            </div>
            <div className="px-6 py-4 border-t border-[#ECECEC]">
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <h3 className=" text-[#5D6E7E]">Questions</h3>
                <div className="text-primary">
                  <span></span>
                  <span>Edit</span>
                </div>
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
          <div className="w-full">
            <button className="py-3 w-full border border-[#EB5757] text-[#EB5757] text-sm font-semibold rounded-lg">
              Delete
            </button>
          </div>
        </div>
        <div className="basis-full lg:basis-[79.5%]">
          <DesktopVideoUI handleDisplayModal={handleDisplayModal} />
        </div>
      </div>
      {showModal
        ? createPortal(
            <ModalOverlay hideModal={hideModal}>
              {showModal === "export" ? (
                <SelectExportQuality
                  hideModal={hideModal}
                  handleExportQualitySelect={handleExportQualitySelect}
                />
              ) : showModal === "share" ? (
                <ShareVideo hideModal={hideModal} />
              ) : showModal === "voice" ? (
                <SelectVoice hideModal={hideModal} />
              ) : null}
            </ModalOverlay>,
            document.body
          )
        : null}
    </div>
  );
};

const DesktopVideoUI = ({ handleDisplayModal }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecording = () => {
    setIsRecording(!isRecording);
  };
  return (
    <div className="flex-col gap-6 hidden sm:flex">
      <div className="w-full p-6 bg-white">
        <div className="mb-8 w-full aspect-[1.8] bg-black rounded-xl">
          <img
            src={UploadedImage}
            className="w-full h-full object-contain"
            alt="uploaded"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleRecording}
            className={`p-3 flex items-center gap-3 font-semibold rounded-full whitespace-nowrap ${isRecording? "bg-[#FFEEEE] text-[#EB5757]":"bg-[#EB5757] text-white"}`}
          >
            <span>{isRecording ? <RecordRedIcon /> : <RecordIcon />}</span>
            <span>{isRecording ? "Stop Recording" : "Start Record"}</span>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-left text-sm font-semibold text-[#21283C]">
          Record Settings
        </h3>
        <div className="my-2 flex gap-2">
          <button className="px-4 basis-[20%] aspect-[1.8] flex flex-col justify-center items-center gap-2 text-sm font-medium bg-white border-none">
            <span>
              <ScreenMirror />
            </span>
            <span>Aspect Ratio</span>
            <span className="text-[#5D6E7E]">16:9</span>
          </button>
          <button
            onClick={() => handleDisplayModal("voice")}
            className="p-4 basis-[20%] flex flex-col justify-center items-center gap-2  text-sm font-medium bg-white border-none"
          >
            <span>
              <MicroPhone />
            </span>
            <span>Voice</span>
            <span className="text-[#5D6E7E]">English (USA)</span>
          </button>
          <button className="p-4 basis-[20%] flex flex-col justify-center items-center gap-2  text-sm font-medium bg-white border-none">
            <span>
              <BgIcon />
            </span>
            <span>Background</span>
            <span className="text-[#5D6E7E]">None</span>
          </button>
          <button className="p-4 basis-[20%] flex flex-col justify-center items-center gap-2  text-sm font-medium bg-white border-none">
            <span>
              <MusicSquare />
            </span>
            <span>Music</span>
            <span>None</span>
          </button>
          <button
            onClick={() => handleDisplayModal("export")}
            className="p-4 basis-[20%] flex flex-col justify-center items-center gap-2  text-sm font-medium bg-white border-none"
          >
            <span>
              <ExportIcon />
            </span>
            <span>Export Quality</span>
            <span className="text-[#5D6E7E]">1080p</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestVideo;
