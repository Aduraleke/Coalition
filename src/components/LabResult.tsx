import React from "react";
import { Patient } from "@/utils/types";
import Download from "../../public/assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg";
import Image from "next/image";

const LabResult: React.FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <div className="absolute top-[970px] left-[1290px] w-[367px] h-[296px] shadow-lg bg-white rounded-[16px] opacity-100 p-6 space-y-4">
      <h2 className="text-[24px] font-extrabold text-[#072635]">Lab Results</h2>
      {/* Render the lab results */}
      {patient.lab_results.length === 0 ? (
        <p className="text-[#4A4A4A]">No lab results available.</p>
      ) : (
        <ul className="pl-6 space-y-3 overflow-y-auto custom-scrollbar max-h-[210px]">
          {patient.lab_results.map((result, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-[13px] text-[#4A4A4A] hover:bg-[#F6F7F8] rounded-lg p-2 cursor-pointer transition duration-200 ease-in-out"
            >
              <span>{result}</span>
              <div className="flex items-center mr-4">
                {/* Added margin-left for spacing between the text and the icon */}
                <Image src={Download} alt="Download" width={18} height={18} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LabResult;
