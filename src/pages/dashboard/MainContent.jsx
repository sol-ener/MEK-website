import { Outlet } from "react-router-dom";

const MainContent = () => {
    return(
        <div className="basis-full min-h-full flex sm:justify-center  overflow-auto sm:items-center sm:overflow-visible sm:bg-[#F4F5F9]">
            <Outlet/>
        </div>
    )
}

export default MainContent;