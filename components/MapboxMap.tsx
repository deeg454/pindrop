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
  const previousRegionRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);
  
  // Initialize map only once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";
    
    // Start at a neutral world view for initial load
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
      isInitializedRef.current = false;
      previousRegionRef.current = null;
    };
  }, []);

  // Handle region changes with smooth animation
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const cfg = REGION_CONFIG[region];
    if (!cfg) return;

    const flyToRegion = () => {
      // If this is the first region or map hasn't loaded yet, use a simple flyTo
      // Otherwise, animate from current position
      map.flyTo({
        center: cfg.center,
        zoom: cfg.zoom,
        essential: true,
        duration: 2000, // 2 second smooth animation
        curve: 1.42,
      });
    };

    // If region changed, animate to new region
    if (previousRegionRef.current !== region) {
      if (map.loaded()) {
        flyToRegion();
      } else {
        map.once("load", () => {
          flyToRegion();
          isInitializedRef.current = true;
        });
      }
      previousRegionRef.current = region;
    } else if (!isInitializedRef.current && map.loaded()) {
      // Initial load - fly to the region
      flyToRegion();
      isInitializedRef.current = true;
    }
  }, [region]);

  return <div ref={mapContainerRef} className="h-full w-full" style={{ height: '100%' }} />;
}
