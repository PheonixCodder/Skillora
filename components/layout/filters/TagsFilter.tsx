"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formUrlQuery, removeUrlQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function TagsFilter() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState(""); // <-- add controlled state
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync state with URL when navigating
  React.useEffect(() => {
    const currentTags = searchParams.get("tags") || "";
    setSelected(currentTags ? currentTags.split(",") : []);
  }, [searchParams]);

  const toggleSelect = (val: string) => {
    let newSelected: string[];

    if (selected.includes(val)) {
      newSelected = selected.filter((item) => item !== val);
    } else {
      newSelected = [...selected, val];
    }

    setSelected(newSelected);

    // If empty, remove param completely
    let newUrl = "/";
    if (newSelected.length === 0) {
      newUrl = removeUrlQueryParams({
        params: searchParams.toString(),
        keys: ["tags"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "tags",
        value: newSelected.join(","),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const clearAll = () => {
    setSelected([]);
    const newUrl = removeUrlQueryParams({
      params: searchParams.toString(),
      keys: ["tags"],
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-800 dark:hover:bg-dark-300 w-[160px] justify-between"
        >
          {selected.length > 0 ? `${selected.length} tag(s)` : "Select Tags"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0 ">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            onClear={() => setSearch("")} // ✅ clears only search
            placeholder="Search tags..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => toggleSelect(framework.value)}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected.includes(framework.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          {/* ✅ Clear All button in footer */}
          {selected.length > 0 && (
            <div className="border-t px-2 py-1.5 text-center">
              <Button variant="ghost" size="sm" className="w-full" onClick={clearAll}>
                Clear all filters
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
