import { useState } from "react";
import ProIcon from "/src/assets/pro-icon.svg?react";
import RecentItemBox from "../../../components/RecentItemBox";
import { createPortal } from "react-dom";
import ModalOverlay from "../../../../../components/ModalOverlay";
import PlanModal from "../../../components/PlanModal";
import { useMediaQuery } from "react-responsive";
import NoPhotos from "../../../../../assets/no-photos.png"
import UploadedImage from "../../../../../assets/uploaded-image.jpg"

const initialData = [
  {
    id: "1",
    imageUrl: UploadedImage,
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "2",
    imageUrl: UploadedImage,
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "3",
    imageUrl: UploadedImage,
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
  {
    id: "4",
    imageUrl: UploadedImage,
    title: "Introduction 1",
    subTitle: "How to use some editing software in Premiere Pro",
    date: "Jul 24, 2023",
    time: "08:23",
    videoDuration: "00:48",
  },
];

const RecentPhotos = () => {
  const [photos, setPhotos] = useState(initialData);
  const isGreaterThanMobile = useMediaQuery({ query: '(min-width: 640px)' })
  const [showPlans, setShowPlan] = useState(false);

  const handleShowPlan = (shouldShow) => {
    setShowPlan(shouldShow);
  };

  return (
    <div className="relative top-0 bottom-0 my-4 h-[calc(100%_-_55px)] flex flex-col">
      {photos.length ? (
        <div className="grow">

          <ul className="w-fit flex gap-[10px] flex-wrap justify-center list-none">
            {photos.map(({ id, title, imageUrl }) => (
              <li key={id} className="max-h-[150px] sm:max-h-[123px]">
                <RecentItemBox id={id} title={title} imageUrl={imageUrl} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="grow flex flex-col items-center">
          <div className="w-[200px] h-[200px]">
            <img
              src={NoPhotos}
              className="w-full h-full object-contain"
              alt="on recent photos"
            />
          </div>
          <h2 className="text-[20px] leading-[20px] font-semibold text-[#21283C]">
            No photos yet
          </h2>
          <p className="text-sm text-[#5D6E7E]">your photos will shown here</p>
        </div>
      )}
      <div
        className="p-4 bg-primary/[0.08] rounded-2xl border-[1.5px] border-primary flex gap-4 flex-col
"
      >
        <div className="flex gap-4 items-center">
          <div>
            <ProIcon className="w-10 h-10" />
          </div>
          <div className="grow w-[150px] text-left text-[#21283C]">
            <h2 className="mb-1 font-bold">Upgrade to PRO</h2>
            <p className="text-xs">
              Enjoy all features & benefits without any restrictions.
            </p>
          </div>
        </div>
        <button onClick={handleShowPlan} className="py-3 w-full font-bold text-white bg-primary rounded-lg">
          Upgrade to Pro
        </button>
      </div>
      {showPlans &&
        createPortal(
          <>
            {isGreaterThanMobile ? (
              <ModalOverlay hideModal={() => handleShowPlan(false)}>
                <PlanModal hideModal={() => handleShowPlan(false)} />
              </ModalOverlay>
            ) : (
              <div className="fixed top-0 left-0 w-screen h-screen block backdrop-blur overflow-hidden bg-white z-20 sm:hidden">
                <PlanModal hideModal={() => handleShowPlan(false)} />
              </div>
            )}
          </>,
          document.body
        )
      }
    </div>
  );
};

export default RecentPhotos;
