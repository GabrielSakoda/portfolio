"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function StatusBadge({
  className,
}: {
  className?: string;
}) {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "inline-flex items-center gap-3 px-4 py-2 rounded-full",
      theme === 'dark' ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-700',
      "backdrop-blur-sm",
      className
    )}>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span className="text-base font-medium">Open to work</span>
    </div>
  );
} 