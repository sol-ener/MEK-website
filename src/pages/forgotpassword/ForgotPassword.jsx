import logo from "/logo.svg";
import api from "../../utils/api";
import EmailIcon from "../../assets/email-icon.svg?react";
import { useState, useEffect } from "react";
import { isEmail } from "../../utils/validation";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(true);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [formInput, setFormInput] = useState({
    email: "",
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormInput({
      ...formInput,
      [e.target.name]: value
    })
  }

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    if(validateInputs()) {
      setEmailError(false);
      setEmailErrorMsg('');
      const user = {
        email: formInput.email,
      };

      api.post('users/forgotPassword', user)
        .then(res => {
          if (res.data.success) {
            alert("You will receive an email to reset your password, if your email is a valid account in our system. If you don't see an email in your inbox, please check your spam folder as well");
            navigate('/');
          } else {
            alert("Incorrect Email. Try again with correct Credential");
          }
        })
        .catch(err => {
          console.log(err);
          alert("Incorrect Email. Try again with correct Credential");
        })
    }
  }

  const validateInputs = () => {

    let isValid = true;

    if (!formInput.email || !isEmail(formInput.email)) {
      setEmailError(true);
      setEmailErrorMsg('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }

    return isValid;
  };

  return (
    <div className="px-3 flex flex-col items-center w-screen max-w-[375px] text-black font-jakarta bg-white rounded-3xl sm:max-w-[500px] sm:p-8">
      <div className="w-[100px] h-[100px] hidden sm:block">
        <img src={logo} className="w-full h-full" alt="Vite logo" />
      </div>
      <h1 className="pt-8 pb-2 text-[32px] leading-8 font-bold">
        Welcome back
      </h1>
      <h3 className="text-base">
        Please enter your email to reset the password.
      </h3>
      <form onSubmit={handleLoginFormSubmit} className="mt-8 mb-4 w-full max-w-[375px] sm:w-[436px]">
        <div className={`w-full h-[56px] relative rounded-lg border  border-solid overflow-hidden ${formInput.email ? "border-primary" : "border-[#E3E9EE]"}`}>
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
        <button
          type="submit"
          className="w-full mt-8 mb-4 px-8 py-4 text-white bg-primary rounded-lg"
        >
          Forgot Password
        </button>
      </form>
      <div>
        <p className="mt-8 text-base">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
