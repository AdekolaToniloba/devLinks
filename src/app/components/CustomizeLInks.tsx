import React, { useState } from "react";
import Image from "next/image";
import Customize from "../../../public/Group-273.png";

const CustomizeLinks: React.FC = () => {
  const [isAddingLink, setIsAddingLink] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-2">Customize your links</h2>
      <p className="text-gray-500 mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <button
        className="btn btn-secondary w-full mb-6"
        onClick={() => setIsAddingLink(true)}
      >
        + Add new link
      </button>
      {isAddingLink ? (
        <form className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platform
            </label>
            <select className="dropdown">
              <option>Select a platform</option>
              {/* Add platform options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g. https://www.github.com/johnappleseed"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-[91px] items-start"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="text-center bg-[#FAFAFA] rounded-m py-12">
          <div className="text-center flex justify-center">
            <Image
              className="text-center mb-8"
              src={Customize}
              alt="SVG image"
            />
          </div>

          <h3 className="text-xl font-bold mb-2">Let&apos;s get you started</h3>
          <p className="text-gray-500">
            Use the &quot;Add new link&quot; button to get started. Once you
            have more than one link, you can reorder and edit them. We&quot;re
            here to help you share your profiles with everyone!
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomizeLinks;
