"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";
import Header from "../../components/Header";
import MobileMockup from "../../components/MobileMockup";
import CustomizeLinks from "../../components/CustomizeLInks";
import ProfileDetails from "../../components/ProfileDetails";
import { Toaster } from "react-hot-toast";

interface Link {
  id: string;
  platform: string;
  url: string;
  color: string;
  icon: string;
}

const Home: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<"links" | "profile">("links");
  const [links, setLinks] = useState<Link[]>([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    // Redirect to login page or show login prompt
    return <div>Please log in to access this page.</div>;
  }

  const handleLinksChange = (newLinks: Link[]) => {
    setLinks(newLinks);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8 flex gap-8">
        <div className="w-1/3">
          <MobileMockup
            links={links}
            onCopyLink={(url) => navigator.clipboard.writeText(url)}
          />
        </div>
        <div className="w-2/3">
          {activeTab === "links" ? (
            <CustomizeLinks onLinksChange={handleLinksChange} />
          ) : (
            <ProfileDetails />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
