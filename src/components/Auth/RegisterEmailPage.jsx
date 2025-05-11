import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export function RegisterEmailPage({ className, ...props }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock email check — replace with your real API logic
    const isValidUser = true; // assume email exists

    if (isValidUser) {
      toast.success("Valid user. Proceed to set password.");
      setTimeout(() => {
        navigate("/register/set-password", { state: { email } });
      }, 1000);
    } else {
      toast.error("Invalid email. Contact admin.");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to begin registration
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Verify Email
        </Button>
      </div>
    </form>
  );
}
