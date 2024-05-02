// import {} from "@radix-ui/react-icons";

import { CircleCheckBig } from "lucide-react";

interface IFormSuccessProps {
  message: string | null | undefined;
}
const FormSuccess = ({ message }: IFormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="my-5 bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheckBig className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
