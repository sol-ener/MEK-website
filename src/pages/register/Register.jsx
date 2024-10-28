import logo from "/logo.svg";
import api from "../../utils/api";
import EmailIcon from "../../assets/email-icon.svg?react";
import EyeIcon from "../../assets/eye-icon.svg?react";
import UserIcon from "../../assets/user-icon.svg?react";
import GoogleIcon from "../../assets/google.svg?react";
import AppleIcon from "../../assets/apple.svg?react";
import FacebookIcon from "../../assets/facebook.svg?react";
import TwitterIcon from "../../assets/twitter.svg?react";
import { isEmail } from "../../utils/validation";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setUsername, setEmail } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [])

  const togglePasswordDisplay = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormInput({
      ...formInput,
      [e.target.name]: value,
    });
  };

  const validateInputs = () => {

    let isValid = true;

    if (!formInput.username) {
      setUsernameError(true);
      setUsernameErrorMsg('Please fill out the name.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMsg('');
    }

    if (!formInput.email || !isEmail(formInput.email)) {
      setEmailError(true);
      setEmailErrorMsg('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }

    if(!formInput.password || formInput.password.length < 6) {
      setPasswordError(true);
      if(!formInput.password) {
        setPasswordErrorMsg('Please enter password');
      } else {
        setPasswordErrorMsg('Password must be at least 6 characters long');
      }
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMsg('');
    }

    return isValid;
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    if(validateInputs()) {
      api.post('users/signup', formInput)
        .then(res => {
          console.log(res.data);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
          setEmailError(true);
          setEmailErrorMsg('Email address already used, try with other email');
        })
    }
  }


  return (
    <div className="px-4 flex flex-col items-center w-screen max-w-[375px] text-black font-jakarta bg-white rounded-3xl sm:max-w-[500px] sm:p-8">
      <div className="w-[100px] h-[100px] hidden sm:block">
        <img src={logo} className="w-full h-full" alt="Vite logo" />
      </div>
      <h1 className="pt-8 pb-2 text-[32px] leading-8 font-bold">Hello there</h1>
      <h3 className="text-base ">
        Please enter your email & password to create an account.
      </h3>
      <form onSubmit={handleRegisterFormSubmit} className="mt-8 mb-4 w-full max-w-[375px] sm:w-[436px]">
        <div
          className={` w-full h-[56px] relative rounded-lg border  border-solid overflow-hidden ${formInput.username ? "border-primary" : "border-[#E3E9EE]"
            }`}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formInput.username}
            onChange={handleInputChange}
            className="p-4 pr-[45px] w-full h-full bg-[#F4F5F9] border-none outline-none"
          />
          <UserIcon className="absolute right-[16px] top-1/2 -translate-y-1/2" />
        </div>
        {usernameError && <p className="flex input-error">{usernameErrorMsg}</p>}
        <div
          className={`mt-4 w-full h-[56px] relative rounded-lg border  border-solid overflow-hidden ${formInput.email ? "border-primary" : "border-[#E3E9EE]"
            }`}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formInput.email}
            onChange={handleInputChange}
            className="p-4 pr-[45px] w-full h-full bg-[#F4F5F9] border-none outline-none"
          />
          <EmailIcon className="absolute right-[16px] top-1/2 -translate-y-1/2" />
        </div>
        {emailError && <p className="flex input-error">{emailErrorMsg}</p>}
        <div
          className={`mt-4 w-full h-[56px] relative rounded-lg border  border-solid overflow-hidden ${formInput.password ? "border-primary" : "border-[#E3E9EE]"
            }`}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formInput.password}
            onChange={handleInputChange}
            className="p-4 pr-[45px] w-full h-full bg-[#F4F5F9] border-none outline-none"
          />
          <EyeIcon
            onClick={togglePasswordDisplay}
            className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
        {passwordError && <p className="flex input-error">{passwordErrorMsg}</p>}
        <div className="mt-4 flex gap-[10px] items-center">
          <input
            type="checkbox"
            className="w-5 h-5 rounded-full bg-[#F5F5F5] border border-[#EFEFEF] border-solid focus:ring-0"
          />
          <p className="text-sm text-left">
            I agree to Joss AI{" "}
            <Link to="/register" className="font-semibold text-primary">
              Terms & Privacy Policy
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="w-full mt-8 mb-4 px-8 py-4 text-white bg-primary rounded-lg"
        >
          Register
        </button>
      </form>
      <div>
        <h4 className="mb-4 text-base">or continue with</h4>
        <div className="flex gap-1 xs:gap-4">
          <button className="p-4 border border-[#EFEFEF] rounded-lg xs:px-[24.88px] sm:px-[36.5px]">
            <GoogleIcon />
          </button>
          <button className="p-4 border border-[#EFEFEF] rounded-lg xs:px-[24.88px] sm:px-[36.5px]">
            <AppleIcon />
          </button>
          {/* <button className="p-4 border border-[#EFEFEF] rounded-lg xs:px-[24.88px] sm:px-[36.5px]">
            <FacebookIcon />
          </button>
          <button className="p-4 border border-[#EFEFEF] rounded-lg xs:px-[24.88px] sm:px-[36.5px]">
            <TwitterIcon />
          </button> */}
        </div>
        <p className="mt-8 text-base">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
