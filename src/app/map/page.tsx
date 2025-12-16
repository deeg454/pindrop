import MapboxMap from "@/components/MapboxMap";

export default function MapPage() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[calc(100vh-4rem)]">
        <MapboxMap />
      </div>
    </div>
  );
}
