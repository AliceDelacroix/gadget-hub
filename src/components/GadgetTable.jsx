import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

export default function GadgetTable({ data, onSelectGadget, selectedGadget }) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [highlightLow, setHighlightLow] = useState(false);

  const filteredData = useMemo(() => {
    if (categoryFilter === 'All') return data;
    return data.filter(item => item.category === categoryFilter);
  }, [data, categoryFilter]);

  const columns = useMemo(() => [
    { accessorKey: 'name', header: 'Gadget Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'manufacturer', header: 'Manufacturer' },
    { accessorKey: 'healthRating', header: 'Health Rating' },
    { accessorKey: 'brand', header: 'Brand' },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); table.setPageIndex(0); }}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-slate-100"
          >
            <option value="All">All</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Wearable">Wearable</option>
            <option value="Audio">Audio</option>
          </select>
        </div>

      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} className="bg-slate-800">
              {hg.headers.map(h => (
                <th key={h.id} className="border border-slate-700 p-2">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="border border-slate-700 p-4 text-center text-slate-500">
                No gadgets yet.
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map(row => {
            const isSelected = selectedGadget?.id === row.original.id;
            const isLow = highlightLow && row.original.healthRating < 50;
            return (
              <tr
                key={row.id}
                onClick={() => onSelectGadget(row.original)}
                className={`cursor-pointer ${isSelected ? 'bg-indigo-900/40' : 'hover:bg-slate-800/60'} ${isLow ? 'text-red-400' : ''}`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border border-slate-700 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border border-slate-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border border-slate-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}