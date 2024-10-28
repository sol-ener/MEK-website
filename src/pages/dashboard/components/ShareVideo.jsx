import CloseIcon from "/src/assets/close-icon.svg?react";
import CopyIcon from "/src/assets/copy-icon.svg?react";
import GoogleIcon from "/src/assets/google.svg?react";
import FacebookIcon from "/src/assets/facebook.svg?react";
import TwitterIcon from "/src/assets/twitter.svg?react";
import EmailIcon from "/src/assets/email-icon.svg?react";
import BackArrow from "/src/assets/back-arrow.svg?react";
import UploadedImage from "../../../assets/uploaded-image.jpg";

const ShareVideo = ({ hideModal, handleGoBack }) => {
  return (
    <div className="bg-white sm:w-[90%] sm:max-w-[600px] h-[calc(100%_-_80px)] overflow-auto sm:rounded-xl sm:h-fit">
      <div className="px-4 flex flex-col items-center sm:p-6">
        <div className="w-full py-5 relative sm:flex sm:justify-between sm:items-center sm:mb-5 sm:py-0">
          <button
            onClick={handleGoBack}
            className="absolute top-3 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden"
          >
            <BackArrow />
          </button>
          <h2 className="text-[20px] font-semibold text-center sm:text-left sm:text-2xl">
            Share video
          </h2>
          <CloseIcon
            className="hidden cursor-pointer sm:inline"
            onClick={hideModal}
          />
        </div>
        <div className="my-4 px-2 py-1 max-w-[167px] flex items-center gap-2 text-sm font-medium text-[#34A853] bg-[#34A853]/[0.08] rounded-full sm:mt-0 sm:mb-6">
          <span>
            <svg
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5L5.89546 10.2218C6.29054 10.6432 6.95946 10.6432 7.35454 10.2218L16 1"
                stroke="#34A853"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>Export successful</span>
        </div>

        <div className="w-[90%] max-w-[345px] aspect-[1.48] rounded-xl bg-share-image sm:max-w-[248px] sm:w-[80%]">
          <img
            src={UploadedImage}
            className="w-full h-full object-contain"
            alt="uploaded"
          />
        </div>
        <div className="mt-4 p-4 w-full flex justify-between rounded-lg bg-[#F4F5F9] sm:mt-5">
          <span>jossai.com/video108uasd8gy-das97</span>
          <span>
            <CopyIcon />
          </span>
        </div>
        <div>
          <h4 className="my-4 text-base text-center">Share to</h4>
          <div className="flex gap-2 flex-wrap">
            <div className="grow p-4 flex gap-3 rounded-lg border border-[#EFEFEF] sm:grow-0">
              <span>
                <GoogleIcon />
              </span>
              <span>Google</span>
            </div>
            <div className="grow p-4 flex gap-3 items-center rounded-lg border border-[#EFEFEF] sm:grow-0">
              <span>
                <EmailIcon />
              </span>
              <span>Email</span>
            </div>
            <div className="grow p-4 flex gap-3 rounded-lg border border-[#EFEFEF] sm:grow-0">
              <span>
                <FacebookIcon />
              </span>
              <span>Facebook</span>
            </div>
            <div className="grow p-4 flex gap-3 rounded-lg border border-[#EFEFEF] sm:grow-0">
              <span>
                <TwitterIcon />
              </span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareVideo;
