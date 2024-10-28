import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackArrow from "/src/assets/back-arrow.svg?react";
import ContactPerson from "../components/ContactPerson";

const HelpCenter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])
  
  return (
    <div className="w-full text-[#21283C] h-full overflow-auto">
      <div className="w-full py-5 relative sm:flex sm:justify-between sm:items-center sm:py-0">
        <Link
          to="/dashboard/profile"
          className="absolute top-3 left-4 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden"
        >
          <BackArrow />
        </Link>
        <h1 className="text-[20px] font-bold text-center sm:mb-6 sm:text-left sm:text-[32px] sm:leading-[40px]">
          Help Center
        </h1>
      </div>
      <div className="p-4 bg-[#F4F5F9] sm:p-0 sm:bg-inherit">
        <div className="p-4 flex gap-4 flex-col bg-white rounded-xl sm:p-6">
          <h2 className="text-[20px] font-semibold leading-[28px] text-left">
            Contact us
          </h2>
          <ContactPerson username="Ronny Morra" role="Admin" email="ronnymorra@gmail.com" imageName='Ronny.jpg' />
          <ContactPerson username="Conrad Takashi" role="Developer" email="takashi75926@gmail.com" imageName="Conrad.png" />
        </div>
        <div className="mt-6 p-4 flex gap-4 flex-col bg-white rounded-xl sm:p-6">
          <h2 className="text-[20px] font-semibold leading-[28px] text-left">
            Social Link
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex basis-full flex-col gap-1 grow items-start font-semibold sm:basis-[25%]">
              <span className="text-[#5D6E7E]">Email</span>
              <span className="text-primary">jossai@gmail.com</span>
            </div>
            <div className="flex basis-full flex-col gap-1 grow items-start font-semibold sm:basis-[25%]">
              <span className="text-[#5D6E7E]">Support Content</span>
              <span className="text-primary">jossai@support.com</span>
            </div>
            <div className="flex basis-full flex-col gap-1 grow items-start font-semibold sm:basis-[25%]">
              <span className="text-[#5D6E7E]">Website</span>
              <span className="text-primary">jossai.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
