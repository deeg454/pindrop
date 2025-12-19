import MapboxMap from "@/components/MapboxMap";
import { getUserID } from "@/lib/user";
export default async function MapPage() {
  const userID = await getUserID();
  console.log(userID);
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[calc(100vh-4rem)]">
        <MapboxMap userID={userID}/>
      </div>
    </div>
  );
}
