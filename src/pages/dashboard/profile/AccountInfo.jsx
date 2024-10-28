import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/user-context";
import api from "../../../utils/api";
import UserIcon from "/src/assets/user-icon.svg?react";
import EnvelopeIcon from "/src/assets/email-icon.svg?react";
import { jwtDecode } from "jwt-decode";
import BackArrow from "/src/assets/back-arrow.svg?react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const { username, email, setUsername, avatar, setEmail, setUserAvartar } = useContext(UserContext);

  const [handleShowPlan] = useOutletContext();
  const [name, setName] = useState(username);

  const navigate = useNavigate();

  useEffect(() => {
    setName(username);
  }, [username, email])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleProfile = (e) => {
    e.preventDefault();
    const input = {
      name: name,
      email: email,
      avatar: avatar
    }
    if (name) {
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
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <div className="w-full text-[#21283C]">
      <div className="w-full py-5 relative sm:flex sm:justify-between sm:items-center sm:py-0">
        <Link
          to="/dashboard/profile"
          className="absolute top-3 left-4 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden"
        >
          <BackArrow />
        </Link>
        <h1 className="text-[20px] font-bold text-center sm:mb-6 sm:text-left sm:text-[32px] sm:leading-[40px]">
          Account Info
        </h1>
      </div>
      <form onSubmit={handleProfile} className="p-4 bg-white rounded-xl sm:p-6">
        <label className="mb-3 w-full inline-block font-semibold text-left">
          Username
        </label>
        <div className="relative">
          <input
            onChange={handleNameChange}
            type="text"
            value={name}
            className="py-[18.5px] w-full border-[#E3E9EE] bg-[#F4F5F9] rounded-lg outline-none"
          />
          <span className="absolute top-5 right-[21px]">
            <UserIcon />
          </span>
        </div>
        <label className="mt-4 mb-3 w-full inline-block font-semibold text-left">
          Email
        </label>
        <div className="mb-4-4 relative">
          <input
            type="email"
            value={email}
            className="py-[18.5px] w-full border-[#E3E9EE] bg-[#F4F5F9] rounded-lg outline-none"
          />
          <span className="absolute top-5 right-[21px]">
            <EnvelopeIcon />
          </span>
        </div>
        <label className="mt-6 mb-3 w-full inline-block font-semibold text-left">
          Account Plan
        </label>
        <div className="mb-6 sm:mb-4">
          <input
            type="text"
            value="Basic"
            className="py-[18.5px] w-full border-[#E3E9EE] bg-[#F4F5F9] rounded-lg outline-none"
          />
        </div>
        <div className="flex justify-between gap-[11px] sm:gap-0">
          <button
            type="button"
            onClick={() => handleShowPlan(true)}
            className="grow py-3 text-primary bg-white border-2 border-primary rounded-lg sm:grow-0 sm:px-8"
          >
            Change Plan
          </button>
          <button
            type="submit"
            className="grow py-3 text-white bg-primary rounded-lg sm:px-8 sm:grow-0 "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;
