import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/user-context";
import { getFileFromS3 } from "../../../utils/getFileFromS3";
import UserSquareIcon from "/src/assets/user-square.svg?react";
import api from "../../../utils/api";
import RightActiveArrowIcon from "/src/assets/right-active-arrow.svg?react";
import RightArrowIcon from "/src/assets/right-arrow.svg?react";
import WalletIcon from "/src/assets/wallet-icon.svg?react";
import LockIcon from "/src/assets/lock-icon.svg?react";
import HelpIcon from "/src/assets/help-icon.svg?react";
import LogoutIcon from "/src/assets/logout.svg?react";
import ProIcon from "/src/assets/pro-icon.svg?react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useContext } from "react";
import ModalOverlay from "../../../components/ModalOverlay";
import PlanModal from "../components/PlanModal";
import { jwtDecode } from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from 'buffer';
import { aiAPI } from "../../../utils/api";

const awsUpload = async (file, email) => {
  const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_BUCKET_REGION;
  const ACCESS_KEY_ID = process.env.REACT_APP_BUCKET_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_BUCKET_SECRET_ACCESS_KEY;

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  const readFileAsBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(Buffer.from(event.target.result));
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  };

  const fileBuffer = await readFileAsBuffer(file);

  const params = {
    Bucket: S3_BUCKET,
    Key: `${email}?${file.name}`,
    Body: fileBuffer
  };

  try {
    const command = new PutObjectCommand(params);
    const upload = await s3Client.send(command);
    console.log("File uploaded successfully ===>>> ", upload);
    return file.name;
  } catch (err) {
    console.error("File upload failed ===>>> ", err);
    return false;
  }
}

