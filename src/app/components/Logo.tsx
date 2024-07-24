import React from "react";
import Image from "next/image";
import LogoImg from "../../../public/image/Logo.png";

interface LogoProps {
  src: string;
  alt: string;
}
const Logo = () => {
  return (
    <div>
      <Image src={LogoImg} alt="Dev Links Logo" />
    </div>
  );
};

export default Logo;
