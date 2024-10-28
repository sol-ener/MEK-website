import { createContext, useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../../context/app-context";
import { getFileFromS3 } from "../../../../../utils/getFileFromS3";
import GenerateOnMobile from "../generate-on-mobile/GenerateOnMobile";
import EditPen from "/src/assets/edit-pen.svg?react";
import InfoIcon from "/src/assets/info-icon.svg?react";
import { createPortal } from "react-dom";
import ModalOverlay from "../../../../../components/ModalOverlay";
import CloseIcon from "/src/assets/close-icon.svg?react";
import ProgressIcon from "/src/assets/progress-icon.svg?react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../../context/user-context";

export const GenerateVideoContext = createContext({});

const GenerateVideo = ({ handleUiUpdate }) => {
  const { email } = useContext(UserContext);
  const { currentImage, setCurrentImage, currentEmotion } = useContext(AppContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewFile, setViewFile] = useState(null);
  const [mimeType, setMimeType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFileFromS3(currentImage, email, setViewFile, setMimeType);
  }, [currentImage])

  const handleVideoGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      navigate("/dashboard/call/1");
    }, 3000);
  };

  const hideModal = () => {
    setIsGenerating(false);
  };

  const handleClose = () => {
    handleUiUpdate('upload');
  }

  const renderMedia = () => {
    if (mimeType.startsWith('image/')) {
      return <img src={viewFile} alt="File" width="600" />;
    } else if (mimeType.startsWith('video/')) {
      return <video src={viewFile} controls width="600" />;
    } else {
      return <p>File type not supported for rendering.</p>;
    }
  };

  return (
    <div className="w-[95%] mx-auto rounded-2xl bg-white border border-[#E3E9EE] xl:w-[85.3%]">
      <div className="p-6 hidden sm:block">
        <h1 className="text-[40px] leading-[50px] font-bold">
          Ready to Meet
          <br />
          the person you love? ❤️
        </h1>
        <h3 className="mt-4 text-[#5D6E7E]">
          Meet the Joss AI chat app revolutionizing conversations with the love
          ones.
        </h3>
      </div>
      <div className="px-4 py-6 flex gap-4 border-y border-[#E3E9EE] lg:px-8 lg:gap-8">
        <div className="basis-[39%] w-[39%] hidden sm:block">
          <h3 className="text-base font-semibold text-black text-left">
            Photo Uploaded
          </h3>
          <div className="mx-auto sm:w-[80%] py-[39px]">
            <div className="mx-auto w-full aspect-1/1 rounded-xl overflow-hidden xl:w-[70%]">
              <img
                src={viewFile}
                className="w-full h-full object-contain"
                alt="uploaded"
              />
            </div>
          </div>
          <div className="text-left rounded-xl border border-[#ECECEC]">
            <div className="p-4 flex lg:px-6">
              <span className="mr-2 font-semibold">{currentImage}</span>
              {/* <span>
                <EditPen />
              </span> */}
            </div>
            <div className="p-4 flex justify-between border-y border-[#ECECEC] lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Angry
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.angry}
              </span>
            </div>
            <div className="p-4 flex justify-between lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Disgust
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.disgust}
              </span>
            </div>
            <div className="p-4 flex justify-between border-y border-[#ECECEC] lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Fear
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.fear}
              </span>
            </div>
            <div className="p-4 flex justify-between lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Happy
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.happy}
              </span>
            </div>
            <div className="p-4 flex justify-between border-y border-[#ECECEC] lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Neutral
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.neutral}
              </span>
            </div>
            <div className="p-4 flex justify-between lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Sad
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.sad}
              </span>
            </div>
            <div className="p-4 flex justify-between lg:px-6">
              <span className="text-sm text-[#5D6E7E] text-semibold">
                Surprise
              </span>
              <span className="px-2 py-1 inline-block text-sm text-primary rounded-lg bg-[#235DFF]/[0.08]">
                {currentEmotion.surprise}
              </span>
            </div>
          </div>
        </div>
        <div className="basis-[60%] w-[60%] hidden sm:block">
          <h3 className="flex gap-1">
            <span className="font-semibold">Questionaire</span>
            <span className="mt-1">
              <InfoIcon />
            </span>
          </h3>
          <div className="mt-3 p-4 w-full bg-[#F4F5F9] border border-[#E3E9EE] rounded-xl overflow-hidden">
            <ol className="pl-4 list-decimal font-semibold">
              <li className="pl-[10px]">
                <h4 className="font-semibold text-left">
                  What did they worked
                </h4>
                <div className="mt-2 mb-4 w-[100%] h-[96px]">
                  <textarea
                    className="p-3 w-full h-full text-sm font-normal text-[#5D6E7E] border-[#E3E9EE] rounded-lg resize-none"
                    placeholder="Write the answer here..."
                  ></textarea>
                </div>
              </li>
              <li className="pl-[10px]">
                <h4 className="font-semibold text-left">
                  How they spent their time
                </h4>
                <div className="mt-2 mb-4 w-[100%] h-[96px]">
                  <textarea
                    className="p-3 w-full h-full text-sm font-normal text-[#5D6E7E] border-[#E3E9EE] rounded-lg resize-none"
                    placeholder="Write the answer here..."
                  ></textarea>
                </div>
              </li>
              <li className="pl-[10px]">
                <h4 className="font-semibold text-left">
                  What are their hobbies
                </h4>
                <div className="mt-2 mb-4 w-[100%] h-[96px]">
                  <textarea
                    className="p-3 w-full h-full text-sm font-normal text-[#5D6E7E] border-[#E3E9EE] rounded-lg resize-none"
                    placeholder="Write the answer here..."
                  ></textarea>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="p-6 sm:block button-box">
        <button
          onClick={handleVideoGeneration}
          className="py-3 w-full rounded-lg bg-primary text-white mr-2"
        >
          Generate
        </button>
        <button
          onClick={handleClose}
          className="py-3 w-full rounded-lg bg-primary text-white ml-2"
        >
          Cancel
        </button>
      </div>
      {createPortal(
        <GenerateVideoContext.Provider value={{ setIsGenerating }}>
          <GenerateOnMobile handleUiUpdate={handleUiUpdate} />
        </GenerateVideoContext.Provider>,
        document.body
      )}
      {isGenerating &&
        createPortal(
          <ModalOverlay hideModal={hideModal}>
            <LoadingScreen hideModal={hideModal} />
          </ModalOverlay>,
          document.body
        )}
    </div>
  );
};

const LoadingScreen = ({ hideModal }) => {
  return (
    <div className="p-6 flex flex-col bg-white w-full max-w-[342px] rounded-2xl">
      <div className="mb-5 self-end">
        <CloseIcon
          className="hidden cursor-pointer sm:inline"
          onClick={hideModal}
        />
      </div>
      <div>
        <h2 className="mb-2 text-center font-semibold text-[20px] leading-[25.2px] text-[#282A37]">
          Please wait while ur AI made your video with magic
        </h2>
        <p className="text-center">Waiting for your video to Generate...</p>
      </div>
      <div className="mt-4 relative flex justify-center">
        <ProgressIcon className="animate-spin-slow" />
      </div>
    </div>
  );
};

export default GenerateVideo;
