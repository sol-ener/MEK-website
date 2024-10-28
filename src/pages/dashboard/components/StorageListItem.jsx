import PopupMenu from "../storage/PopupMenu";
import MoreIcon from "/src/assets/more-icon.svg?react";

const StorageListItem = ({videoDuration, imageUrl, title, subTitle, date, time}) => {
    return(
        <div  className="p-2 h-[100px] flex gap-4 items-stretch list-none bg-white rounded-xl sm:h-auto">
             <div className="relative basis-[100px] w-[100px] aspect-[1.56] rounded-lg overflow-hidden">
              <span className="px-1 py-0.5 absolute top-0.5 left-0.5 text-[9px] leading-[11px] rounded-md bg-white">
                {videoDuration}
              </span>
              <div className="w-full h-full">
                <img
                  src={imageUrl}
                  className="w-full h-full object-cover"
                  alt={title}
                />
              </div>
            </div>
            <div className="max-w-[180px] flex flex-col justify-between sm:items-start sm:max-w-none sm:grow">
              <h2 className="text-sm font-bold text-[#21283C] line-clamp-2 text-left sm:text-center sm:line-clamp-none">
                {title} - {subTitle}
              </h2>
              <span className="flex justify-between">
              <span className="text-xs font-medium text-[#5D6E7E]">
                {date}-{time}
              </span>
              <PopupMenu className="flex items-end cursor-pointer sm:hidden">
              <MoreIcon className="pointer-events-none"/>
            </PopupMenu>
              </span>
            </div>
            <PopupMenu className="hidden items-end cursor-pointer sm:flex">
              <MoreIcon />
            </PopupMenu>
        </div>
    )
}
export default StorageListItem;