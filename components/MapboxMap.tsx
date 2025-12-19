"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef,useState } from "react";
import { PinDialog } from "./pin-dialog";

interface MapBoxProps{
  userID: string;
}

export default function MapboxMap( {userID} : MapBoxProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [ isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  useEffect(() => {
      if (!mapContainerRef.current || mapRef.current) return;

      mapboxgl.accessToken =
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-98.4936, 29.4241],
        zoom: 10,
      });

      mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        if (markerRef.current) {
          markerRef.current.remove();
        }

        markerRef.current = new mapboxgl.Marker({color:"#007BA7"})
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);

          setCoords({lng,lat});
          setIsOpen(true);
      });
       

      mapRef.current.addControl(
        new mapboxgl.NavigationControl(),
        "top-right"
      );

      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }, []);


  return (
      <>
        <div ref={mapContainerRef} className="h-full w-full" />
        <PinDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          coords={coords}
          userID={userID}
        />
      </>
  );
}
