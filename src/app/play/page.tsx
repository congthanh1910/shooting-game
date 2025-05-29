import { GamePlayer } from './_components/game-player';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="h-screen bg-gray-100 p-6">
      <GamePlayer />
    </main>
  );
}
