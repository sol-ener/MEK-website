import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../hooks/userAuth";
// import { getData } from "../hook/useApp";


export const AppContext = createContext({
    storages: [],
    setStorages: (value) => { },
    currentCall: {},
    setCurrentCall: (value) => { },
    currentImage: "",
    setCurrentImage: (value) => { },
    currentEmotion: { },
    setCurrentEmotion: (value) => { },
});

const AppProvider = ({ children }) => {
    const [storages, setStorages] = useState([]);
    const [currentCall, setCurrentCall] = useState({});
    const [currentImage, setCurrentImage] = useState('');
    const [currentEmotion, setCurrentEmotion] = useState({
        angry: 0,
        disgust: 0,
        fear: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprise: 0
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser) {
                // const data = await getData();
                // if (data && data.length) {
                //     const tempFiles = [...data];
                //     setStorages(tempFiles);
                // }

                // const categories = await getCategory();
                // if (categories && categories.length) {
                //     const tempCatetories = [...categories];
                //     setCategoryList(tempCatetories);
                // }
            } else {
                // setFileList([]);
                // setCategoryList({});
            }
        };
        checkLoggedIn();
    }, [])

    return (
        <AppContext.Provider value={{ storages, setStorages, currentCall, setCurrentCall, currentImage, setCurrentImage, currentEmotion, setCurrentEmotion }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;