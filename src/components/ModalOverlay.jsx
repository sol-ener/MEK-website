import { useEffect, useRef } from "react";

const ModalOverlay = ({hideModal, children}) => {
    const parentElem = useRef();
  
    const hideOnOutsideModalClick = (e) => {
        e.stopPropagation();
        if(parentElem.current === e.target){
            hideModal();
        }
    } 

    useEffect(() => {
        document.body.style.overflow="hidden";

        return () => {
        document.body.style.overflow="auto";

        }
    },[])

    return(
        <div ref={parentElem} onClick={hideOnOutsideModalClick} className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur bg-[#21283C]/[0.48] z-20">
            {children}
        </div>
    )
}

export default ModalOverlay;