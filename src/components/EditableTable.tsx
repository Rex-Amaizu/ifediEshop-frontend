import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  Row,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setStringsData, setClassificationsData } from "@/store/csvSlice";
import { StringEntry, ClassificationEntry } from "@/types";

interface EditableTableProps {
  columns: string[];
  sessionId: string;
  type: "strings" | "classifications";
}

const EditableTable = ({ columns, sessionId, type }: EditableTableProps) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) =>
    type === "strings" ? state.csv.stringsData : state.csv.classificationsData
  );
  const setData = (newData: any[]) => {
    if (type === "strings") {
      dispatch(setStringsData(newData as StringEntry[]));
    } else {
      dispatch(setClassificationsData(newData as ClassificationEntry[]));
    }
  };

  const columnHelper = createColumnHelper<any>();

  const cols = useMemo(
    () =>
      columns.map((header) =>
        columnHelper.accessor(header, {
          id: header,
          cell: (info) => {
            const value = info.getValue();
            return (
              <input
                type="text"
                value={value || ""}
                onChange={(e) => {
                  const newData = data.map((row, idx) =>
                    idx === info.row.index
                      ? { ...row, [header]: e.target.value }
                      : row
                  );
                  setData(newData);
                }}
                className="w-full border-none focus:outline-none"
              />
            );
          },
          header: header,
        })
      ),
    [columns, data, setData]
  );

  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
  });

  const addRow = () => {
    const newRow: any = {};
    columns.forEach((col) => {
      newRow[col] = "";
    });
    setData([...data, newRow]);
  };

  const deleteRow = (row: Row<any>) => {
    setData(data.filter((_, idx) => idx !== row.index));
  };

  const saveRow = async () => {
    await fetch(`/api/data/${sessionId}/${type}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: data }),
    });
  };

  return (
    <div className="overflow-auto">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={row.original._error ? "error" : ""}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <button
                  onClick={() => deleteRow(row)}
                  className="bg-red-500 text-white px-2 py-1 text-xs mr-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => saveRow()}
                  className="bg-blue-500 text-white px-2 py-1 text-xs"
                >
                  Save Row
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        Add Row
      </button>
    </div>
  );
};

export default EditableTable;
