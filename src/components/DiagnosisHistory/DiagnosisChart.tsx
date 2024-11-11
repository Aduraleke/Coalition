import React, { useEffect, useRef, useState } from "react";
import { Patient } from "@/utils/types";
import Chart, { ChartEvent } from "chart.js/auto";
import Image from "next/image";
import ArrowUp from "../../../public/assets/ArrowUp.svg";
import ArrowDown from "../../../public/assets/ArrowDown.svg";
import Expand from "../../../public/assets/expand_more_FILL0_wght300_GRAD0_opsz24.svg";
import DiagnosisRate from "./DiagnosisRate";


interface DiagnosisChartProps {
  patient: Patient;
}

const DiagnosisChart: React.FC<DiagnosisChartProps> = ({ patient }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [selectedValues, setSelectedValues] = useState<{
    systolic: number | null;
    diastolic: number | null;
    temperature: number | null;
    heartRate: number | null;
    respiratoryRate: number | null;
  }>();

  useEffect(() => {
    setSelectedValues({
      systolic: null,
    diastolic: null,
    temperature: null,
    heartRate: null,
    respiratoryRate: null,})
  }, [])

  // Abbreviate month names and sort by year and month order
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const diagnosisData = patient.diagnosis_history
    .map((diagnosis) => ({
      month: diagnosis.month.slice(0, 3),
      year: diagnosis.year,
      systolic: diagnosis.blood_pressure.systolic.value,
      diastolic: diagnosis.blood_pressure.diastolic.value,
      respiratoryRate: diagnosis.respiratory_rate.value,
      temperature: diagnosis.temperature.value,
      heartRate: diagnosis.heart_rate.value,
    }))
    .sort((a, b) =>
      a.year === b.year
        ? monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        : a.year - b.year
    );

  // Get the most recent diagnosis for display initially
  const latestDiagnosis = diagnosisData[diagnosisData.length - 1];


const handleChartClick = (event: ChartEvent) => {
  if (!chartInstance.current) return;

  const points = chartInstance.current.getElementsAtEventForMode(
    event as unknown as Event,
    "nearest",
    { intersect: true },
    false
  );

  if (points.length > 0) {
    const pointIndex = points[0].index;
    const selectedDiagnosis = diagnosisData[pointIndex];

    setSelectedValues({
      systolic: selectedDiagnosis.systolic,
      diastolic: selectedDiagnosis.diastolic,
      temperature: selectedDiagnosis.temperature,
      heartRate: selectedDiagnosis.heartRate,
      respiratoryRate: selectedDiagnosis.respiratoryRate,
    });
  }
};

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: diagnosisData.map((data) => `${data.month}, ${data.year}`),
          datasets: [
            {
              label: "Systolic",
              data: diagnosisData.map((data) => data.systolic),
              borderColor: "#E66FD2",
              backgroundColor: "#E66FD2",
              pointBackgroundColor: "#E66FD2",
              tension: 0.4,
              fill: false,
            },
            {
              label: "Diastolic",
              data: diagnosisData.map((data) => data.diastolic),
              borderColor: "#8C6FE6",
              backgroundColor: "#8C6FE6",
              pointBackgroundColor: "#8C6FE6",
              tension: 0.4,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              max: 180,
              min: 60,
            },
            x: {
              ticks: {
                autoSkip: true,
                maxRotation: 0,
                maxTicksLimit: 6,
              },
            },
          },
          onClick: (event) => handleChartClick(event), // Attach the click event
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [diagnosisData, handleChartClick]);



  return (
    <div className="p-6 bg-white rounded-lg mt-[20px] ">
      <div className="bg-[#F4F0FE] rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-[#072635]">
            Blood Pressure
          </span>
          <span className="flex text-[12px] text-[#072635] right-[350px] absolute">
            Last 6 months
            <Image
              src={Expand}
              alt="Expand"
              width={12}
              height={12}
              className="ml-2"
            />
          </span>
        </div>

        <div className="flex">
          <div className="w-2/3">
            <canvas ref={chartRef} />
          </div>
          <div className="right-[100px] top-[150px] absolute">
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#E66FD2] mr-2"></span>
                <p className="text-[14px] font-semibold text-[#072635]">
                  Systolic
                </p>
              </div>
              <p className="text-[22px] font-bold text-[#072635]">
                {selectedValues?.systolic ?? latestDiagnosis?.systolic ?? "N/A"}
              </p>
              <div className="text-[14px] text-[#072635] mb-6 whitespace-nowrap min-w-[160px]">
                {selectedValues?.systolic && selectedValues?.systolic > 120 ? (
                  <div className="flex mt-2">
                    <Image
                      src={ArrowUp}
                      alt="Arrow Up"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Higher than Average
                  </div>
                ) : (
                  "Normal"
                )}
              </div>
            </div>
            <hr className="mb-4 bg-[#CBC8D4]" />
            <div className="flex flex-col items-start mb-4">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#8C6FE6] mr-2"></span>
                <p className="text-[14px] font-semibold text-[#072635]">
                  Diastolic
                </p>
              </div>
              <p className="text-[22px] font-bold text-[#072635]">
                {selectedValues?.diastolic ??
                  latestDiagnosis?.diastolic ??
                  "N/A"}
              </p>
              <div className="text-[14px] text-[#072635] mb-6 whitespace-nowrap min-w-[160px]">
                {selectedValues?.diastolic && selectedValues?.diastolic < 80 ? (
                  <div className="flex mt-2">
                    <Image
                      src={ArrowDown}
                      alt="Arrow Down"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Lower than Average
                  </div>
                ) : (
                  "Normal"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20px]">
        <DiagnosisRate
          temperature={
            selectedValues?.temperature ?? latestDiagnosis.temperature
          }
          heartRate={selectedValues?.heartRate ?? latestDiagnosis.heartRate}
          respiratoryRate={
            selectedValues?.respiratoryRate ?? latestDiagnosis.respiratoryRate
          }
        />
      </div>
    </div>
  );
};

export default DiagnosisChart;
