import { useState } from "react";

const UserForm = () => {
  return (
    <div className="flex flex-col space-y-3 m-10 px-20">
      {/* Name Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="name" className="w-24 font-semibold">Name</label>
        <input type="text" id="name" className="border border-gray-300 rounded-md p-2 w-48 focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Address Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="address" className="w-24 font-semibold">Address</label>
        <input type="text" id="address" className="border border-gray-300 rounded-md p-2 w-48 focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Date Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="date" className="w-24 font-semibold">Date</label>
        <input type="date" id="date" className="border border-gray-300 rounded-md p-2 w-48 focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  );
};

export default UserForm;
