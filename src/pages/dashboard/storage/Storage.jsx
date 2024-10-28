import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GridIcon from "/src/assets/grid-icon.svg?react";
import ListIcon from "/src/assets/list-icon.svg?react";
import StorageItemBox from "../components/StorageItemBox";
import StorageListItem from "../components/StorageListItem";
import UploadedImage from "../../../assets/uploaded-image.jpg"

const storageItems = [
  {
    id: "1",
    imageUrl: {UploadedImage},
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "2",
    imageUrl: {UploadedImage},
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "3",
    imageUrl: {UploadedImage},
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "4",
    imageUrl: {UploadedImage},
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "5",
    imageUrl: {UploadedImage},
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "6",
    imageUrl: {UploadedImage},
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
];

const Storage = () => {
  const [storageView, setStorageView] = useState("grid");
  const [activeTab, setActiveTab] = useState("save");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])

  const handleStorageView = (view) => {
    setStorageView(view);
  };

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="w-full h-full bg-[#f4f5f9] sm:p-8">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center">
        <h2 className="p-4 text-[32px] leading-[40px] font-semibold text-left sm:p-0 sm:text-center">
          Storage
        </h2>
        <div className="flex gap-2 flex-col-reverse sm:flex-row sm:gap-6">
          <div className="px-4 flex gap-4 justify-between sm:m-2">
            <div className="text-[#5D6E7E] flex sm:hidden">
              <span>5</span>
              <span>Videos</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleStorageView("list")}>
                <ListIcon className="w-4 h-4 sm:w-[23px] sm:h-[23px]" />
              </button>
              <button onClick={() => handleStorageView("grid")}>
                <GridIcon className="w-4 h-4 sm:w-[23px] sm:h-[23px]" />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleTabChange("save")}
              className={`grow px-4 py-2 text-sm font-bold border-b sm:rounded-lg sm:grow-0 sm:border-b-0 ${
                activeTab === "save"
                  ? "border-primary text-primary sm:text-white sm:bg-primary"
                  : "sm:bg-white"
              }`}
            >
              Save
            </button>
            <button
              onClick={() => handleTabChange("cloud")}
              className={`grow px-4 py-2 text-sm font-bold border-b sm:rounded-lg sm:grow-0 sm:border-b-0 ${
                activeTab === "cloud"
                  ? "border-primary text-primary sm:text-white sm:bg-primary"
                  : "sm:bg-white"
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => handleTabChange("draft")}
              className={`grow px-4 py-2 text-sm font-bold border-b sm:rounded-lg sm:grow-0 sm:border-b-0 ${
                activeTab === "draft"
                  ? "border-primary text-primary sm:text-white sm:bg-primary"
                  : "sm:bg-white"
              }`}
            >
              Draft
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 px-[10px] sm:mt-8 sm:p-0">
        {storageView === "list" ? (
          <>
            {activeTab === "save" ? (
              <ListView storageItems={storageItems} />
            ) : activeTab === "cloud" ? (
              <ListView storageItems={storageItems} />
            ) : activeTab === "draft" ? (
              <ListView storageItems={storageItems} />
            ) : null}
          </>
        ) : (
          <>
            {activeTab === "save" ? (
              <GridView storageItems={storageItems} />
            ) : activeTab === "cloud" ? (
              <GridView storageItems={storageItems} />
            ) : activeTab === "draft" ? (
              <GridView storageItems={storageItems} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

const GridView = ({ storageItems }) => {
  return (
    <ul className="w-fit h-[calc(100%_-_196px)] flex gap-[10px] justify-center flex-wrap list-none sm:h-full sm:justify-start">
      {storageItems.map((props) => (
        <li key={props.id}>
          <StorageItemBox {...props} />
        </li>
      ))}
    </ul>
  );
};

const ListView = ({ storageItems }) => {
  return (
    <ul className="h-[calc(100%_-_196px)] flex flex-col gap-5 justify-center list-none sm:justify-start sm:h-full">
      {storageItems.map((props) => (
        <li key={props.id}>
          <StorageListItem {...props} />
        </li>
      ))}
    </ul>
  );
};

export default Storage;
