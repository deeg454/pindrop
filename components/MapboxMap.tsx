"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { PinDialog } from "./pin-dialog";
import PinPopUp from "@/components/post/popup";

interface MapBoxProps {
  userID: string;
  posts: {
    user: string;
    lat: number;
    lng: number;
    content: string;
    title: string;
  }[];
}



export default function MapboxMap({ userID, posts }: MapBoxProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const clickMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
 
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-98.4936, 29.4241],
      zoom: 10,
    });

    mapRef.current = mapInstance;

    mapInstance.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        if (clickMarkerRef.current) {
          clickMarkerRef.current.remove();
        }

        clickMarkerRef.current = new mapboxgl.Marker({ color: "#007BA7" })
          .setLngLat([lng, lat])
          .addTo(mapInstance);

        setCoords({ lat, lng });
        setIsOpen(true);
      });


const hoverPopup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

posts.forEach((post) => {
  const marker = new mapboxgl.Marker({ color: "#007BE2" })
    .setLngLat([post.lng, post.lat])
    .addTo(mapInstance);

  const el = marker.getElement();

    el.addEventListener("mouseenter", () => {
    hoverPopup
      .setLngLat([post.lng, post.lat])
      .setHTML(`
        <div class="max-w-[220px] max-h-20 overflow-hidden">
  <h3 class="font-semibold text-sm text-gray-900">
    ${post.title}
  </h3>

  <div class="text-[11px] text-gray-500 mb-1">
    By: <span class="font-medium">${post.user}</span>
  </div>

  <p class="text-xs text-gray-600 leading-snug whitespace-pre-wrap">
    ${post.content}
  </p>
</div>

      `)
      .addTo(mapInstance);
  });


  el.addEventListener("mouseleave", () => {
    hoverPopup.remove();
  });

  el.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});



    mapInstance.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    return () => {
      mapInstance.remove();
      mapRef.current = null;
    };
  }, posts);

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
