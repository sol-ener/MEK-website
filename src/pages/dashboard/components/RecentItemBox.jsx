import PopupMenu from "../storage/PopupMenu";
import MoreIcon from "/src/assets/more-icon.svg?react";

const RecentItemBox = ({ title, imageUrl }) => {
  return (

    <div className="p-1 w-[165.5px] aspect-[1.1] border border-[#E3E9EE] box-border shadow-[0_2px_12px_0_rgba(255,255,255,0.14)] rounded-xl sm:w-[118px]">
      <div className="relative w-[157px] aspect-[1.33] sm:w-[110px] sm:aspect-[1.36]">
        <div className="p-0.5 w-full absolute flex justify-end">
          <PopupMenu className="p-[6px] bg-white rounded-md">
            <MoreIcon />
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
      <h2 className="mt-1 text-sm font-semibold text-[#21283C] sm:mt-2">{title}</h2>
    </div>
  );
};

export default RecentItemBox;
