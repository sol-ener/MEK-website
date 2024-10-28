import { useContext } from "react";
import { GenerateVideoContext } from "../generate-video/GenerateVideo";
import { useNavigate } from "react-router-dom";

const Questionaire = ({ handleUiUpdate }) => {
  const {setIsGenerating} = useContext(GenerateVideoContext);
  const navigate = useNavigate();

    const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
        navigate("/dashboard/call/1");
        setIsGenerating(false);
      }, 3000)  
    };

    const handleClose = () => {
      handleUiUpdate('upload');
    }
  
    return (
      <div className="basis-full h-full overflow-auto">
        <h3 className="p-4 flex gap-1 justify-between items-center">
          <span className="font-semibold">Questionaire</span>
          <button className="p-[10px] bg-[#F4F5F9] rounded-lg border border-[#E3E9EE]">
            Save draft
          </button>
        </h3>
        <div className="py-5 w-full h-fit border rounded-xl">
          <ol className="h-fit list-none font-semibold">
            <li className="px-4">
              <h4 className="font-semibold text-left">1. What did they worked</h4>
              <div className="mt-2 pl-4 pb-4 w-[100%] h-fit border-b border-[#E3E9EE]">
                <textarea
                  className="p-3 w-full aspect-[2.24] text-sm font-normal text-[#5D6E7E] border-[#E3E9EE] bg-[#F4F5F9] rounded-lg resize-none"
                  placeholder="Write the answer here..."
                ></textarea>
              </div>
            </li>
            <li className="px-4">
              <h4 className="font-semibold text-left">
                2. How they spent their time
              </h4>
              <div className="mt-2 pl-4 pb-4 w-[100%] h-fit border-b border-[#E3E9EE]">
                <textarea
                  className="p-3 w-full aspect-[2.24] text-sm font-normal text-[#5D6E7E] bg-[#F4F5F9] border-[#E3E9EE] rounded-lg resize-none"
                  placeholder="Write the answer here..."
                ></textarea>
              </div>
            </li>
            <li className="px-4">
              <h4 className="mt-2 pl-4 pb-4 w-[100%] h-fit border-b border-[#E3E9EE]">
                3. What are their hobbies
              </h4>
              <div className="mt-2 mb-4 w-[100%] h-fit">
                <textarea
                  className="p-3 w-full aspect-[2.24] text-sm font-normal text-[#5D6E7E] bg-[#F4F5F9] border-[#E3E9EE] rounded-lg resize-none"
                  placeholder="Write the answer here..."
                ></textarea>
              </div>
            </li>
          </ol>
        </div>
        <div className="p-4 flex gap-2">
          <button onClick={handleClose} className="py-3 grow border border-primary text-primary rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="py-3 grow bg-primary text-white rounded-lg"
          >
            Generate
          </button>
        </div>
      </div>
    );
  };

  export default Questionaire;