/** @format */

"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "./header";
import BackButton from "./back-button";

interface ICardWrapperProps {
  children: React.ReactElement;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonLink?: string;
  title?: any;
}
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonLink,
  title,
}: ICardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md border border-sky-400">
      <CardHeader className="relative ">
        <Header label={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {backButtonLabel && backButtonLink && (
          <BackButton label={backButtonLabel} link={backButtonLink} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
