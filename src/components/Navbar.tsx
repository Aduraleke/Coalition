import React from "react";
import Logo from "../../public/assets/TestLogo.svg";
import Home from "../../public/assets/home_FILL0_wght300_GRAD0_opsz24.svg";
import Patient from "../../public/assets/group_FILL0_wght300_GRAD0_opsz24.svg";
import Schedule from "../../public/assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import Message from "../../public/assets/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg";
import Transaction from "../../public/assets/credit_card_FILL0_wght300_GRAD0_opsz24.svg";
import Settings from "../../public/assets/settings_FILL0_wght300_GRAD0_opsz24.svg";
import More from "../../public/assets/more_vert_FILL0_wght300_GRAD0_opsz24.svg"
import NavWoman from "../../public/assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center gap-[50px] rounded-[50px] shadow-sm bg-[#ffffff] py-3 px-8 mx-6">
      <div className="flex">
        <Image src={Logo} alt="Coalition Logo" className="cursor-pointer" />
      </div>

      <div className="">
        <ul className="flex space-x-6 text-[14px] font-bold">
          <li className="flex items-center space-x-2 hover:bg-[#01F0D0] px-4 py-2 rounded-full">
            <Image src={Home} alt="Home Icon" className="cursor-pointer" />
            <Link href="/">Overview</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-[#01F0D0] px-4 py-2 rounded-full">
            <Image
              src={Patient}
              alt="Patient Icon"
              className="cursor-pointer"
            />
            <Link href="/patients">Patients</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-[#01F0D0] px-4 py-2 rounded-full">
            <Image
              src={Schedule}
              alt="Schedule Icon"
              className="cursor-pointer"
            />
            <Link href="/schedule">Schedule</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-[#01F0D0] px-4 py-2 rounded-full">
            <Image
              src={Message}
              alt="Message Icon"
              className="cursor-pointer"
            />
            <Link href="/messages">Messages</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-[#01F0D0] px-4 py-2 rounded-full">
            <Image
              src={Transaction}
              alt="Transaction Icon"
              className="cursor-pointer"
            />
            <Link href="/transactions">Transactions</Link>
          </li>
        </ul>
      </div>
      <div className="flex space-x-3 items-center">
        <Image src={NavWoman} alt="Logged In User" />
        <div className="text-[14px]">
          <p className="font-black">Dr. Jose Simmons</p>
          <p className="font-thin text-[#707070]"> General Practitional</p>
        </div>
        <div className="h-10 w-[1px] bg-[#E3E4E6] mx-4"></div>
        <Image src={Settings} alt="Settings Icon" />
        <Image src={More} alt="More Icon" />
      </div>
    </nav>
  );
};

export default Navbar;
