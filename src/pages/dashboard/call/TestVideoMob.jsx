import { useState } from "react";
import EditVideo from "./EditVideo";
import RecordVideo from "./RecordVideo";

const TestVideoMob = () => {
    const [currentUI, setCurrentUI] = useState("edit");

    const handleUIUpdate = (ui) => {
        setCurrentUI(ui);
    }

    return(
        <div className="h-[calc(100%_-_80px)] block backdrop-blur overflow-hidden bg-white z-20 sm:hidden">
            {
                currentUI === "record"?
                <RecordVideo handleUIUpdate={handleUIUpdate}/>:
                <EditVideo handleUIUpdate={handleUIUpdate}/>
            }
        </div>
    )
}

export default TestVideoMob;