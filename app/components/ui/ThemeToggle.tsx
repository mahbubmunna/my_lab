"use client";

import * as React from "react";
import { useTheme } from "next-themes";
// Assuming you have an icon library like lucide-react
// If not, use simple text buttons for now
// pnpm install lucide-react

import { Sun, Moon } from "lucide-react";
import { Button } from "./Button"; // Use the Button component we made

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
