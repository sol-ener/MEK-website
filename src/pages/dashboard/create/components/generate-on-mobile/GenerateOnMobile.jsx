import Questionaire from "./Questionaire";


const GenerateOnMobile = ({ handleUiUpdate }) => {

    return(<div className="fixed top-0 left-0 w-screen h-screen block backdrop-blur overflow-hidden bg-white z-20 sm:hidden">
        <Questionaire handleUiUpdate={handleUiUpdate} />
    </div>
  );
};

export default GenerateOnMobile;
