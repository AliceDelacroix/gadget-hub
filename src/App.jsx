import React, { useState } from 'react';
import GadgetForm from './components/GadgetForm';
import GadgetTable from './components/GadgetTable';
import GadgetDetailCard from './components/GadgetDetailCard';

export default function App() {
  const [gadgets, setGadgets] = useState([]);
  const [selectedGadget, setSelectedGadget] = useState(null);

  const handleAddGadget = (newGadget) => {
    const gadgetWithId = { id: Date.now(), ...newGadget };
    setGadgets(prev => [...prev, gadgetWithId]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-800 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-base font-medium">Tech Gadget Inventory Hub</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 flex-grow w-full grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="border border-slate-800 bg-slate-900 p-6 rounded-lg">
            <h2 className="text-sm font-medium mb-4">Add gadget</h2>
            <GadgetForm onAddGadget={handleAddGadget} />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="border border-slate-800 bg-slate-900 p-6 rounded-lg">
            <h2 className="text-sm font-medium mb-4">Inventory</h2>
            <GadgetTable
              data={gadgets}
              onSelectGadget={setSelectedGadget}
              selectedGadget={selectedGadget}
            />
          </div>

          <div className="border border-slate-800 bg-slate-900 p-6 rounded-lg">
            <h2 className="text-sm font-medium mb-4">Details</h2>
            <GadgetDetailCard selectedGadget={selectedGadget} />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 text-slate-500 text-xs py-5 text-center">
        Tech Gadget Inventory Hub
      </footer>
    </div>
  );
}