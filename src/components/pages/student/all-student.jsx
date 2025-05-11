"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentDrawer } from "./pesronal-student";

const name = [
  "Sutanu Bera",
  "Aarav Sharma",
  "Ishaan Verma",
  "Neha Reddy",
  "Riya Patel",
  "Kabir Malhotra",
  "Ananya Nair",
  "Vihan Gupta",
  "Sanya Mehta",
  "Devansh Joshi"
];

const data = Array.from({ length: 10 }, (_, i) => ({
  email: `cse2210${7 + i}@iiitkalyani.ac.in`,
  rollNo: `CSE/2210${7 + i}`,
  regNo: 961 + i,
  name: name[i],
  semester: 6,
}));

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => <div>{row.getValue("rollNo")}</div>,
  },
  {
    accessorKey: "regNo",
    header: "Reg No",
    cell: ({ row }) => <div>{row.getValue("regNo")}</div>,
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => <div>{row.getValue("semester")}</div>,
  },
  {
    id: "actions",
    header: "Student Details",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex justify-center">
            <StudentDrawer student={student} />
        </div>
      );
    },
  },
];

export function AllStudent() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div className="w-full m-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() || ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`${header.index !== headerGroup.headers.length - 1 ? "border-r-2" : ""} text-center`}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="text-center" key={row.id}>
                  {row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>)}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
