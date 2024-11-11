

import React from "react";
import { DiagnosticList as DiagnosticListType, Patient } from "@/utils/types";

interface DiagnosticListProps {
  patient: Patient;
}

const DiagnosticList: React.FC<DiagnosticListProps> = ({ patient }) => {
  return (
    <div className="absolute top-[910px] left-[430px] w-[820px] h-[360px] bg-white rounded-[25px] overflow-hidden opacity-100 p-4 shadow-lg">
      {/* Table header section */}
      <h1 className="text-[24px] font-black text-[#072635] tracking-wide">
        Diagnostic List
      </h1>
      <div className="bg-[#F6F7F8] rounded-[25px] mt-[40px]">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-4 text-[14px] font-bold text-[#072635] tracking-wide">
                Problem/Diagnosis
              </th>
              <th className="p-4 text-[14px] font-bold text-[#072635] tracking-wide">
                Description
              </th>
              <th className="p-4 text-[14px] font-bold text-[#072635] tracking-wide">
                Status
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Table body section with scrollable area */}
      <div className="overflow-y-auto max-h-[244px] custom-scrollbar">
        <table className="w-full text-left">
          <tbody>
            {patient.diagnostic_list.map(
              (diagnosis: DiagnosticListType, index: number) => (
                <tr
                  key={index}
                  className="w-full bg-white shadow-sm  transition duration-200 ease-in-out"
                >
                  <td className="p-4 text-sm border-b-[0.1px] text-[#072635]">
                    {diagnosis.name}
                  </td>
                  <td className="p-4 text-sm border-b-[0.1px] text-[#072635]">
                    {diagnosis.description}
                  </td>
                  <td className="p-4 text-sm border-b-[0.1px] text-[#072635]">
                    {diagnosis.status}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticList;
