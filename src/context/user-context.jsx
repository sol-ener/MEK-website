import { createContext, useEffect, useState } from "react"
import { isAuthenticated } from "../hooks/userAuth";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({
    username: "",
    email: "",
    userAvatar: "",
})

const UserProvider = ({children}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userAvatar, setUserAvartar] = useState('');

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser) {
                setUsername(jwtDecode(cuser).user.username);
                setEmail(jwtDecode(cuser).user.email);
                setUserAvartar(jwtDecode(cuser).user.avatar);
            } else {
                setUsername("");
                setEmail("");
                setUserAvartar('');
            }
        };
        checkLoggedIn();
    }, [])

    return(
        <UserContext.Provider value={{username, email, userAvatar, setUsername, setEmail, setUserAvartar }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;