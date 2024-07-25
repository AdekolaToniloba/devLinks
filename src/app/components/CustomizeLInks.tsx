import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Customize from "../../../public/Group-273.png";
import { auth, db } from "../../../firebase/clientApp";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { AlertCircle, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertIcon } from "../components/Alert";
import { toast } from "react-hot-toast";

interface Link {
  id: string;
  platform: string;
  url: string;
  color: string;
  icon: string;
}

interface CustomizeLinksProps {
  onLinksChange: (links: Link[]) => void;
}

const platforms = [
  { name: "GitHub", color: "#1A1A1A", icon: "..." }, // Add icon SVGs for each platform
  { name: "Frontend Mentor", color: "#3E54A3", icon: "..." },
  { name: "Twitter", color: "#1DA1F2", icon: "..." },
  { name: "LinkedIn", color: "#0A66C2", icon: "..." },
  { name: "YouTube", color: "#FF0000", icon: "..." },
  { name: "Facebook", color: "#1877F2", icon: "..." },
  { name: "Twitch", color: "#9146FF", icon: "..." },
  { name: "Dev.to", color: "#0A0A0A", icon: "..." },
  { name: "Codewars", color: "#B1361E", icon: "..." },
  { name: "Codepen", color: "#000000", icon: "..." },
  { name: "freeCodeCamp", color: "#0A0A23", icon: "..." },
  { name: "GitLab", color: "#FCA121", icon: "..." },
  { name: "Hashnode", color: "#2962FF", icon: "..." },
  { name: "Stack Overflow", color: "#F48024", icon: "..." },
];

const CustomizeLinks: React.FC<CustomizeLinksProps> = ({ onLinksChange }) => {
  const [user] = useAuthState(auth);
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newLink, setNewLink] = useState<Omit<Link, "id" | "color" | "icon">>({
    platform: "",
    url: "",
  });
  const [error, setError] = useState<string>("");

  const fetchLinks = useCallback(async () => {
    if (!user) return;
    const q = query(collection(db, "links"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const fetchedLinks = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Link)
    );
    setLinks(fetchedLinks);
    onLinksChange(fetchedLinks);
  }, [user, onLinksChange]);

  useEffect(() => {
    if (user) {
      fetchLinks();
    }
  }, [user, fetchLinks]);

  const handleAddLink = async () => {
    if (!newLink.platform || !newLink.url) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const platform = platforms.find((p) => p.name === newLink.platform);
      if (!platform) {
        throw new Error("Invalid platform selected");
      }
      const linkToAdd: Omit<Link, "id"> = {
        ...newLink,
        color: platform.color,
        icon: platform.icon,
      };
      const docRef = await addDoc(collection(db, "links"), {
        ...linkToAdd,
        userId: user?.uid,
      });
      const addedLink: Link = {
        id: docRef.id,
        ...linkToAdd,
      };
      const updatedLinks = [...links, addedLink];
      setLinks(updatedLinks);
      setNewLink({ platform: "", url: "" });
      setIsAddingLink(false);
      setError("");
      onLinksChange(updatedLinks);
    } catch (error) {
      console.error("Error adding link:", error);
      setError("Error adding link: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLink = async (id: string, updatedLink: Partial<Link>) => {
    try {
      await updateDoc(doc(db, "links", id), updatedLink);
      const updatedLinks = links.map((link) =>
        link.id === id ? { ...link, ...updatedLink } : link
      );
      setLinks(updatedLinks);
      onLinksChange(updatedLinks);
    } catch (error) {
      setError("Error updating link");
    }
  };

  const handleRemoveLink = async (id: string) => {
    try {
      await deleteDoc(doc(db, "links", id));
      const updatedLinks = links.filter((link) => link.id !== id);
      setLinks(updatedLinks);
      onLinksChange(updatedLinks);
    } catch (error) {
      setError("Error removing link");
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-heading-m font-bold mb-2">Customize your links</h2>
      <p className="text-body-m text-gray-200 mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <button
        className="btn btn-secondary w-full mb-6"
        onClick={() => setIsAddingLink(true)}
      >
        + Add new link
      </button>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isAddingLink ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddLink();
          }}
          className="bg-gray-50 p-4 rounded-lg mb-6"
        >
          <div className="mb-4">
            <label className="block text-body-m font-medium text-gray-300 mb-1">
              Platform
            </label>
            <select
              className="dropdown w-full"
              value={newLink.platform}
              onChange={(e) =>
                setNewLink({ ...newLink, platform: e.target.value })
              }
            >
              <option value="">Select a platform</option>
              {platforms.map((platform) => (
                <option key={platform.name} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-body-m font-medium text-gray-300 mb-1">
              Link
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="e.g. https://www.github.com/johnappleseed"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary w-[91px]">
              Save
            </button>
          </div>
        </form>
      ) : links.length === 0 ? (
        <div className="text-center bg-[#FAFAFA] rounded-md py-12">
          <div className="text-center flex justify-center mb-8">
            <Image
              className="text-center mb-8"
              src={Customize}
              alt="SVG image"
              width={250}
              height={160}
            />
          </div>
          <h3 className="text-xl font-bold mb-2">Let&apos;s get you started</h3>
          <p className="text-gray-500">
            Use the &quot;Add new link&quot; button to get started. Once you
            have more than one link, you can reorder and edit them. We&apos;re
            here to help you share your profiles with everyone!
          </p>
        </div>
      ) : (
        links.map((link, index) => (
          <div key={link.id} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-body-m">
                Link #{index + 1}
              </span>
              <button
                onClick={() => handleRemoveLink(link.id)}
                className="text-gray-200 hover:text-gray-300"
              >
                Remove
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-body-m font-medium text-gray-300 mb-1">
                Platform
              </label>
              <select
                className="dropdown w-full"
                value={link.platform}
                onChange={(e) =>
                  handleUpdateLink(link.id, {
                    ...link,
                    platform: e.target.value,
                  })
                }
              >
                {platforms.map((platform) => (
                  <option key={platform.name} value={platform.name}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-body-m font-medium text-gray-300 mb-1">
                Link
              </label>
              <div className="relative">
                <LinkIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 cursor-pointer"
                  onClick={() => handleCopyLink(link.url)}
                />
                <input
                  type="text"
                  className="input pl-10 w-full"
                  value={link.url}
                  onChange={(e) =>
                    handleUpdateLink(link.id, { ...link, url: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomizeLinks;
