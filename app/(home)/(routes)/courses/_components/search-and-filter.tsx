"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IProps = {
  setSearch: (
    value:
      | string
      | undefined
      | null
      | ((prev: string | undefined | null) => string | undefined | null)
  ) => void;
  setSortOrder: (
    value:
      | string
      | undefined
      | null
      | ((prev: string | undefined | null) => string | undefined | null)
  ) => void;
  setSortBy: (value: boolean | ((prev: boolean) => boolean)) => void;
  sortBy: boolean;
};

const SearchAndFilter = ({
  setSearch,
  setSortOrder,
  setSortBy,
  sortBy,
}: IProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 w-full">
      <div className="relative">
        <Input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search course here..."
          className="px-4 py-5 rounded-full border border-sky-400"
        />
        <div className="absolute right-3 top-[10px] text-sky-400">
          <Search />
        </div>
      </div>
      <div
        onClick={() => setSortBy(!sortBy)}
        className={cn(
          "flex border hover:cursor-pointer px-4 py-3 rounded-full ",
          sortBy
            ? "text-white bg-sky-400"
            : " border-sky-400 text-sky-400 bg-transparent"
        )}
      >
        <p className="text-sm">Sort by Price</p>
      </div>
      <div className="">
        <Select onValueChange={(e) => setSortOrder(e)}>
          <SelectTrigger className="w-[180px] border border-sky-400  rounded-full">
            <SelectValue placeholder="sort by order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc" defaultChecked>
                Asc
              </SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
