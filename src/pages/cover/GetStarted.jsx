import { Link } from "react-router-dom";
import MobFrame from "../../assets/mob-frame.png"
import GetStartedImage from "../../assets/get-started-cover.png"

const GetStarted = ({handleScreenChange}) => {
  return (
    <div className="mx-auto pt-[31px] w-[95%]">
      <div className="px-[24px] relative h-[420px] overflow-hidden">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[90%]"
          src={MobFrame}
          alt="frame"
        />
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%]"
          src={GetStartedImage}
          alt="design"
        />
      </div>
      <div className="px-[10px] py-4">
        <h1 className="mb-2 text-2xl font-semibold">
          Enjoy all the benefits with pro subscriptions
        </h1>
        <p>Upload your photo and answer some questions to generate videos.</p>
      </div>
      <button onClick={() => handleScreenChange("login-options")} className="mt-8 w-full py-4 bg-primary text-white font-semibold rounded-lg">
        Get Started
      </button>
      <p className="mt-8 text-base">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default GetStarted;
