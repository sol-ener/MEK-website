import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestVideo from "./TestVideo";
import TestVideoMob from "./TestVideoMob";

const Call = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/');
        }
    }, [])

    return (
        <div className="w-full">
            <div className="hidden sm:block">
                <TestVideo />
            </div>
            <div className="fixed top-0 left-0 w-screen h-screen block backdrop-blur overflow-hidden bg-white z-5 sm:hidden">
                <TestVideoMob />
            </div>
        </div>
    )
}

export default Call;