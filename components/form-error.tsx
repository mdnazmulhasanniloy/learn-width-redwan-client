// import {} from "@radix-ui/react-icons";

import { TriangleAlert } from "lucide-react";

interface IFormErrorProps {
  message: string | null | undefined;
}
const FormError = ({ message }: IFormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="my-5 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
