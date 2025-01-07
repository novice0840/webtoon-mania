import { Card } from "@/components/ui/card";
import SignupForm from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="mx-auto mt-12 w-96">
      <Card className="mx-auto mt-12 w-96 p-6">
        <SignupForm />
      </Card>
    </div>
  );
}
