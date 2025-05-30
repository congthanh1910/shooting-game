import { GameName } from './_components/game-name';
import { StarterScreen } from './_components/starter-screen';

export default function Page() {
  return (
    <main className="grid h-screen items-center justify-center">
      <div>
        <div className="h-[110px]">
          <GameName />
        </div>
        <StarterScreen />
      </div>
    </main>
  );
}