const Profile = () => {
  const isGreaterThanMobile = useMediaQuery({ query: '(min-width: 640px)' })
  const [showPlans, setShowPlan] = useState(false);
  const [viewFile, setViewFile] = useState(null);
  const { setEmail, setUsername, setUserAvartar, username, userAvatar, email } = useContext(UserContext);
  const [mimeType, setMimeType] = useState('');
  const [avatarStatus, setAvatarStatus] = useState(false);
  const [newAvatar, setNewAvatar] = useState('');

  const navigate = useNavigate();
  const { pathname: currentRoute } = useLocation();

  useEffect(() => {
    if (isGreaterThanMobile) {
      navigate("/dashboard/profile/account-info");
    }
  }, [isGreaterThanMobile, navigate])

  useEffect(() => {
    if (userAvatar) {
      getFileFromS3(userAvatar, email, setViewFile, setMimeType);
    }
  }, [userAvatar])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])

  const onUpload = async (e) => {
    let uploadFile = '';
    if (e.target && e.target.files[0]) {
      uploadFile = await awsUpload(e.target.files[0], email);
    }
    if (uploadFile) {
      setAvatarStatus(true);
      setNewAvatar(e.target.files[0].name);
      getFileFromS3(e.target.files[0].name, email, setViewFile, setMimeType);
    }
  };

  const handleShowPlan = (shouldShow) => {
    setShowPlan(shouldShow);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('storage');
    setEmail('');
    setUsername('');
    navigate('/');
  }

  const handleCancel = () => {
    setAvatarStatus(false);
    setNewAvatar('');
    getFileFromS3(userAvatar, email, setViewFile, setMimeType);
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log(newAvatar)
    const input = {
      name: username,
      email: email,
      avatar: newAvatar
    }
    const token = localStorage.getItem('user');
    api.post(
      'users/profile',
      input,
      {
        headers: {
          'Authorization': `Bearer ${token.replace(/"/g, '')}`,
        },
      }
    )
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.authToken));
        setEmail(jwtDecode(res.data.authToken).user.email);
        setUsername(jwtDecode(res.data.authToken).user.username);
        setUserAvartar(jwtDecode(res.data.authToken).user.avatar);
        console.log(jwtDecode(res.data.authToken).user);
      })
      .catch(err => {
        console.log(err);
      })
    setAvatarStatus(false);
    setNewAvatar('');
  }

  const onTest = () => {
    aiAPI.post(
      '/emotion',
      {
        "filename": "conrad.anderson75926@gmail.com?Ronny.jpg"
      }
    )
      .then(res => {
        console.log(res.data);
      })
    // https://1685-34-196-129-223.ngrok-free.app
  }

  return (
    <div className="w-full h-[calc(100%_-_78px)] flex gap-8 text-[#21283C] bg-white sm:bg-[#f4f5f9] sm:h-full sm:p-8">
      <div className="px-4 py-2 basis-full sm:basis-[30.5%]">
        <h1 className="p-4 text-2xl font-bold leading-[40px] text-left sm:mb-6 sm:text-[32px] sm:p-0 sm:leading-[40px]">
          Profile
        </h1>
        <div className="flex items-center gap-x-4 bg-white rounded-xl sm:p-6 sm:flex-col">
          <label
            htmlFor="file-upload"
            className="cursor-pointer w-[70px] h-[70px] rounded-full overflow-hidden sm:w-[100px] sm:h-[100px]"
          >
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden sm:w-[100px] sm:h-[100px]">
              {
                avatarStatus ?
                  <img
                    src={viewFile}
                    className="w-full h-full object-cover"
                    alt="user profile"
                  />
                  :
                  userAvatar ?
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
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={onUpload}
              className="hidden"
            />
          </label>
          {
            avatarStatus &&
            <div>
              <button onClick={handleCancel} className="text-white bg-primary rounded-lg avatar-cancel avatar-btn">Cancel</button>
              <button onClick={handleSave} className="text-white bg-primary rounded-lg avatar-save avatar-btn">Save</button>
            </div>
          }
          <div className="grow flex-col sm:flex-row">
            <div className="mb-2 flex items-center gap-3 sm:mb-6">
              <h2 className="text-sm font-semibold sm:text-2xl">{username}</h2>
              <span className="px-1 py-0.5 border-2 border-primary rounded-md text-[10px] sm:text-base">
                {
                  localStorage.getItem('user') && 
                  jwtDecode(localStorage.getItem('user')).user.plan ?
                    jwtDecode(localStorage.getItem('user')).user.plan
                    :
                    'Basic'
                }
              </span>
            </div>
            <div className="grow sm:w-[352px]">
              <div className="flex justify-between text-sm text-[#5D6E7E]">
                <span>Cloud Storage</span>
                <span>567 MB/2048 MB</span>
              </div>
              <div></div>
            </div>
          </div>

        </div>
        <div className="flex flex-col-reverse sm:flex-col">
          <ul className="mt-3 w-full flex flex-col gap-2 list-none sm:mt-6">
            <li className="w-full">
              <NavLink
                to="/dashboard/profile/account-info"
                className={({ isActive }) =>
                  `w-full p-4 flex items-center gap-4 font-semibold border cursor-pointer rounded-xl ${isActive
                    ? "text-primary border-primary bg-primary/[0.08]"
                    : "border-[#E3E9EE] bg-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>
                      {isActive ? <UserSquareIcon /> : <UserSquareIcon />}
                    </span>
                    <span className="grow text-left">Account Info</span>
                    <span>
                      {isActive ? <RightActiveArrowIcon /> : <RightArrowIcon />}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="w-full">
              <button onClick={handleShowPlan} className="w-full p-4 flex items-center gap-4 font-semibold border cursor-pointer rounded-xl border-[#E3E9EE] bg-white">
                <span>
                  <WalletIcon />
                </span>
                <span className="grow text-left"> Payment Method</span>
                <span><RightArrowIcon /></span>
              </button>
            </li>
            <li onClick={onTest} className="w-full">
              <div className="w-full p-4 flex items-center gap-4 font-semibold border cursor-pointer rounded-xl border-[#E3E9EE] bg-white">
                <span>
                  <LockIcon />
                </span>
                <span className="grow text-left">Security</span>
                <span><RightArrowIcon /></span>
              </div>
            </li>
            <li className="w-full">
              <NavLink
                to="/dashboard/profile/help-center"
                className={({ isActive }) =>
                  `w-full p-4 flex items-center gap-4 font-semibold border cursor-pointer rounded-xl ${isActive
                    ? "text-primary border-primary bg-primary/[0.08]"
                    : "border-[#E3E9EE] bg-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>
                      {isActive ? <HelpIcon /> : <HelpIcon />}
                    </span>
                    <span className="grow text-left">Help Center</span>
                    <span>
                      {isActive ? <RightActiveArrowIcon /> : <RightArrowIcon />}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li onClick={logout} className="w-full">
              <div className="w-full p-4 flex items-center gap-4 font-semibold border cursor-pointer rounded-xl border-[#E3E9EE] text-[#F97267] bg-white">
                <span>
                  <LogoutIcon />
                </span>
                <span>Logout</span>
              </div>
            </li>
          </ul>
          <button onClick={handleShowPlan} className="p-4 flex gap-4 items-center text-white bg-primary rounded-2xl sm:mt-6">
            <div>
              <ProIcon />
            </div>
            <div className="grow">
              <h3 className="mb-1 text-[20px] leading-[30px] font-bold text-left">Upgrade to PRO</h3>
              <p className="text-xs font-normal text-left">Enjoy all features & benefits without any restrictions.</p>
            </div>
          </button>
        </div>

      </div>
      <div className="basis-[64.5%] hidden sm:block">
        <Outlet context={[handleShowPlan]} />
      </div>
      {currentRoute !== "/dashboard/profile" && createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen block backdrop-blur overflow-hidden bg-white z-20 sm:hidden">
          <Outlet context={[handleShowPlan]} />
        </div>, document.body)}
      {showPlans &&
        createPortal(
          <>
            {isGreaterThanMobile ? (
              <ModalOverlay hideModal={() => handleShowPlan(false)}>
                <PlanModal hideModal={() => handleShowPlan(false)} />
              </ModalOverlay>
            ) : (
              <div className="fixed top-0 left-0 w-screen h-screen block backdrop-blur overflow-hidden bg-white z-20 sm:hidden">
                <PlanModal hideModal={() => handleShowPlan(false)} />
              </div>
            )}
          </>,
          document.body
        )}
    </div>
  );
};

export default Profile;
