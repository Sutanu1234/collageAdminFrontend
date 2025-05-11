"use client"

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
import { InfoIcon } from "lucide-react";

export function StudentDrawer({student}) {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <InfoIcon />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Student Information</DrawerTitle>
            <DrawerDescription>Details of the selected student.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
          <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Reg No:</strong> {student.regNo}</p>
                <p><strong>Semester:</strong> {student.semester}</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
