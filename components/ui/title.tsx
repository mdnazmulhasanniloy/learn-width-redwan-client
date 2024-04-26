import React from "react";

const Title = ({ title }: { title: string }): any => {
  return (
    <div className="flex items-end justify-start gap-2">
      <h1 className="text-3xl">{title}</h1>
      <div className="h-2 w-2 bg-sky-700"></div>
    </div>
  );
};

export default Title;
