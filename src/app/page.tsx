import { StarterScreen } from './_components/starter-screen';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="grid h-screen items-center justify-center bg-black">
      <StarterScreen />
    </main>
  );
}
