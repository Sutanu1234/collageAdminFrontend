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

import { UserPlus2Icon } from "lucide-react"

export function AddUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer">
          <UserPlus2Icon className="size-4 mr-0.25rem" />
          Add User
        </Button>
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new User</DialogTitle>
          <DialogDescription>
            Enter the information of new User. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              defaultValue="abc@gmail.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Department
            </Label>
            <Input
              id="department"
              defaultValue="Library Admin"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Role
            </Label>
            <Input
              id="role"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
