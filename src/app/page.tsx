"use client";
import PatientList from "@/components/Patients";
import PatientDetails from "@/components/PatientDetails";
import React, { useState } from "react";
import DiagnosticList from "@/components/DiagnosticList";
import LabResult from "@/components/LabResult";
import DiagnosisHistory from "@/components/DiagnosisHistory";
import { Patient } from "@/utils/types";

const Homepage = () => {
  // Specify selectedPatient as Patient | null
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="mb-8">
      <PatientList onPatientSelect={setSelectedPatient} />
      {selectedPatient && <PatientDetails patient={selectedPatient} />}
      {selectedPatient && <DiagnosticList patient={selectedPatient} />}
      {selectedPatient && <LabResult patient={selectedPatient} />}
      {selectedPatient && <DiagnosisHistory patient={selectedPatient} />}
    </div>
  );
};

export default Homepage;
