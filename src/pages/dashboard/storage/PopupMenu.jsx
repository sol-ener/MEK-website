import { forwardRef, useCallback, useRef, useState } from "react";
import { usePopper } from "react-popper";
import EditVideoIcon from "/src/assets/edit-video.svg?react";
import EditMesage from "/src/assets/message-edit.svg?react";
import TrashIcon from "/src/assets/trash-icon.svg?react";
import ShareIcon from "/src/assets/share-icon.svg?react";
import DownloadIcon from "/src/assets/download-icon.svg?react";
import CopyIcon from "/src/assets/copy-icon.svg?react";
import useClickOutside from "../../../hooks/useClickOutside";

const PopupMenu = ({ children, ...props }) => {
  const parent = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right-end",
  });

  const hidePopUp = useCallback(() => {
    setShowPopup(false);
  }, []);

  useClickOutside(parent, hidePopUp);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div ref={parent}>
      <button ref={setReferenceElement} onClick={togglePopup} {...props}>
        {children}
      </button>
      {showPopup && (
        <Menu
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        />
      )}
    </div>
  );
};

const Menu = forwardRef(function Menu(props, ref) {
  return (
    <ul
      ref={ref}
      className="bg-white list-none border border-[#E3E9EE] rounded-2xl shadow[0_4px_16px_0_rgba(0,0,0,29)] z-20"
      {...props}
    >
      <li className="p-4 flex gap-4 border-b border-[#E3E9EE cursor-pointer">
        <span>
          <EditVideoIcon />
        </span>
        <span className="w-[123px] text-left font-semibold text-[#21283C]">
          Edit Video
        </span>
      </li>
      <li className="p-4 flex gap-4 border-b border-[#E3E9EE cursor-pointer">
        <span>
          <DownloadIcon />
        </span>
        <span className="w-[123px] text-left font-semibold text-[#21283C]">
          Download
        </span>
      </li>
      <li className="p-4 flex gap-4 border-b border-[#E3E9EE cursor-pointer">
        <span>
          <EditMesage />
        </span>
        <span className="w-[123px] text-left font-semibold text-[#21283C]">
          Rename
        </span>
      </li>
      <li className="p-4 flex gap-4 border-b border-[#E3E9EE cursor-pointer">
        <span>
          <ShareIcon />
        </span>
        <span className="w-[123px] text-left font-semibold text-[#21283C]">
          Share
        </span>
      </li>
      <li className="p-4 flex gap-4 border-b border-[#E3E9EE cursor-pointer">
        <span>
          <CopyIcon />
        </span>
        <span className="w-[123px] text-left font-semibold text-[#21283C]">
          Duplicate
        </span>
      </li>
      <li className="p-4 flex gap-4 cursor-pointer">
        <span>
          <TrashIcon />
        </span>
        <span className="w-[123px] text-[#F97267]] text-left font-semibold text-[#21283C]">
          Delete
        </span>
      </li>
    </ul>
  );
});

export default PopupMenu;
