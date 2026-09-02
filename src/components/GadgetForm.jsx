import React, { useState } from 'react';

export default function GadgetForm({ onAddGadget }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Smartphone',
    manufacturer: '',
    brand: '',
    healthRating: '',
    role: 'Engineer'
  });
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    let errs = {};
    if (formData.name.trim().length < 3) errs.name = 'Gadget Name must be at least 3 characters.';
    if (!formData.manufacturer.trim()) errs.manufacturer = 'Manufacturer is required.';
    if (!formData.brand.trim()) errs.brand = 'Tech Brand Name is required.';
    const rating = Number(formData.healthRating);
    if (!formData.healthRating || rating < 1 || rating > 100) errs.healthRating = 'Health Rating must be between 1 and 100.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddGadget({ ...formData });
      setFormData({ name: '', category: 'Smartphone', manufacturer: '', brand: '', healthRating: '', role: 'Engineer' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-1">Gadget Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) => updateField('category', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
        >
          <option value="Smartphone">Smartphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Wearable">Wearable</option>
          <option value="Audio">Audio</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Manufacturer</label>
        <input
          type="text"
          value={formData.manufacturer}
          onChange={(e) => updateField('manufacturer', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
        />
        {errors.manufacturer && <p className="text-red-400 text-xs mt-1">{errors.manufacturer}</p>}
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Tech Brand Name</label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => updateField('brand', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
        />
        {errors.brand && <p className="text-red-400 text-xs mt-1">{errors.brand}</p>}
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Health Rating (1-100)</label>
        <input
          type="number"
          min="1"
          max="100"
          value={formData.healthRating}
          onChange={(e) => updateField('healthRating', e.target.value)}
          placeholder="95"
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
        />
        {errors.healthRating && <p className="text-red-400 text-xs mt-1">{errors.healthRating}</p>}
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-2">User Role</label>
        <div className="flex items-center space-x-6 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="Engineer"
              checked={formData.role === 'Engineer'}
              onChange={(e) => updateField('role', e.target.value)}
            />
            <span>Engineer</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="Tester"
              checked={formData.role === 'Tester'}
              onChange={(e) => updateField('role', e.target.value)}
            />
            <span>Tester</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm py-2 rounded"
      >
        Add Gadget
      </button>
    </form>
  );
}