"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

function Theme() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(!open)} size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-300 ease-in-out dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-300 ease-in-out dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-32 p-1 rounded-md border bg-popover text-popover-foreground shadow-md"
      >
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => { 
              setOpen(false); 
              setTheme(item.value)}}
            className={cn(
              "w-full px-2 py-1.5 text-left text-sm rounded-sm",
              "hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default Theme;
