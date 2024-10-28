import CloseIcon from "/src/assets/close-icon.svg?react";
import Paypal from "/src/assets/paypal.svg?react";
import GooglePay from "/src/assets/google-pay.svg?react";
import Visa from "/src/assets/visa.svg?react";
import AmericanExpress from "/src/assets/american-express.svg?react";
import { useState } from "react";
import BackArrow from "/src/assets/back-arrow.svg?react";

const planList = [
  {
    id: "1-month",
    title: "1 Month",
    price: "$5:00",
    current: false,
  },
  {
    id: "3-months",
    title: "3 Months",
    price: "$14:00",
    current: false,
  },
  {
    id: "6-months",
    title: "6 Months",
    price: "$24:00",
    current: true,
  },
  {
    id: "12-months",
    title: "12 Months",
    price: "$40:00",
    current: false,
  },
  {
    id: "lifetime",
    title: "Lifetime",
    price: "$120:00",
    current: false,
  },
];

const PlanModal = ({ hideModal }) => {
  const [currentModal, setCurrentModal] = useState("plan-list");
  // const [selectedOption, setSelectedOptions] = useState({

  // })

  const handleModalChange = (modalName) => {
    setCurrentModal(modalName);
  };

  return (
    <div className="w-full max-w-[400px] px-4 text-[#21283C] bg-white rounded-2xl sm:p-6">
      {currentModal === "plan-list" ? (
        <PlanOptions
          hideModal={hideModal}
          handleModalChange={handleModalChange}
        />
      ) : currentModal === "payment-options" ? (
        <PaymentOptions
          hideModal={hideModal}
          handleModalChange={handleModalChange}
        />
      ) : currentModal === "summary" ? (
        <Summary hideModal={hideModal} handleModalChange={handleModalChange} />
      ) : null}
    </div>
  );
};

