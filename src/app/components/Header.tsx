import React from "react";
import Link from "next/link";
import LogoImg from "./Logo";
import { Link as LinkIcon, User } from "lucide-react";

interface HeaderProps {
  activeTab: "links" | "profile";
  setActiveTab: (tab: "links" | "profile") => void;
  src: string;
  alt: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoImg />
          <span className="text-xl font-bold">devlinks</span>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>
              <button
                className={`tab flex items-center gap-2 ${
                  activeTab === "links" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("links")}
              >
                <LinkIcon size={20} />
                Links
              </button>
            </li>
            <li>
              <button
                className={`tab flex items-center gap-2 ${
                  activeTab === "profile" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={20} />
                Profile Details
              </button>
            </li>
          </ul>
        </nav>
        <Link href="/preview" className="btn btn-secondary">
          Preview
        </Link>
      </div>
    </header>
  );
};

export default Header;
