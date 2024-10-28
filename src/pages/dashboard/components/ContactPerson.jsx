import { useContext, useEffect, useState } from "react";
import { getFileFromS3 } from "../../../utils/getFileFromS3";

const ContactPerson = ({ role, username, email, imageName }) => {
  const [viewFile, setViewFile] = useState(null);
  const [mimeType, setMimeType] = useState('');

  useEffect(() => {
    getFileFromS3(imageName, 'conrad.anderson75926@gmail.com', setViewFile, setMimeType);
  }, [])

  return (
    <div className="max-w-[540px] flex gap-4 justify-between flex-wrap">
      <div className="basis-[48%] flex">
        <div className="mr-4 w-[50px] h-[50px] flex justify-center items-center rounded-full overflow-hidden bg-primary">
          <img
            src={viewFile}
            className="w-full h-full object-cover"
            alt="developer"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[#5D6E7E] font-semibold">{role}</span>
          <span className="font-medium">{username}</span>
        </div>
      </div>

      <div className="basis-[48%] flex flex-col items-start">
        <span className="text-[#5D6E7E] font-semibold">Contact Admin</span>
        <span className="font-medium text-primary">{email}</span>
      </div>
    </div>
  );
};

export default ContactPerson;
