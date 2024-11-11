import React from "react";
import DiagnosisChart from "./DiagnosisHistory/DiagnosisChart";
import { Patient } from "@/utils/types"; // Import the Patient type

interface DiagnosisHistoryProps {
  patient: Patient;
}

const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({ patient }) => {
  return (
    <div className="absolute top-[122px] left-[430px] w-[820px] h-[730px] shadow-lg bg-white rounded-[16px] opacity-100">
      <h2 className="text-[24px] font-black text-[#072635] m-6">
        Diagnosis History
      </h2>
      {/* Pass patient data to DiagnosisChart and DiagnosisRate */}
      <DiagnosisChart patient={patient} />
    </div>
  );
};

export default DiagnosisHistory;
