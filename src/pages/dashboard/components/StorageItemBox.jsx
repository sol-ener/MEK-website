import PopupMenu from "../storage/PopupMenu";
import MoreIcon from "/src/assets/more-icon.svg?react";

const StorageItemBox = ({ videoDuration, title, imageUrl }) => {
  return (
    <div className="p-2 bg-white rounded-xl">
      <div className="relative w-[149.5px] aspect-[1.4] sm:w-[229.6px] sm:aspect-[1.09]">
        <div className="p-0.5 w-full absolute flex justify-between">
          <span className="p-1 text-sm font-medium text-[#5D6E7E] rounded-md bg-white">
            {videoDuration}
          </span>

          <PopupMenu className="p-[6px] bg-white rounded-md">
            <MoreIcon className="pointer-events-none" />
          </PopupMenu>
        </div>
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt={title}
          />
        </div>
      </div>
      <h2 className="mt-2 text-sm font-semibold text-[#21283C]">{title}</h2>
    </div>
  );
};

export default StorageItemBox;
