import { HashLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="spanner h-screen w-screen justify-center items-center">
      <HashLoader color="#005be6" /> <h1>welcome To Learn With Redwan</h1>
    </div>
  );
}
