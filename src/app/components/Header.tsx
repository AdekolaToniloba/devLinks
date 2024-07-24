import React from "react";
import Image from "next/image";
import LinkIcon from "../../../public/ph_link-bold.svg";
import ProfileICon from "../../../public/profile-icon.svg";
import LogoImg from "../components/Logo";
import Link from "next/link";

interface HeaderProps {
  src: string;
  alt: string;
}

const Header = () => {
  return (
    <div>
      <nav className="bg-white flex self-stretch justify-between items-center border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex gap-2">
          <LogoImg />
          <p className="text-3xl">devlinks</p>
        </div>

        <div className="flex gap-2">
          <div className="flex gap-2 flex-row">
            <Link href="/">
              <Image src={LinkIcon} alt="Link Icon" />
              <p>Links</p>
            </Link>
          </div>

          <div className="flex">
            <Link href="/">
              <Image src={ProfileICon} alt="Profile Icon" />
              <p>Profile Details</p>
            </Link>
          </div>
        </div>

        <div>Preview</div>
      </nav>
    </div>
  );
};

export default Header;
