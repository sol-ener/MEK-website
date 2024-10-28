import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VR = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/');
        }
    }, [])
    
    return (
        <div>
            VR
        </div>
    )
}

export default VR;