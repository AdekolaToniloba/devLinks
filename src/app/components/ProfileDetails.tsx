import React from "react";

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
          <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <button type="button" className="btn btn-secondary">
              + Upload Image
            </button>
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
        <button type="submit" className="btn btn-primary w-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
