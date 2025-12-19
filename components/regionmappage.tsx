"use client";

import MapboxMap from "@/components/MapboxMap";

export default function RegionMapPage({ region }: { region: string }) {
  return <MapboxMap region={region} />;
}
