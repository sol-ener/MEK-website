import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "/src/assets/menu-bar.svg?react";
import { getFileFromS3 } from "../../utils/getFileFromS3";
import { FaUser } from "react-icons/fa";
import logo from "/logo.svg";
import { UserContext } from "../../context/user-context";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const { email, username, userAvatar } = useContext(UserContext);
  const [viewFile, setViewFile] = useState(null);
  const [mimeType, setMimeType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    if (userAvatar) {
      getFileFromS3(userAvatar, email, setViewFile, setMimeType);
    }
  }, [userAvatar])

  return (
    <header className="items-center w-full pr-6 py-4 bg-white hidden sm:flex">
      <div className="px-8 ">
        <div className="relative w-10 h-10 bg-[#F4F5F9] rounded-full border border-solid border-[#E3E9EE]">
          <MenuBar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1" />
          <MenuBar className="absolute top-1/2 left-1/2 -translate-x-1/2" />
          <MenuBar className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1" />
        </div>
      </div>
      <div className="ml-6 flex items-center basis-11/12 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="text-2xl leading-[28.8px] font-zenDots">Joss AI</h1>
        </div>
        <div>
          <div></div>
          <div className="flex gap-2 items-center">
            <div>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {userAvatar ?
                  <img
                    src={viewFile}
                    className="w-full h-full object-cover"
                    alt="user profile"
                  />
                  :
                  <FaUser
                    className="w-full h-full object-cover"
                    alt="user profile"
                  />
                }
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-[#21283C]">{username}</span>
                <span className="px-1 text-primary font-medium rounded-md border-2 border-primary">
                  {
                    localStorage.getItem('user') && 
                    jwtDecode(localStorage.getItem('user')).user.plan ?
                      jwtDecode(localStorage.getItem('user')).user.plan
                      :
                      'Basic'
                  }
                </span>
              </div>
              <div className="text-left text-xs leading-[18px] text-[#5D6E7E]">
                {email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
