import { useState } from "react";
import Overview from "./Overview";
import GetStarted from "./GetStarted";
import LoginOption from "./LoginOption";


const Cover = () => {
    const [currentScreen, setCurrentScreen] = useState("");

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    }

    return(
        <div className="w-screen h-screen overflow-x-hidden">
            {
                currentScreen === "get-started"?
                <GetStarted handleScreenChange={handleScreenChange} />:
                currentScreen === "login-options"?
                <LoginOption />:
                <Overview handleScreenChange={handleScreenChange}/>
            }
        </div>
    )
}

export default Cover;