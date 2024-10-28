import UploadImageWrapper from "./components/upload-image/UploadImage";
import GenerateVideo from "./components/generate-video/GenerateVideo";
import { useEffect, useState } from "react";
import RecentPhotos from "./components/recent/RecentPhotos";
import { useSearchParams, useNavigate } from "react-router-dom";

const Create = () => {
  const [currentUI, setCurrentUI] = useState("upload");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const ui = searchParams.get("ui");
    if (ui) {
      setCurrentUI(ui);
    }
    else {
      setCurrentUI("upload");
    }
  }, [searchParams])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])

  const handleUiUpdate = (UI) => {
    setCurrentUI(UI);
  }

  return (
    <div className="relative w-full h-full flex flex-wrap sm:flex-nowrap">
      <div className="relative grow sm:p-8">
        {currentUI === "upload" ? (
          <UploadImageWrapper handleUiUpdate={handleUiUpdate} />
        ) : currentUI === "generate" ? (
          <GenerateVideo handleUiUpdate={handleUiUpdate} />
        ) : (
          <h1>Nothing here</h1>
        )}
      </div>
      {currentUI !== "test-video" &&
        <div className={`p-4 w-full h-full bg-white grow-0 shrink-0 sm:w-[280px] sm:min-h-[calc(100%_-_0px)] sm:basis-[280px] ${currentUI === "generate" ? "hidden sm:block" : ""}`}>
          <h2 className="font-semibold text-left">Your Storage</h2>
          <RecentPhotos />
        </div>}
    </div>
  );
};

export default Create;
