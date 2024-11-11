import React from "react";
import Image from "next/image";
import ArrowUp from "../../../public/assets/ArrowUp.svg";
import ArrowDown from "../../../public/assets/ArrowDown.svg";
import Respiratory from "../../../public/assets/respiratory rate.svg";
import Temperature from "../../../public/assets/temperature.svg";
import Heart from "../../../public/assets/HeartBPM.svg";


interface DiagnosisRateProps {
  temperature: number | null;
  heartRate: number | null;
  respiratoryRate: number | null;
}

const DiagnosisRate: React.FC<DiagnosisRateProps> = ({
  temperature,
  heartRate,
  respiratoryRate,
}) => {
  const temperatureStatus =
    temperature !== null
      ? temperature > 37.5
        ? { message: "Higher than Average", icon: ArrowUp }
        : temperature < 36.5
        ? { message: "Lower than Average", icon: ArrowDown }
        : { message: "Normal" }
      : { message: "N/A" };

  const heartRateStatus =
    heartRate !== null
      ? heartRate > 100
        ? { message: "Higher than Average", icon: ArrowUp }
        : heartRate < 60
        ? { message: "Lower than Average", icon: ArrowDown }
        : { message: "Normal" }
      : { message: "N/A" };

  const respiratoryRateStatus =
    respiratoryRate !== null
      ? respiratoryRate > 20
        ? { message: "Higher than Average", icon: ArrowUp }
        : respiratoryRate < 12
        ? { message: "Lower than Average", icon: ArrowDown }
        : { message: "Normal" }
      : { message: "N/A" };

  return (
    <div className="flex space-x-4 w-[820px]">
      {/* Respiratory Rate */}
      <div className="w-[246px] h-[242px] bg-[#E0F3FA] rounded-lg p-4 space-y-3 flex flex-col justify-start ">
        <Image
          src={Respiratory}
          alt="Respiratory Rate Icon"
          width={90}
          height={90}
          className="mr-2"
        />

        <span className="text-[16px] text-[#072635]">Respiratory Rate</span>
        <span className="text-[30px] font-black text-[#072635]">
          {respiratoryRate ?? "N/A"} bpm
        </span>
        <span className="text-[14px] text-[#072635] flex items-center">
          {respiratoryRateStatus.icon && (
            <Image
              src={respiratoryRateStatus.icon}
              alt="Respiratory Rate Status Icon"
              width={16}
              height={16}
              className="mr-2"
            />
          )}
          {respiratoryRateStatus.message}
        </span>
      </div>
      {/* Temperature */}
      <div className="w-[246px] h-[242px] bg-[#FFE6E9] rounded-lg p-4 flex space-y-3 flex-col justify-start ">
        <Image
          src={Temperature}
          alt="Temperature Rate Icon"
          width={90}
          height={90}
          className="mr-2"
        />
        <span className="text-[16px] text-[#072635]">Temperature</span>
        <span className="text-[30px] font-black text-[#072635]">
          {temperature ?? "N/A"}°F
        </span>
        <span className="text-[14px] text-[#072635] flex items-center">
          {temperatureStatus.icon && (
            <Image
              src={temperatureStatus.icon}
              alt="Temperature Status Icon"
              width={16}
              height={16}
              className="mr-2"
            />
          )}
          {temperatureStatus.message}
        </span>
      </div>

      {/* Heart Rate */}
      <div className="w-[246px] h-[242px] bg-[#E0F3FA] rounded-lg p-4 flex flex-col space-y-3 justify-start ">
        <Image
          src={Heart}
          alt="Heart Rate Icon"
          width={90}
          height={90}
          className="mr-2"
        />
        <span className="text-[16px] text-[#072635]">Heart Rate</span>
        <span className="text-[30px] font-black text-[#072635]">
          {heartRate ?? "N/A"} bpm
        </span>
        <span className="text-[14px] text-[#072635] flex items-center">
          {heartRateStatus.icon && (
            <Image
              src={heartRateStatus.icon}
              alt="Heart Rate Status Icon"
              width={16}
              height={16}
              className="mr-2"
            />
          )}
          {heartRateStatus.message}
        </span>
      </div>
    </div>
  );
};

export default DiagnosisRate;
