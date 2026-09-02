import React, { useState } from 'react';
import GadgetForm from './components/GadgetForm';
import GadgetTable from './components/GadgetTable';
import GadgetDetailCard from './components/GadgetDetailCard';

function App() {
  // Global state to hold all submitted gadgets and the currently selected one
  const [gadgets, setGadgets] = useState([]);
  const [selectedGadget, setSelectedGadget] = useState(null);
  
  // State to handle dynamic conditional views ('form' or 'registry')
  const [currentView, setCurrentView] = useState('form'); 

  // Function to add a new gadget and automatically switch to the table view
  const handleAddGadget = (newGadget) => {
    setGadgets([...gadgets, newGadget]);
    setCurrentView('registry'); 
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-slate-800">
      <h1 className="text-3xl font-extrabold text-center mb-8">Tech Gadget Inventory Hub</h1>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setCurrentView('form')}
          className={`px-5 py-2 rounded font-semibold transition-colors ${currentView === 'form' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Register Gadget
        </button>
        <button
          onClick={() => setCurrentView('registry')}
          className={`px-5 py-2 rounded font-semibold transition-colors ${currentView === 'registry' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          View Registry
        </button>
      </div>

      {/* Conditional View 1: Form */}
      {currentView === 'form' && (
        <div className="max-w-2xl mx-auto">
          <GadgetForm onAddGadget={handleAddGadget} />
        </div>
      )}

      {/* Conditional View 2: Registry Table & Detail Card (Adjacent) */}
      {currentView === 'registry' && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Gadget Registry</h2>
            {gadgets.length > 0 ? (
              <GadgetTable data={gadgets} onSelectGadget={setSelectedGadget} />
            ) : (
              <p className="text-gray-500 italic mt-4 text-center">No gadgets registered yet. Go back and add one!</p>
            )}
          </div>
          
          <div className="md:w-1/3">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Active Profile</h2>
            <GadgetDetailCard selectedGadget={selectedGadget} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;