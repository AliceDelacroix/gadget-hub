import React, { useState, useEffect } from 'react';

export default function GadgetDetailCard({ selectedGadget }) {
  const [activeDetails, setActiveDetails] = useState(null);

  useEffect(() => {
    if (selectedGadget) {
      setActiveDetails(selectedGadget);
    }
  }, [selectedGadget]);

  if (!activeDetails) {
    return (
      <div className="p-4 border rounded bg-slate-50 my-4 text-gray-500 italic text-center">
        Select a gadget from the table to view details.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-slate-50 my-4 shadow">
      <h3 className="text-lg font-bold text-slate-800 mb-2">{activeDetails.name}</h3>
      <div className="space-y-1 text-sm text-slate-600">
        <p><span className="font-semibold">Category:</span> {activeDetails.category}</p>
        <p><span className="font-semibold">Manufacturer:</span> {activeDetails.manufacturer}</p>
        <p><span className="font-semibold">Health Rating:</span> {activeDetails.healthRating}/100</p>
        <p><span className="font-semibold">Brand:</span> {activeDetails.brand}</p>
        <div className="pt-2">
          <span className={`inline-block px-2.5 py-1 text-xs font-semibold text-white rounded ${activeDetails.role === 'Engineer' ? 'bg-indigo-600' : 'bg-teal-600'}`}>
            Role: {activeDetails.role}
          </span>
        </div>
      </div>
    </div>
  );
}