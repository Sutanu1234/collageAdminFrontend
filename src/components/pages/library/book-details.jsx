"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Pencil } from "lucide-react";

export function BookDrawer({ book, updateBook }) {
  const [editedBook, setEditedBook] = useState({ ...book });

  const handleChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateBook(editedBook);
  };

  return (
    <>
    <Drawer>
      <DrawerTrigger asChild>
        <Pencil className="cursor-pointer size-4" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit Book Information</DrawerTitle>
            <DrawerDescription>Modify the book details.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-3">
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={editedBook.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </label>
            <label>
              <strong>Author:</strong>
              <input
                type="text"
                name="author"
                value={editedBook.author}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </label>
            <label>
              <strong>Quantity:</strong>
              <input
                type="number"
                name="quantity"
                value={editedBook.quantity}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </label>
            <label>
              <strong>Category:</strong>
              <input
                type="text"
                name="tag"
                value={editedBook.tag}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </label>
          </div>
          <DrawerFooter>
            <Button variant="default" onClick={handleSave}>
              Save
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
    </>
  );
}
