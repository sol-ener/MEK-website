import { useEffect } from "react";

const useClickOutside = (parentElem, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (parentElem.current && !parentElem.current.contains(e.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [parentElem, onOutsideClick]);
};

export default useClickOutside;
