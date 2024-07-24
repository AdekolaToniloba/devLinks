"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import MobileMockup from "../../components/MobileMockup";
import CustomizeLinks from "../../components/CustomizeLInks";
import ProfileDetails from "../../components/ProfileDetails";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"links" | "profile">("links");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8 flex gap-8">
        <div className="w-1/3">
          <MobileMockup />
        </div>
        <div className="w-2/3">
          {activeTab === "links" ? <CustomizeLinks /> : <ProfileDetails />}
        </div>
      </main>
    </div>
  );
};

export default Home;
