import MapboxMap from "@/components/MapboxMap";

export default function Page() {
  return (
    <div className="w-full" style={{ height: 'calc(100vh - 4rem)' }}>
      <MapboxMap region="AS" />
    </div>
  );
}
