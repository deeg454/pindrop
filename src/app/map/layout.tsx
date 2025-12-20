"use client";

import { usePathname } from "next/navigation";
import MapboxMap from "@/components/MapboxMap";

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Extract region from pathname: /map/NA -> "NA", /map -> "NA" (default)
  const regionMatch = pathname.match(/\/map\/([A-Z]{2})$/);
  const region = regionMatch ? regionMatch[1] : "NA";

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 4rem)' }}>
      <MapboxMap region={region} />
      {children}
    </div>
  );
}

