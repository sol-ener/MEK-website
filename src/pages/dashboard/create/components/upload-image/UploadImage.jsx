import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../../../context/app-context";
import { UserContext } from "../../../../../context/user-context";
import { aiAPI } from "../../../../../utils/api";
import FileUpload from "/src/assets/file-upload.svg?react";
import ProgressIcon from "/src/assets/progress-icon.svg?react";
import AddVideoIcon from "/src/assets/add-video.svg?react";
import { createPortal } from "react-dom";
import ModalOverlay from "/src/components/ModalOverlay";
import CloseIcon from "/src/assets/close-icon.svg?react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from 'buffer';

const awsUpload = async (file, email) => {
  const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_BUCKET_REGION;
  const ACCESS_KEY_ID = process.env.REACT_APP_BUCKET_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_BUCKET_SECRET_ACCESS_KEY;

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  const readFileAsBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(Buffer.from(event.target.result));
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  };

  const fileBuffer = await readFileAsBuffer(file);

  const params = {
    Bucket: S3_BUCKET,
    Key: `${email}?${file.name}`,
    Body: fileBuffer
  };

  try {
    const command = new PutObjectCommand(params);
    const upload = await s3Client.send(command);
    console.log("File uploaded successfully ===>>> ", upload);
    return file.name;
  } catch (err) {
    console.error("File upload failed ===>>> ", err);
    return false;
  }
}

const UploadImageWrapper = ({ handleUiUpdate }) => {
  const { currentImage, setCurrentImage, currentEmotion, setCurrentEmotion } = useContext(AppContext);
  const { email } = useContext(UserContext);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);

  useEffect(() => {
    console.log(currentEmotion);
  }, [currentEmotion])

  const onUpload = async (e) => {
    let uploadFile = '';
    setIsUploading(true);
    if (e.target && e.target.files[0]) {
      uploadFile = await awsUpload(e.target.files[0], email);
    }
    if(uploadFile) {
      setCurrentImage(uploadFile);
      const emotion = await emtionDetect(`${email}?${uploadFile}`);
      console.log(`${email}?${uploadFile}`, '>>>', emotion )
      handleUiUpdate("generate");
      setCurrentEmotion(emotion);
    } else {
      setIsUploading(false);
    }
  };

  const handleDisplayMobileUploadPopup = () => {
    setShowUploadPopUp(true);
  };

  const hideMobileUploadPopUp = () => {
    setShowUploadPopUp(false);
  };

  const emtionDetect = async (filename) => {
    try {
      const emotion = await aiAPI.post(
        '/emotion',
        {
          "filename": filename
        }
      )
      return emotion.data.message;
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="basis-[100%] h-full flex justify-center items-center sm:basis-[90%]">
      {/**Desktop */}
      <div className="max-w-[700px] p-8 w-[90%] bg-white rounded-2xl hidden sm:block">
        <h2 className="mb-4 text-[40px] font-bold leading-[50px] text-center">
          Ready to Meet
          <br />
          the person you love? ❤️
        </h2>
        <p className="mb-8 leading-[24px] text-[#5D6E7E]">
          Meet the Joss AI chat app revolutionizing conversations with the love
          ones.
        </p>
        <label
          htmlFor="file-upload"
          className="px-6 py-10 flex flex-col items-center bg-[#F4F5F9] rounded-xl"
        >
          {isUploading ? <UploadingUI /> : <UploadUI />}
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={onUpload}
            className="hidden"
          />
        </label>
      </div>
      {/*Mobile */}
      <div className="px-4 py-3 w-full flex flex-col justify-start items-start sm:hidden">
        <h3 className="text-sm text-[#5D6E7E] text-left">Welcome back 👋,</h3>
        <h1 className="font-semibold text-[20px] leading-[24px]">
          Amanda Hush
        </h1>
        <button
          htmlFor="file-upload"
          onClick={handleDisplayMobileUploadPopup}
          className="mt-4 p-4 w-full flex gap-2 items-center text-white bg-primary rounded-2xl shadow-[0_10px_10px_-6px] shadow-primary"
        >
          <div className="w-12 h-12 flex justify-center items-center rounded-full bg-white">
            <AddVideoIcon />
          </div>
          <div className="grow flex flex-col">
            <h2 className="text-base font-bold text-left whitespace-nowrap">Ready to talk with love? ❤️</h2>
            <p className="text-xs text-left">Make video from a photo with AI</p>
          </div>
        </button>
        {showUploadPopUp &&
          createPortal(
            <ModalOverlay hideModal={hideMobileUploadPopUp}>
              <MobileUploadPopUp hideModal={hideMobileUploadPopUp} onUpload ={onUpload} />
            </ModalOverlay>,
            document.body
          )}
      </div>
    </div>
  );
};

const MobileUploadPopUp = ({ hideModal, onUpload }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState('');

  const onImageUpload = (e) => {
    if (e.target && e.target.files[0]) {
      setFile(e);
      var reader = new FileReader();

      reader.onload = function (e) {
        setImageUrl(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    // setShowUploadedImage(true);
  };

  return (
    <div className="mx-4 p-6 w-[100%] bg-white rounded-2xl">
      <div className="w-full mb-5 flex justify-between items-center">
        <h2 className="text-[18px] leading-[22.68px] text-[#3A3F52] font-semibold">
          Upload Photo
        </h2>
        <CloseIcon className="cursor-pointer" onClick={hideModal} />
      </div>
      {imageUrl ? (
        <DisplayUploadedImage file={file} imageUrl={imageUrl} onUpload={onUpload} />
      ) : (
        <label className="py-10 flex flex-col items-center">
          <UploadUI />
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

const DisplayUploadedImage = ({file, imageUrl, onUpload}) => {
  return (
    <div className="mt-5">
      <div className="w-full aspect-[1.34] rounded-xl overflow-hidden">
        <img src={imageUrl} className="w-full h-full object-cover" alt="uploaded image" />
      </div>
      <button onClick={() => {onUpload(file)}} className="mt-5 py-3 w-full text-white bg-primary rounded-lg">Continue</button>
    </div>
  );
};

const UploadingUI = () => {
  return (
    <>
      <h3 className="mb-2 text-[#282A37] text-base font-semibold">
        Uploading Photo
      </h3>
      <p className="mb-4 text-sm leading-[18px] text-[#515978]">
        Waiting for your questionaire to Generate...
      </p>
      <div className="mt-4 relative flex justify-center">
        <ProgressIcon className="animate-spin-slow"/>
      </div>
    </>
  );
};

const UploadUI = () => {
  return (
    <>
      <div className="w-8 h-8 mb-[20px] sm:w-9 sm:h-9">
        <FileUpload className="w-full h-full" />
      </div>
      <h3 className="mb-[8px] w-full text-[#282A37] text-sm font-semibold text-center sm:text-base">
        Drag & Drop or <span className="text-primary">choose</span> file to
        upload
      </h3>
      <p className="text-sm leading-[18px] text-[#515978]">
        Select JPEG, PNG, WEBP file
      </p>
    </>
  );
};

export default UploadImageWrapper;
