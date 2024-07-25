import React from "react";
import { ArrowRight, PackageX } from "lucide-react";
import Image from "next/image";

interface Link {
  id: string;
  platform: string;
  url: string;
  color: string;
  icon: string;
}

interface MobileMockupProps {
  links: Link[];
  onCopyLink: (url: string) => void;
}

const MobileMockup: React.FC<MobileMockupProps> = ({ links, onCopyLink }) => {
  const handleClick = (url: string, isArrow: boolean) => {
    if (isArrow) {
      window.open(url, "_blank");
    } else {
      onCopyLink(url);
    }
  };

  return (
    <div className="relative w-full max-w-[308px] aspect-[308/632] mx-auto">
      {/* SVG for the mobile frame */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 308 632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
          fill="white"
          stroke="#737373"
          strokeWidth="2"
        />
        <path
          d="M12 55.5C12 30.9233 31.9233 11 56.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
          fill="#FAFAFA"
        />
        <rect x="109" y="14" width="90" height="24" rx="12" fill="#E5E5E5" />
      </svg>

      {/* Content inside the mobile frame */}
      <div className="absolute inset-[40px] flex flex-col items-center justify-start pt-16">
        {/* Profile picture placeholder */}
        <div className="w-24 h-24 rounded-full bg-[#EEEEEE] mb-4" />
        {/* Name placeholder */}
        <div className="w-32 h-4 bg-[#EEEEEE] mb-2" />
        {/* Description placeholder */}
        <div className="w-48 h-3 bg-[#EEEEEE] mb-8" />
        {/* Link placeholders */}
        {links.map((link, index) => (
          <div
            key={link.id}
            className="w-full h-12 mb-4 rounded flex items-center px-4 cursor-pointer"
            style={{ backgroundColor: link.color }}
          >
            <Image
              src={`/icons/${link.icon}`}
              alt={link.platform}
              className="w-6 h-6 mr-3"
              width={30}
              height={30}
            />
            <span
              className="flex-grow text-white font-semibold"
              onClick={() => handleClick(link.url, false)}
            >
              {link.platform}
            </span>
            <ArrowRight
              className="text-white"
              onClick={() => handleClick(link.url, true)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMockup;
