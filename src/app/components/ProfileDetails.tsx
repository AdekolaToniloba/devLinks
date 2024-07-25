import React from "react";
import { Image as ImageIcon } from "lucide-react";

const ProfileDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-2">Profile Details</h2>
      <p className="text-gray-500 mb-6">
        Add your details to create a personal touch to your profile.
      </p>
      <form>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile picture
          </label>
          <div className="flex items-center justify-center w-full h-48 bg-[#FAFAFA] rounded-lg ">
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#EFEBFF] w-[153px] h-[153px] py-4 px-4">
              <ImageIcon size={40} className="text-[#633CFF]" />
              <button type="button" className="btn btn-secondary">
                + Upload Image
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First name*
          </label>
          <input type="text" className="input" placeholder="e.g. John" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last name*
          </label>
          <input type="text" className="input" placeholder="e.g. Appleseed" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="input"
            placeholder="e.g. email@example.com"
          />
        </div>
        <button type="submit" className="btn btn-primary w-[91px]">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
