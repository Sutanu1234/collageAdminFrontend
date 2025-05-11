import { useState } from "react";
import { FileUpIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdmitMain() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [admits, setAdmit] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf", 
        "text/csv", 
        "application/vnd.ms-excel", 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        parseFile(file);
      } else {
        alert("Invalid file format! Please upload a PDF, CSV, or Excel file.");
        handleClear(); // Call handleClear to reset everything
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
      setAdmit(parsedData);
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
    setAdmit([]); // Clear previous data

    // Reset file input field manually
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="w-full m-4">
      <label className="m-4 cursor-pointer">
        <input 
          id="file-upload"
          type="file" 
          accept=".pdf,.csv,.xls,.xlsx" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <div className="p-2 w-full h-32 border-2 border-dashed rounded-lg border-gray-500 flex flex-col items-center justify-center">
          <div className="h-12 w-12 grid justify-items-center items-center rounded-full bg-gray-200">
            <FileUpIcon />
          </div>
          <h4 className="text-gray-700 font-semibold text-lg">Click to upload documents</h4>
          <p className="text-sm text-gray-500">Supported formats: <b>pdf, csv, xls, xlsx</b></p>
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

      {admits.length > 0 && (
        <div className="m-4 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reg No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Admit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admits.map((admit, index) => (
                <TableRow key={index}>
                  <TableCell>{admit["Reg No"] || "N/A"}</TableCell>
                  <TableCell>{admit.Email || "N/A"}</TableCell>
                  <TableCell>
                    {admit.Admit ? <a href={admit.Admit} target="_blank" className="text-blue-600">View PDF</a> : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
