import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Trash2 } from "lucide-react"

export function PopupDeleteBook() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant= "outline" className="w-full border-2 border-red-500 hover:bg-transparent hover:text-red-500 text-red-500">
          <Trash2 className="size-4" />
          Delete Book
        </Button>
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
          <DialogDescription>
            Enter the Name of the Book. Click delete when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Master Java ....."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="destructive" className="cursor-pointer">Delete Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