const PlanOptions = ({ hideModal, handleModalChange }) => {
  return (
    <>
      <div className="w-full py-5 relative sm:flex sm:justify-between sm:items-center sm:mb-5 sm:py-0">
          <button
            onClick={hideModal}
            className="absolute top-3 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden"
          >
            <BackArrow />
          </button>
          <h2 className="text-[20px] font-semibold text-center sm:text-left sm:text-2xl">
            Choose Your Plan
          </h2>
          <CloseIcon
            className="hidden cursor-pointer sm:inline"
            onClick={hideModal}
          />
        </div>
      <ul className="flex flex-col gap-3 list-none">
        {planList.map(({ id, title, price, current }) => (
          <li key={id} className="w-full cursor-pointer font-semibold">
            <div className="w-full relative">
              <input
                id={id}
                type="radio"
                name="plan"
                defaultChecked={current}
                className="absolute top-1/2 right-4 -translate-y-1/2 peer"
              />
              <label
                htmlFor={id}
                className="pr-12 flex justify-between items-center w-full p-4 border border-[#E3E9EE] rounded-xl cursor-pointer peer-checked:border-primary peer-checked:border-2"
              >
                <span className="flex gap-2 items-center">
                  <span className="text-[20px]">{title}</span>
                  {current ? (
                    <span className="px-2 py-0.5 text-white bg-primary text-sm font-semibold rounded-full">
                      Current
                    </span>
                  ) : null}
                </span>
                <span className="font-bold text-primary">{price}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleModalChange("payment-options")}
        className="mt-5 w-full py-3 bg-primary text-white rounded-lg font-semibold"
      >
        Continue
      </button>
    </>
  );
};

const paymentMethodList = [
  {
    id: "paypal",
    Icon: Paypal,
    title: "Paypal",
    defaultOption: false,
  },
  {
    id: "google-pay",
    Icon: GooglePay,
    title: "Google pay",
    defaultOption: false,
  },
  {
    id: "visa",
    Icon: Visa,
    title: "**** **** *** 1231",
    defaultOption: true,
  },
  {
    id: "american-express",
    Icon: AmericanExpress,
    title: "**** **** *** 2412",
    defaultOption: false,
  },
];

const PaymentOptions = ({ hideModal, handleModalChange }) => {
  return (
    <>
      
      <div className="w-full py-5 relative sm:flex sm:justify-between sm:items-center sm:mb-5 sm:py-0">
          <button
            onClick={() => handleModalChange("plan-list")}
            className="absolute top-3 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden"
          >
            <BackArrow />
          </button>
          <h2 className="text-2xl font-semibold text-center sm:text-left">
            Choose Your Plan
          </h2>
          <CloseIcon
            className="hidden cursor-pointer sm:inline"
            onClick={hideModal}
          />
        </div>
      <ul className="flex flex-col gap-3 list-none">
        {paymentMethodList.map(({ id, title, Icon, defaultOption }) => (
          <li key={id} className="w-full cursor-pointer font-semibold">
            <div className="w-full relative">
              <input
                id={id}
                type="radio"
                name="payment"
                defaultChecked={defaultOption}
                className="absolute top-1/2 right-4 -translate-y-1/2 peer"
              />
              <label
                htmlFor={id}
                className="pr-12 flex justify-between items-center w-full p-4 border border-[#E3E9EE] rounded-xl cursor-pointer peer-checked:border-primary peer-checked:border-2"
              >
                <span className="flex gap-4 items-center">
                  <span>
                    <Icon />
                  </span>
                  <span className="text-[20px]">{title}</span>
                </span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-5 justify-between">
        <button
          onClick={() => handleModalChange("plan-list")}
          className="basis-[48%] px-8 py-3 border-2 text-primary border-primary font-semibold rounded-lg"
        >
          Back
        </button>
        <button
          onClick={() => handleModalChange("summary")}
          className="basis-[48%] px-8 py-3 bg-primary text-white rounded-lg font-semibold"
        >
          Continue
        </button>
      </div>
    </>
  );
};

const Summary = ({ hideModal, handleModalChange }) => {
  return (
    <>
          <div className="w-full py-5 relative sm:flex sm:justify-between sm:items-center sm:mb-5 sm:py-0">
          <button
           onClick={() => handleModalChange("payment-options")} 
            className="absolute top-3 w-10 h-10 flex justify-center items-center bg-[#F4F5F9] rounded-full sm:hidden"
          >
            <BackArrow />
          </button>
          <h2 className="text-2xl font-semibold text-center sm:text-left">
            Summary
          </h2>
          <CloseIcon
            className="hidden cursor-pointer sm:inline"
            onClick={hideModal}
          />
        </div>
      <div className="mb-5 text-black bg-[#FAFAFA] rounded-lg border border-[#E3E9EE]">
        <div className="p-4 flex justify-between">
          <span className="font-light">Subscription</span>
          <span className="font-semibold">6 Months</span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="font-light">Price</span>
          <span className="font-semibold">$24.00</span>
        </div>
      </div>
      <div className="mb-5 text-black bg-[#FAFAFA] rounded-lg border border-[#E3E9EE]">
        <div className="p-4 flex justify-between">
          <span className="font-light">Amount</span>
          <span className="font-semibold">$24.00</span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="font-light">Tax</span>
          <span className="font-semibold">$1.00</span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="font-light">Total Amount</span>
          <span className="font-semibold">$25.00</span>
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold">Review Summary</h3>
        <div className="text-black bg-[#FAFAFA] rounded-lg border border-[#E3E9EE]">
          <div className="p-4 flex justify-between">
            <span className="font-light flex items-center gap-4">
              <span>
                <Visa/>
              </span>
              <span className="text-[20px] leading-[30px] font-semibold text-[#21283C]">**** **** *** 1231</span>
            </span>
            <span className="font-semibold text-primary">Change</span>
          </div>
        </div>
        <div className="mt-5 flex gap-5 font-semibold ">
          <button onClick={() => handleModalChange("payment-options")} className="basis-[48%] py-3 border-2 border-primary text-primary rounded-lg">
            Back
          </button>
          <button className="basis-[48%] py-3 bg-primary text-white rounded-lg">
            Confirm Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanModal;
