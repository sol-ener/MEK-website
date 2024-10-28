import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideNav from "./LeftSideNav";
import MainContent from "./MainContent";
import Header from "./Header";

const Dashboard = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/');
        }
    }, [])

    return (
        <div className="min-w-full min-h-screen">
            <Header />
            <div className="relative flex h-[calc(100%_-_78px)] overflow-hidden sm:overflow-visible">
                <LeftSideNav />
                <MainContent />
            </div>
        </div>
    )
}

export default Dashboard;