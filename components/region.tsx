"use client";

import React, { createContext, useContext, useState } from "react";

type RegionContextValue = {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
};

const RegionContext = createContext<RegionContextValue | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) {
    throw new Error("useRegion must be used inside <RegionProvider>");
  }
  return ctx;
}
