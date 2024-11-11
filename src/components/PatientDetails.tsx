"use client";
import React, { useState, useEffect } from "react";
import { Patient } from "@/utils/types";
import Calendar from "../../public/assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import MaleIcon from "../../public/assets/MaleIcon.svg";
import FemaleIcon from "../../public/assets/FemaleIcon.svg";
import PhoneIcon from "../../public/assets/PhoneIcon.svg";
import Image from "next/image";

const PatientDetails = ({ patient }: { patient: Patient }) => {
  // State to store the formatted date of birth
  const [formattedDOB, setFormattedDOB] = useState("");
  // State to store the gender icon
  const [genderIcon, setGenderIcon] = useState(null);

  // useEffect for formatting the date of birth when the component mounts or when patient.date_of_birth changes
  useEffect(() => {
    const dob = new Date(patient.date_of_birth).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFormattedDOB(dob);
  }, [patient.date_of_birth]);

  // useEffect for setting the gender icon based on patient gender
  useEffect(() => {
    setGenderIcon(patient.gender === "Male" ? MaleIcon : FemaleIcon);
  }, [patient.gender]);

  return (
    <div className="absolute top-[108px] left-[1290px] w-[367px] h-[840px] bg-white rounded-[25px] shadow-md p-4 opacity-100">
      <div className="flex flex-col items-center justify-center mt-[32px]">
        {/* Displaying the patient's profile picture */}
        <Image
          src={patient.profile_picture || "/default-avatar.jpg"} // Fallback to a default avatar if profile picture is missing
          width={200}
          height={200}
          alt={`${patient.name} picture`}
        />
        <h2 className="mt-[24px] text-[24px] text-[#072635] font-black">
          {patient.name}
        </h2>
      </div>
      <div className="mt-[32px]">
        <div className="space-y-8">
          {/* Date of Birth */}
          <div className="flex space-x-3 items-center">
            <div className="bg-[#F6F7F8] rounded-full w-[42px] h-[42px] flex items-center justify-center">
              <Image
                src={Calendar}
                alt="Calendar Icon"
                width={16}
                height={16}
              />
            </div>
            <div className="text-[14px]">
              <p>Date Of Birth</p>
              <p className="font-bold">{formattedDOB}</p>
            </div>
          </div>

          {/* Gender */}
          <div className="flex space-x-3 items-center">
            <div className="bg-[#F6F7F8] rounded-full w-[42px] h-[42px] flex items-center justify-center">
              {genderIcon && (
                <Image
                  src={genderIcon}
                  alt="Gender Icon"
                  width={32}
                  height={32}
                />
              )}
            </div>
            <div className="text-[14px]">
              <p>Gender</p>
              <p className="font-bold">{patient.gender}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex space-x-3 items-center">
            <div className="bg-[#F6F7F8] rounded-full w-[42px] h-[42px] flex items-center justify-center">
              <Image src={PhoneIcon} alt="Phone Icon" width={32} height={32} />
            </div>
            <div className="text-[14px]">
              <p>Contact Info</p>
              <p className="font-bold">{patient.phone_number}</p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="flex space-x-3 items-center">
            <div className="bg-[#F6F7F8] rounded-full w-[42px] h-[42px] flex items-center justify-center">
              <Image src={PhoneIcon} alt="Phone Icon" width={32} height={32} />
            </div>
            <div className="text-[14px]">
              <p>Emergency Contact</p>
              <p className="font-bold">{patient.emergency_contact}</p>
            </div>
          </div>

          {/* Insurance Provider */}
          <div className="flex space-x-3 items-center">
            <div className="bg-[#F6F7F8] rounded-full w-[42px] h-[42px] flex items-center justify-center">
              <Image
                src={Calendar}
                alt="Insurance Icon"
                width={16}
                height={16}
              />
            </div>
            <div className="text-[14px]">
              <p>Insurance Provider</p>
              <p className="font-bold">{patient.insurance_type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show All Information Button */}
      <div className="mt-[60px] flex justify-center">
        <button className="bg-[#01F0D0] w-[220px] h-[41px] rounded-[41px] font-bold">
          Show All Information
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
