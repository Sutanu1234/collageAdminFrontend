import { useState } from "react";
import { FileUpIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { 
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentDrawer } from "./pesronal-student";

export function AddStudent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        parseFile(file);
      } else {
        alert("Invalid file format! Please upload a CSV or Excel file.");
        handleClear();
      }
    }
  };

  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setStudents(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("File uploaded successfully!");
        handleClear();
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setStudents([]); // Clear previous data

    // Reset file input field manually
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  const columns = [
    { accessorKey: "name", header: "Name", cell: ({ row }) => <div>{row.getValue("name")}</div> },
    { accessorKey: "email", header: "Email", cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div> },
    { accessorKey: "rollNo", header: "Roll No", cell: ({ row }) => <div>{row.getValue("rollNo")}</div> },
    { accessorKey: "regNo", header: "Reg No", cell: ({ row }) => <div>{row.getValue("regNo")}</div> },
    { accessorKey: "semester", header: "Semester", cell: ({ row }) => <div>{row.getValue("semester")}</div> },
    { id: "actions", header: "Student Details", cell: ({ row }) => <div className="flex justify-center"><StudentDrawer student={row.original}/></div> },
  ];

  const table = useReactTable({
    data: students,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div className="w-full m-4">
      <label className="m-4 cursor-pointer">
        <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileChange} className="hidden" />
        <div className="p-2 w-full h-32 border-2 border-dashed rounded-lg border-gray-500 flex flex-col items-center justify-center">
          <div className="h-12 w-12 grid justify-items-center items-center rounded-full bg-gray-200">
            <FileUpIcon />
          </div>
          <h4 className="text-gray-700 font-semibold text-lg">Click to upload documents</h4>
          <p className="text-sm text-gray-500">Supported formats: <b>csv, xls, xlsx</b></p>
          {selectedFile && <p className="text-sm text-blue-600 mt-2">{selectedFile.name}</p>}
        </div>
      </label>
      {selectedFile && (
        <div className="ml-4 flex gap-4">
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Submit File"}
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      )}
      {students.length > 0 && (
        <div className="m-4 w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow className="text-center" key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}