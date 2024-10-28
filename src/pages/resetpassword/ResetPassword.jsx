import logo from "/logo.svg";
import api from "../../utils/api";
import EyeIcon from "../../assets/eye-icon.svg?react";
import GoogleIcon from "../../assets/google.svg?react";
import AppleIcon from "../../assets/apple.svg?react";
import { useContext, useState, useEffect } from "react";
import { isEmail } from "../../utils/validation";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { jwtDecode } from "jwt-decode";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');
    const [formInput, setFormInput] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/dashboard');
        }
    }, [])

    useEffect(() => {
        setEmail(location.pathname.split('/reset-password/')[0].split('/')[1]);
        setToken(location.pathname.split('/reset-password/')[1]);
    }, [navigate, location])

    const toggleNewPasswordDisplay = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordDisplay = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNewInputChange = (e) => {
        const value = e.target.value;
        setFormInput({
            ...formInput,
            [e.target.name]: value
        })
    }

    const handleConfirmInputChange = (e) => {
        const value = e.target.value;
        setFormInput({
            ...formInput,
            [e.target.name]: value
        })
    }

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            const input = {
                email: email,
                token: token,
                password: formInput.newPassword
            }
            api.post('users/resetPassword', input)
                .then(res => {
                    if (res.data.success) {
                        alert("Your password is reset. You can sign-in now")
                    } else {
                        alert("Your password couldn't reset! Try again now.")
                    }
                    navigate("/");
                })
                .catch(err => {
                    alert("Your password couldn't reset! Try again now.")
                    navigate("/");
                })
        }
    }

    const validateInputs = () => {

        let isValid = true;

        if (!formInput.newPassword || formInput.newPassword.length < 6) {
            setNewPasswordError(true);
            if (!formInput.newPassword) {
                setNewPasswordErrorMsg('Please enter new password');
            } else {
                setNewPasswordErrorMsg('Password must be at least 6 characters long');
            }
            isValid = false;
        } else {
            setNewPasswordError(false);
            setNewPasswordErrorMsg('');
        }

        if (!formInput.confirmPassword || formInput.confirmPassword.length < 6) {
            setConfirmPasswordError(true);
            if (!formInput.confirmPassword) {
                setConfirmPasswordErrorMsg('Please enter confirm password');
            } else {
                setConfirmPasswordErrorMsg('Password must be at least 6 characters long');
            }
            isValid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMsg('');
        }

        if (formInput.newPassword === formInput.confirmPassword) {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMsg('');
        } else {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMsg('Password does not match!');
            isValid = false;
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
                Please enter your email & password to login.
            </h3>
            <form onSubmit={handleLoginFormSubmit} className="mt-8 mb-4 w-full max-w-[375px] sm:w-[436px]">
                <div className={`w-full h-[56px] relative rounded-lg border  border-solid overflow-hidden ${formInput.email ? "border-primary" : "border-[#E3E9EE]"}`}>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        value={formInput.newPassword}
                        onChange={handleNewInputChange}
                        className="p-4 pr-[45px] w-full h-full bg-[#F4F5F9] border-none outline-none"
                    />
                    <EyeIcon
                        onClick={toggleNewPasswordDisplay}
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                </div>
                {newPasswordError && <p className="flex input-error">{newPasswordErrorMsg}</p>}
                <div className={`mt-4 w-full h-[56px] relative rounded-lg border  border-solid overflow-hidden ${formInput.password ? "border-primary" : "border-[#E3E9EE]"}`}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formInput.confirmPassword}
                        onChange={handleConfirmInputChange}
                        className="p-4 pr-[45px] w-full h-full bg-[#F4F5F9] border-none outline-none"
                    />
                    <EyeIcon
                        onClick={toggleConfirmPasswordDisplay}
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                </div>
                {confirmPasswordError && <p className="flex input-error">{confirmPasswordErrorMsg}</p>}
                <button
                    type="submit"
                    className="w-full mt-8 mb-4 px-8 py-4 text-white bg-primary rounded-lg"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
