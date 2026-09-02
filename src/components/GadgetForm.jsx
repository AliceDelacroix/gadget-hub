import React, { useState } from 'react';

export default function GadgetForm({ onAddGadget }) {
  const [formData, setFormData] = useState({
    name: '', category: 'Smartphone', manufacturer: '', healthRating: '', brand: '', role: 'Engineer'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (formData.name.trim().length < 3) errs.name = 'Name must be at least 3 characters.';
    if (!formData.manufacturer) errs.manufacturer = 'Manufacturer is required.';
    const rating = Number(formData.healthRating);
    if (!formData.healthRating || rating < 1 || rating > 100) errs.healthRating = 'Health Rating must be between 1 and 100.';
    if (!formData.brand) errs.brand = 'Brand Name is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddGadget({ ...formData, id: Date.now() });
      setFormData({ name: '', category: 'Smartphone', manufacturer: '', healthRating: '', brand: '', role: 'Engineer' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow my-4 space-y-3">
      <h2 className="text-xl font-bold">Register Tech Gadget</h2>
      <div>
        <label className="block text-sm font-semibold">Gadget Name</label>
        <input 
          type="text" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>
      {/* Category, Manufacturer, Health Rating, Tech Brand Name, Role radio buttons */}
      <div>
        <label className="block text-sm font-semibold">Health Rating (1-100)</label>
        <input 
          type="number" 
          value={formData.healthRating} 
          onChange={(e) => setFormData({...formData, healthRating: e.target.value})}
          className="w-full border p-2 rounded"
        />
        {errors.healthRating && <p className="text-red-500 text-xs">{errors.healthRating}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold">User Role</label>
        <label className="mr-4"><input type="radio" value="Engineer" checked={formData.role === 'Engineer'} onChange={(e) => setFormData({...formData, role: e.target.value})}/> Engineer</label>
        <label><input type="radio" value="Tester" checked={formData.role === 'Tester'} onChange={(e) => setFormData({...formData, role: e.target.value})}/> Tester</label>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Gadget</button>
    </form>
  );
}