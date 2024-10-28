import { Link } from "react-router-dom";
import ForwardArrow from "/src/assets/forward-arrow.svg?react";
import MobFrame from "../../assets/mob-frame.png"
import ScreenDesign from "../../assets/screen-design.png"

const Overview = ({ handleScreenChange }) => {
    return (
        <div className="mx-auto pt-[31px] w-[95%]">
            <div className="px-[24px] relative h-[420px] overflow-hidden">
                <img className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[90%]" src={MobFrame} alt="frame" />
                <img className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%]" src={ScreenDesign} alt="design" />
            </div>
            <div className="py-4">
                <h1 className="mb-2 text-2xl font-semibold">
                    Generate Videos instantly with simple prompts
                </h1>
                <p>
                    Upload your photo and answer some questions to generate videos.
                </p>
            </div>
            <div className="mt-10 px-4 flex justify-between items-center">
                <Link to="/login" className="text-primary font-semibold">
                    Skip
                </Link>

                <button onClick={() => handleScreenChange("get-started")} className="flex justify-center items-center w-[56px] h-[56px] bg-primary rounded-full">
                    <ForwardArrow />
                </button>
            </div>
        </div>
    )
}

export default Overview;