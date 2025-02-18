import { Card } from "@/components/ui/card";
import SigninForm from "./components/SigninForm";

export default function SigninPage() {
  return (
    <div>
      <Card className="mx-auto mt-12 w-96 p-6">
        <SigninForm />
      </Card>
    </div>
  );
}
