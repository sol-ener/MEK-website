import { Link } from "react-router-dom";
import logo from "/logo.svg";

const LoginOption = () => {
  return (
    <div className="mx-auto pt-[31px] w-[95%] flex flex-col justify-center">
      <div className="mb-[34px] mx-auto w-[100px] h-[100px]">
        <img src={logo} className="w-full h-full" alt="Vite logo" />
      </div>
      <h1 className="mb-0.5 font-zenDots text-[32px]">Joss AI</h1>
      <h3 className="mb-8">Welcome! Let’s dive in into your account!</h3>
      <div className="px-2 flex flex-col justify-stretch gap-4">
        <button className="py-4 border border-[#EFEFEF] font-semibold text-[#212121]">
          <span></span>
          <span>Continue with Google</span>
        </button>
        <button className="py-4 border border-[#EFEFEF] font-semibold text-[#212121]">
          <span></span>
          <span>Continue with Apple</span>
        </button>
        <button className="py-4 border border-[#EFEFEF] font-semibold text-[#212121]">
          <span></span>
          <span>Continue with Facebook</span>
        </button>
        <button className="py-4 border border-[#EFEFEF] font-semibold text-[#212121]">
          <span></span>
          <span>Continue with Twitter</span>
        </button>
      </div>
      <Link
        to="/login"
        className="mt-8 w-full py-4 bg-primary text-white font-semibold rounded-lg"
      >
        Get Started
      </Link>
      <p className="mt-8 text-base">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginOption;
