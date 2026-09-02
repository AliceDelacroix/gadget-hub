import React, { useState, useEffect } from 'react';

export default function GadgetDetailCard({ selectedGadget }) {
  const [activeDetails, setActiveDetails] = useState(null);

  useEffect(() => {
    if (selectedGadget) setActiveDetails(selectedGadget);
  }, [selectedGadget]);

  if (!activeDetails) {
    return <p className="text-sm text-slate-500">Select a gadget from the table to view details.</p>;
  }

  return (
    <div className="text-sm space-y-1">
      <h3 className="text-base font-semibold text-slate-100">{activeDetails.name}</h3>
      <p><span className="text-slate-400">Category:</span> {activeDetails.category}</p>
      <p><span className="text-slate-400">Manufacturer:</span> {activeDetails.manufacturer}</p>
      <p><span className="text-slate-400">Health Rating:</span> {activeDetails.healthRating}/100</p>
      <p><span className="text-slate-400">Brand:</span> {activeDetails.brand}</p>
      <span className={`inline-block px-2 py-1 text-xs text-white rounded mt-2 ${activeDetails.role === 'Engineer' ? 'bg-indigo-600' : 'bg-teal-600'}`}>
        Role: {activeDetails.role}
      </span>
    </div>
  );
}