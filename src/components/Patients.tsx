"use client";
import React, { useEffect, useState } from "react";
import { fetchPatientData } from "@/utils/apiEndpoint";
import Image from "next/image";
import { Patient } from "@/utils/types"; // Import the Patient type
import More from "../../public/assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";
import Search from "../../public/assets/search_FILL0_wght300_GRAD0_opsz24.svg";
import LoaderComponent from "./LoaderComponent";

// Define the prop types for the PatientList component
interface PatientListProps {
  onPatientSelect: (patient: Patient) => void; // Define the type of onPatientSelect
}

const PatientList: React.FC<PatientListProps> = ({ onPatientSelect }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPatientId, setSelectedPatientId] = useState<
    number | undefined | null
  >(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPatientData();
        const patientsWithIds = data.map((patient: Patient, index: number) => ({
          ...patient,
          id: index,
        }));
        setPatients(patientsWithIds);

        // Set the first patient as default selected
        if (patientsWithIds.length > 0) {
          setSelectedPatientId(patientsWithIds[0].id);
          onPatientSelect(patientsWithIds[0]); // Pass the first patient to display by default
        }
      } catch (err) {
        setError("Error fetching patient data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [onPatientSelect]);

  // Render the LoaderComponent when loading
  if (loading) return <LoaderComponent />;

  // Show the error message if an error occurs
  if (error) return <div>{error}</div>;

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatientId(patient?.id); // Update the selected patient ID
    onPatientSelect(patient); // Pass the selected patient to the parent
  };

  return (
    <div
      className="flex justify-left p-4 mt-[-80px] mx-3 w-full max-w-[367px] bg-white rounded-[25px] shadow-md opacity-100 relative"
      style={{ top: "122px", left: "18px" }}
    >
      <div>
        <div className="flex justify-between items-center mb-4 w-[350px] mx-2">
          <h1 className="text-[24px] font-black">Patients</h1>
          <div className="relative flex items-center gap-4 mr-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-8 bg-transparent border-none p-1 rounded w-40 h-8 placeholder-transparent"
            />
            <Image
              src={Search}
              alt="Search Icon"
              width={20}
              height={20}
              className="absolute right-3"
            />
          </div>
        </div>

        <ul className="mt-[40px] w-[95%] custom-scrollbar overflow-y-scroll h-[1054px]">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => handlePatientClick(patient)}
                className={`mb-6 flex space-x-3 items-center cursor-pointer ${
                  patient.id === selectedPatientId
                    ? "bg-[#D8FCF7] w-[345px] h-[75px]"
                    : ""
                }`}
              >
                <Image
                  src={patient.profile_picture}
                  alt={patient.name}
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                <div className="flex w-[70%] justify-between items-center">
                  <div>
                    <h3 className="font-black text-[#072635] text-[14px]">
                      {patient.name}
                    </h3>
                    <p className="text-[14px] text-[#707070]">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>
                  <div>
                    <Image src={More} alt="Settings Icon" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <li>No patients found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PatientList;
