import React from 'react';

const CustomerDetails = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow border border-gray-200">
      {/* Banner Section */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        {/* Banner Image placeholder */}
        <div className="absolute inset-0 bg-gray-300 object-cover" />
        {/* Avatar */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            {/* Avatar Image placeholder */}
            <div className="w-full h-full bg-gray-400" />
          </div>
        </div>
        {/* Optionally, you can add an edit button/icon on top of the avatar */}
      </div>

      {/* Form Section */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            placeholder="Barbara"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Anderson"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="banderson@gmail.com"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Phone</label>
          <input
            type="text"
            placeholder="310-685-3335"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-semibold text-gray-600 mb-1">Address</label>
          <input
            type="text"
            placeholder="Street Address"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-2"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="City"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="State / Province"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
