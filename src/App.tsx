import { Center } from "./Center";
import { LeftBar } from "./LeftBar";
import { RightBar } from "./RightBar";

export function App() {
  return (
    <div className="flex min-h-screen">
      <LeftBar />
      <Center />
      <RightBar />
    </div>
  );
}
