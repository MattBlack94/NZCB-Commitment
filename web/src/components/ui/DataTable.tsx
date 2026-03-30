"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface Column {
  key: string;
  header: string;
  type?: "text" | "number" | "select" | "checkbox" | "readonly";
  options?: readonly string[] | string[];
  width?: string;
  placeholder?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onCellChange: (rowIndex: number, key: string, value: unknown) => void;
  onAddRow?: () => void;
  onRemoveRow?: (rowIndex: number) => void;
  addLabel?: string;
  maxRows?: number;
  readOnly?: boolean;
}

export default function DataTable({
  columns,
  data,
  onCellChange,
  onAddRow,
  onRemoveRow,
  addLabel = "Add row",
  maxRows,
  readOnly = false,
}: DataTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#1d4354]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
            {!readOnly && onRemoveRow && <th className="w-10" />}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-[#f3f3f3]" : "bg-white"}>
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-1.5">
                  {col.type === "readonly" ? (
                    <span className="text-sm text-[#373737] font-medium">
                      {String(row[col.key] ?? "")}
                    </span>
                  ) : col.type === "select" ? (
                    <select
                      value={String(row[col.key] ?? "")}
                      onChange={(e) =>
                        onCellChange(rowIndex, col.key, e.target.value)
                      }
                      className="w-full border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                      disabled={readOnly}
                    >
                      <option value="">Select...</option>
                      {col.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : col.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(row[col.key])}
                      onChange={(e) =>
                        onCellChange(rowIndex, col.key, e.target.checked)
                      }
                      className="border-gray-300 text-[#3c886c] focus:ring-[#3c886c]"
                      disabled={readOnly}
                    />
                  ) : col.type === "number" ? (
                    <input
                      type="number"
                      value={row[col.key] as number}
                      onChange={(e) =>
                        onCellChange(
                          rowIndex,
                          col.key,
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                      placeholder={col.placeholder || "0"}
                      disabled={readOnly}
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(row[col.key] ?? "")}
                      onChange={(e) =>
                        onCellChange(rowIndex, col.key, e.target.value)
                      }
                      className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                      placeholder={col.placeholder || ""}
                      disabled={readOnly}
                    />
                  )}
                </td>
              ))}
              {!readOnly && onRemoveRow && (
                <td className="px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => onRemoveRow(rowIndex)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Remove row"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!readOnly && onAddRow && (!maxRows || data.length < maxRows) && (
        <div className="p-2 border-t border-gray-200 bg-[#f3f3f3]">
          <button
            type="button"
            onClick={onAddRow}
            className="flex items-center gap-1.5 text-sm text-[#3c886c] hover:text-[#1d4354] font-medium"
          >
            <Plus size={14} />
            {addLabel}
          </button>
        </div>
      )}
    </div>
  );
}
