"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

type MapboxMapProps = {
  region: string;
};

const REGION_CONFIG: Record<string, { center: [number, number]; zoom: number }> = {
  AS: { center: [100, 35], zoom: 3, },
  EU: { center: [15, 54], zoom: 4 },
  AF: { center: [20, 5], zoom: 3 },
  NA: { center: [-100, 40], zoom: 3 },
  SA: { center: [-60, -15], zoom: 3 },
  OC: { center: [135, -25], zoom: 3 },
  AN: { center: [0, -80], zoom: 2 },
};

export default function MapboxMap({ region }: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const hasFlownRef = useRef(false);
  
  // Initialize map at a neutral location (world view)
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";
    
    // Start at a neutral world view so we can always fly to the target region
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 20], // Center of world
      zoom: 2, // World view
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      hasFlownRef.current = false;
    };
  }, []);


  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const cfg = REGION_CONFIG[region];
    if (!cfg) return;

    const flyToRegion = () => {
      map.flyTo({
        center: cfg.center,
        zoom: cfg.zoom,
        essential: true,
        speed: .2,
        curve: 1.42,
      });
      hasFlownRef.current = true;
    };

    if (map.loaded()) {
      setTimeout(flyToRegion, 100);
    } else {
      map.once("load", () => {
        setTimeout(flyToRegion, 100);
      });
    }
  }, [region]);

  return <div ref={mapContainerRef} className="h-full w-full" style={{ height: '100%' }} />;
}
