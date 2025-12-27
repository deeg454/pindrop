import MapboxMap from "@/components/MapboxMap";
import { getUserID } from "@/lib/user";
import { fetchPosts } from "@/lib/actions/posts";
export default async function MapPage() {
  const postList = await fetchPosts();
  const userID = await getUserID();
  console.log(userID);
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[calc(100vh-4rem)]">
        <MapboxMap userID={userID} posts={postList}/>
      </div>
    </div>
  );
}
