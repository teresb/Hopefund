// src/components/Fundraisers.js
import React from 'react';

const Fundraisers = ({ fundraisers, imageClass }) => {
  if (!fundraisers || fundraisers.length === 0) {
    return <p className="text-center text-gray-500">No fundraisers found.</p>;
  }

  return (
      <ul>
        {fundraisers.map((fundraiser) => (
          <li key={fundraiser._id} className="p-4 border bg-slate-200 rounded-lg shadow-md">
            {fundraiser.image && (
              <img
                src={fundraiser.image}
                alt={fundraiser.title}
                className={imageClass || "w-full h-72 mb-2 object-cover rounded-md"}
              />
            )}
            <div className="flex justify-between pt-2 text-slate-600 text-sm">
                <p>Due: {new Date(fundraiser.deadline).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2 py-3">
                <h1 className="line-clamp-1 font-bold">{fundraiser.title}</h1>
                <div className="flex justify-between text-sm mt-2">
                  <p>Goal: ${fundraiser.goal}</p>
                  <p>Raised: ${fundraiser.raised}</p>
                </div>
              </div>
          </li>
        ))}
      </ul>
  );
};

export default Fundraisers;
