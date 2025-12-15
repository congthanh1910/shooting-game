import { GameName } from "@/components/game-name";
import { StarterScreen } from "@/components/starter-screen";

export default function Page() {
  return (
    <main className="grid h-screen items-center justify-center">
      <div>
        <div className="h-27.5">
          <GameName />
        </div>
        <StarterScreen />
      </div>
    </main>
  );
}
