"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const HeroWidget = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl")}>
      <h3 className="text-xl font-bold text-white">Experience Jar</h3>
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-all"
        >
          -
        </button>
        <span className="text-4xl font-black text-secondary">{count}</span>
        <button 
          onClick={() => setCount((prev) => prev + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-all"
        >
          +
        </button>
      </div>
      <p className="text-sm text-white/60">Tap to add more spice</p>
    </div>
  );
};
