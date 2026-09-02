import React from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

export default function GadgetTable({ data, onSelectGadget }) {
  const columns = [
    { accessorKey: 'name', header: 'Gadget Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'manufacturer', header: 'Manufacturer' },
    { accessorKey: 'healthRating', header: 'Health Rating' },
    { accessorKey: 'brand', header: 'Brand' },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } } // 3 rows per page
  });

  return (
    <div className="my-4">
      <table className="w-full border-collapse border text-left">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} className="bg-gray-100">
              {hg.headers.map(h => <th key={h.id} className="border p-2">{flexRender(h.column.columnDef.header, h.getContext())}</th>)}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => onSelectGadget(row.original)} className="hover:bg-gray-50 cursor-pointer">
              {row.getVisibleCells().map(cell => <td key={cell.id} className="border p-2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 my-2">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}