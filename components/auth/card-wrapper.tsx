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
import Social from "./social";
import BackButton from "./back-button";

interface ICardWrapperProps {
  children: React.ReactElement;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
  showSocial?: boolean;
  setSuccess: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  setError: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonLink,
  showSocial,
  setLoading,
  setSuccess,
  setError,
}: ICardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social
            setLoading={setLoading}
            setSuccess={setSuccess}
            setError={setError}
          />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} link={backButtonLink} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
