export type BloodPressure = {
  systolic: {
    value: number;
    levels: string;
  };
  diastolic: {
    value: number;
    levels: string;
  };
};

export type HeartRate = {
  value: number;
  levels: string;
};

export type RespiratoryRate = {
  value: number;
  levels: string;
};

export type Temperature = {
  value: number;
  levels: string;
};

export type DiagnosisHistory = {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: HeartRate;
  respiratory_rate: RespiratoryRate;
  temperature: Temperature;
};

// DiagnosticList represents individual diagnoses in a patient's record.
export type DiagnosticList = {
  name: string;
  description: string;
  status: string;
};

// Patient represents a patient's profile, including diagnosis history and diagnostic list.
export type Patient = {
  patient: Patient, 
  index: number;
  id?: number; 
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: DiagnosticList[];
  lab_results: string[];
};


export interface DiagnosisRateProps {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
}
