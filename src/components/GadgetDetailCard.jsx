import React, { useState, useEffect } from 'react';

export default function GadgetDetailCard({ selectedGadget }) {
  const [activeDetails, setActiveDetails] = useState(null);

  useEffect(() => {
    if (selectedGadget) {
      setActiveDetails(selectedGadget);
    }
  }, [selectedGadget]);

  if (!activeDetails) return <div className="p-4 border my-4">Select a gadget from the table to view details.</div>;

  return (
    <div className="p-4 border rounded bg-slate-50 my-4 shadow">
      <h3 className="text-lg font-bold">{activeDetails.name}</h3>
      <p>Category: {activeDetails.category}</p>
      <p>Manufacturer: {activeDetails.manufacturer}</p>
      <p>Health Rating: {activeDetails.healthRating}/100</p>
      <p>Brand: {activeDetails.brand}</p>
      <span className={`inline-block px-2 py-1 text-xs text-white rounded my-2 ${activeDetails.role === 'Engineer' ? 'bg-indigo-600' : 'bg-teal-600'}`}>
        Role: {activeDetails.role}
      </span>
    </div>
  );
}